const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
//const { jwtSecret } = require('./config.js')
const jwtSecret 
='41cc361b3f9ee6d6c955b5f68c5e6bb28750a1b064ff7739e81ca426d320112d';
const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:4200',
  }));

 const db = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'webshop',
  password: 'DatabaseSec321@',
  port: 5432,
});

app.post('/api/register', async (req, res) => {
  const { username, password, email } = req.body;
  if (!username || !password || !email) {
    return res.status(400).send('Username, password, and email are required');
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(hashedPassword)
  try {
    const result = await db.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING *',
      [username, hashedPassword, email]
    );
    res.status(201).send(result.rows[0]);
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).send('Internal Server Error');
  }
});
// User login
app.post('/api/login', (req, res) => {
  const { password, username } = req.body;

  // Find the user in the database
  const query = 'SELECT * FROM users WHERE username = $1';
  db.query(query, [username], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }

    if (results.rows.length === 0) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    const user = results.rows[0];

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
      res.json({ message: 'Login successful', token, user: { id: user.id, username: user.username, email: user.email } }); 
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

// Define other routes
app.get('/', (req, res) => {
  res.send('Welcome to my webshop backend!');
});

app.get('/api/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results.rows);
  });
});

app.get('/api/products/:id', (req, res) => {
  db.query('SELECT * FROM products WHERE id = {id}', (err, results) => {
    if (err) {
      return res.status(500).json({ error: err });
    }
    res.json(results.rows);
  });
});
//remove 111 -> 118 only for dbug
db.query('SELECT * FROM users', (err, res) => {
  if (err) {
    console.error('Error executing query:', err);
  } else {
    console.log('Query result:', res.rows);
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
