const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
  user: 'admin',
  host: 'localhost',
  database: 'db',
  password: 'admin',
  port: 5433,
});

app.use(bodyParser.json());
app.use(cors());

app.post('/tasks', async (req, res) => {
  const { title, description, due_date, priority, status } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [title, description, due_date, priority, status]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error inserting task:', err);
    res.status(500).send('Server error');
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks');
    res.json(result.rows);
  } catch (err) {
    console.error('Error fetching tasks:', err);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});