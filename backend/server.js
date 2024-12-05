const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');
const taskRoutes = require('./routes/tasks');

const app = express();
const port = 5000;

const pool = new Pool({
  user: 'postgres',
  host: 'db',
  database: 'tasksdb',
  password: 'password',
  port: 5432,
});

app.use(cors());
app.use(bodyParser.json());
app.use('/tasks', taskRoutes(pool));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});