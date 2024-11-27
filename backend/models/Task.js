const pool = require('../server');

const getTasks = (request, response) => {
  pool.query('SELECT * FROM tasks ORDER BY id ASC', (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const createTask = (request, response) => {
  const { title, description, due_date, priority, status } = request.body;

  pool.query(
    'INSERT INTO tasks (title, description, due_date, priority, status) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [title, description, due_date, priority, status],
    (error, results) => {
      if (error) {
        throw error;
      }
      response.status(201).send(`Task added with ID: ${results.rows[0].id}`);
    }
  );
};

module.exports = {
  getTasks,
  createTask,
};
