const express = require('express');

module.exports = (pool) => {
  const router = express.Router();

  router.post('/', async (req, res) => {
    const { title, description, dueDate, priority, status } = req.body;
    try {
      await pool.query(
        'INSERT INTO tasks (title, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5)',
        [title, description, dueDate, priority, status]
      );
      res.status(201).send('Task added successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.get('/', async (req, res) => {
    try {
      const result = await pool.query('SELECT * FROM tasks');
      res.status(200).json(result.rows);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  return router;
};