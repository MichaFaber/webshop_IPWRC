const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON bodies
app.use(express.json());

// Create or open an SQLite database
const db = new sqlite3.Database('./mydatabase.db', (err) => {
    if (err) {
        console.error(err.message);
    }
    console.log('Connected to the SQLite database.');
});

// Create a products table if it doesn't exist
db.run(`PRAGMA foreign_keys = off;
BEGIN TRANSACTION;

-- Table: products
CREATE TABLE products (id INTEGER PRIMARY KEY, name VARCHAR NOT NULL, description VARCHAR, type VARCHAR NOT NULL, price INTEGER, stockcount INTEGER, imageUrl VARCHAR);
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (2, 'Call of duty WW2', NULL, 'game', 30, 8, './assets/call-of-duty-WWII-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (3, 'Crash Bandicoot Trilogy', NULL, 'game', 40, 10, './assets/crash-nsane-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (4, 'Crash Team Racing', NULL, 'game', 40, 3, './assets/Ctr-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (5, 'Sniper elite 3', NULL, 'game', 30, 12, './assets/Sniper-elite-3-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (6, 'Tekken 7', NULL, 'game', 50, 40, './assets/Tekken7-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (7, 'Rocket League', NULL, 'game', 40, 9, './assets/rocket-league-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (8, 'Overwatch', NULL, 'game', 40, 4, './assets/Overwatch-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (9, 'Dragonball FighterZ', NULL, 'game', 60, 9001, './assets/dragonball-fighterZ-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (10, 'Grand theft auto V', NULL, 'game', 60, 6, './assets/GTA-V-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (11, 'Hitman', NULL, 'game', 40, 19, './assets/hitman-full-season-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (12, 'Hitman 2', NULL, 'game', 60, 47, './assets/Hitman-2-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (13, 'Mortal Kombat XL', NULL, 'game', 50, 15, './assets/Mortal-Kombat-XL-ps4-box.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (14, 'Redbull', NULL, 'drink', 2.5, 11, './assets/Redbull-single.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (15, 'Monster-energy', NULL, 'drink', 2.5, 77, './assets/Monster-energy.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (16, 'Doritos bits red', NULL, 'snack', 1, 33, './assets/doritos-bits-honey-bbq.png');
INSERT INTO products (id, name, description, type, price, stockcount, imageUrl) VALUES (17, 'Doritos bits blue', NULL, 'snack', 1, 44, './assets/doritos-bits-sweet-paprika.png');

COMMIT TRANSACTION;
PRAGMA foreign_keys = on;

)`);
app.get('/', (req, res) => {
  res.send('Welcome to my webshop!'); // Send a welcome message
});
// Endpoint to get all products
app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    db.all(sql, [], (err, rows) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: rows
        });
    });
});

app.get('/products/:productId', (req, res) => {
    const productId = req.params.productId; // Retrieve the product ID from the URL
    const sql = 'SELECT * FROM products WHERE id = ?'; // SQL query to select a product by ID
    db.get(sql, [productId], (err, row) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        if (!row) {
            res.status(404).json({ error: 'Product not found' });
            return;
        }
        res.json({
            message: 'success',
            data: row
        });
    });
});

// Endpoint to add a new product
app.post('/products', (req, res) => {
    const { id, name, description, type, price, stockcount, imageUrl } = req.body;
    const sql = 'INSERT INTO products (name, price) VALUES (?, ?)';
    db.run(sql, [id, name, description, type, price, stockcount, imageUrl], function(err) {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json({
            message: 'success',
            data: { id: this.id, name, description, type, price, stockcount, imageUrl }
        });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

