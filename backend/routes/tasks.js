const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { title, description, due_date, priority, status } = req.body;
    try {
      const result = await pool.query(
        'INSERT INTO tasks (title, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [title, description, due_date, priority, status]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tasks ORDER BY priority');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });

  return router;
};