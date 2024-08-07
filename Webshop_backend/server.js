const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs')
const fileUpload = require('express-fileupload')
const path = require('path')
const mysql = require('mysql2')
const bcrypt = require('bcryptjs');
const helmet = require('helmet')
const rateLimit = require('express-rate-limit');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const jwtSecret = process.env.secret;
const app = express();
const port = 3000;

const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}
app.use(fileUpload());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(bodyParser.json());
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
//app.use(limiter);


const db = mysql.createPool({
  user: 'webshop',
  host: 'localhost',
  database: 'webshop',
  password: 'webshop',
  port: 3306,
  connectionLimit: 10,
});

// Register new user
app.post('/api/register', (req, res) => {
  const { username, password, email, role} = req.body;
  if (!username || !password || !email|| !role) {
    return res.status(400).send('Username, password, and email are required');
  }

  bcrypt.hash(password, 10).then(
    (hashedPassword) => {
      try {
        db.query(
        'INSERT INTO users (username, password, email, role) VALUES (?, ?, ?, ?);',
        [username, hashedPassword, email, role],
        ); 
        res.status(200).json({message:"ok"})
      } catch (error) {
        console.log(error)  
      }
    }
  );
  
});

// User login
app.post('/api/login', (req, res) => {
  const { password, username } = req.body;

  // Find the user in the database
  const query = 'SELECT * FROM users WHERE username = ?';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results[0];

    // Compare the password
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        return res.status(500).json({ error: err });
      }

      if (!isMatch) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
      
      // Generate a token
      const token = jwt.sign({ id: user.id, username: user.username }, jwtSecret, { expiresIn: '1h' });
      res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email, role: user.role } }); 
    });
  });
});

// Middleware to protect routes
const authenticateJWT = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (token) {
    jwt.verify(token, jwtSecret, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

// Protected route example
app.get('/api/protected', authenticateJWT, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

app.get('/', (req, res) => {
  res.send('Welcome to my webshop backend!');
});

// Get all products
app.get('/api/products', (req, res) => {
  const type = req.query.type;
  let query = 'SELECT * FROM products';
  const queryParams = [];

  if (type) {
    query += ' WHERE type = ?';
    queryParams.push(type);
  }

  db.query(query, queryParams, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results);
  });
});


// Get a single product
app.get('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  db.query(`SELECT * FROM products WHERE id = ${[productId]}`, (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    if (results.length === 0) {
      return res.status(404).json({error: 'Product not found'})
    }
    res.json(results[0]);
  });
});

// Create a new product
app.post('/api/products/create', (req, res) => {
  const { name, description, type, price, amountinstock } = req.body;
  if (!req.files || !req.files.image) {
    return res.status(400).json({ error: 'Image file is required' });
  }

  const imageFile = req.files.image;
  const uploadPath = path.join(__dirname, 'uploads', imageFile.name);

  imageFile.mv(uploadPath, err => {
    if (err) {
      console.error('Error saving file:', err);
      return res.status(500).json({ error: 'Failed to upload file' });
    }

    const imageurl = `/uploads/${imageFile.name}`;

    const query = 'INSERT INTO products (name, description, type, price, amountinstock, imageurl) VALUES (?, ?, ?, ?, ?, ?);';
    const values = [name, description, type, price, amountinstock, imageurl];

    db.query(query, values, (err, result) => {
      if (err) {
        console.error('Error inserting product:', err);
        return res.status(500).json({ error: 'Database error' });
      }
      res.status(201).json({message: 'Ok'});
      
      });
    });
  });

// Update a single product
app.put('/api/products/:id', (req, res) => {
  const productId = req.params.id;
  const { name, description, price, amountinstock, imageurl } = req.body;

  if (amountinstock < 0) {
    return res.status(400).json({error: 'Invalid number of stock'})
  }

  const query = 'UPDATE products SET name = ?, description = ?, price = ?, amountInStock = ?, imageUrl = ? WHERE id = ?';
  const values = [name, description, price, amountinstock, imageurl, productId];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.json({ message: 'Product updated successfully' });
  });
});

//Delete a single product
app.delete('/api/products/delete/:id', (req, res) => {
  const productId = req.params.id;
  const query = `DELETE from products WHERE id =  ${[productId]}`;
  
  db.query(query,(err, result) => {
    if (err) {
      console.error('Error updating product:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }

    res.json({ message: 'Product successfully deleted' });
  });
});

//checkout the shoppingcart items
app.post('/api/checkout', async (req, res) => {
  const items = req.body.items;
  
  if (!Array.isArray(items) || items.some(item => typeof item.product.id !== 'number' || typeof item.quantity !== 'number')) {
    return res.status(400).json({ error: 'Invalid items format' });
  }

  try {
    const boughtItems = [];

    for (const item of items) {
      const { product, quantity } = item;
      const id = product.id;

      if (isNaN(id) || isNaN(quantity) || quantity <= 0) {
        throw new Error(`Invalid id or quantity for item with id ${id}`);
      }

      db.query('SELECT * FROM products WHERE id = ?', [id], (error ,result) => {
        if (result.length === 0) {
          throw new Error(`Product with id ${id} not found`);
        }
  
        const newQuantity = result[0].amountinstock - quantity;
        if (newQuantity < 0) {
          throw new Error(`Not enough stock for product with id ${id}`);
        }
        db.query('UPDATE products SET amountinstock = ? WHERE id = ?', [newQuantity, id], ()=>{
          boughtItems.push({
            ...result[0],
            quantity
          });
        });
      }
      );
    }

    
    res.status(200).json({ message: 'Checkout successful', boughtItems });
  } catch (error) {
    console.error('Checkout error:', error);
    res.status(500).json({ error: 'Checkout failed', details: error.message });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
