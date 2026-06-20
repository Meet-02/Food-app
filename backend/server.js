require('dotenv').config();
const cors = require('cors');
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(cors());
const hostname = '127.0.0.1';
const port = 5000;
app.use(express.json()); 
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: true 
  }
});

db.getConnection((err, connection) => {
  if (err) {
    console.error("Database connection failed:", err.message);
    return;
  }
  console.log("Successfully connected to TiDB Cloud! 🚀");
  connection.release();
});

app.post('/api/fooditem', (req, res) => {
    const { name, description, price } = req.body;
    db.query(
        'INSERT INTO food_items (name, description, price) VALUES (?, ?, ?)',[name, description, price],(err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error adding food item');
            } else {
                res.status(201).json({
                    message: 'Food item added successfully!',
                    id: results.insertId
                });
            }
        }
    );
});
// app.get('/api/fooditem', (req, res) => {
//     db.query('SELECT * FROM food_items', (err, results) => {
//         if (err) {
//             console.error(err);
//             res.status(500).send('Error fetching data');
//         } else {
//             res.json(results);
//         }
//     });
// });
app.get('/api/fooditem/:id', (req, res) => {
    const { id } = req.params;
    db.query('SELECT * FROM food_items WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error fetching data');
        } else {
            if (results.length === 0) {
                res.status(404).send(`Food item with ID ${id} not found`);
            } else {
                res.json(results[0]);
            }
        }
    });
});
app.put('/api/fooditem/:id', (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;
    db.query('UPDATE food_items SET name = ?, description = ?, price = ? WHERE id = ?', [name, description, price, id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error updating food item');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send(`Food item with ID ${id} not found`);
            } else {
                res.json({ message: `Food item with ID ${id} updated successfully!` });
            }
        }
    });
});
app.delete('/api/fooditem/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM food_items WHERE id = ?', [id], (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting food item');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send(`Food item with ID ${id} not found`);
            } else {
                res.json({ message: `Food item with ID ${id} deleted successfully!` });
            }
        }
    });
});
app.delete('/api/fooditem', (req, res) => {
    db.query('DELETE FROM food_items', (err, results) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error deleting food items');
        } else {
            if (results.affectedRows === 0) {
                res.status(404).send('Menu is already empty, no items to delete');
            } else {
                res.json({ 
                    message: 'All food items deleted successfully!',
                    itemsDeleted: results.affectedRows 
                });
            }
        }
    });
});
app.get('/api/fooditem', (req, res) => {
    console.log("Here is what Express sees in the URL:", req.query);
    const { Name } = req.query; 
    if (Name) {
        const searchQuery = `%${Name}%`; 
        
        db.query('SELECT * FROM food_items WHERE name LIKE ?', [searchQuery], (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error searching for food items');
            } else {
                res.json(results);
            }
        });
    } 
    else {
        db.query('SELECT * FROM food_items', (err, results) => {
            if (err) {
                console.error(err);
                res.status(500).send('Error fetching data');
            } else {
                res.json(results); 
            }
        });
    }
});

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}/`);
});