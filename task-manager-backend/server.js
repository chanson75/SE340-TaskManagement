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

// Add the GET route to fetch a specific task by ID
app.get('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error fetching task:', err);
    res.status(500).send('Server error');
  }
});

// Add the PUT route to update a task
app.put('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, due_date, priority, status } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, description = $2, due_date = $3, priority = $4, status = $5 WHERE id = $6 RETURNING *',
      [title, description, due_date, priority, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).send('Task not found');
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error updating task:', err);
    res.status(500).send('Server error');
  }
});

// Add the DELETE route to remove a task
app.delete('/tasks/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) {
      return res.status(404).send('Task not found');
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error('Error deleting task:', err);
    res.status(500).send('Server error');
  }
});

app.get('/', (req, res) => {
  res.send('Welcome to the Task Manager API');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});