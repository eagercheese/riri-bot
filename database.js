// Step 1: Import packages
import express from 'express';
import { Pool } from 'pg';

// Step 2: Create Express App
const app = express();

// Step 3: Connect to PostgreSQL
const pool = new Pool ({
    host: 'localhost',
    user: 'postgres',
    password: 'root',
    database: 'riri_bot',
    port: 5432,
});

// Step 4: Define API route
app.get('/users', async(req,res) => {
    try {
        const query = 'SELECT * FROM users';
        const result = await pool.query(query);
        res.json(result.rows);
    }
    catch (err) {
        res.status(500).json({
            error: 'Something went wrong'
        });
    }
});

// Step 5: Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});