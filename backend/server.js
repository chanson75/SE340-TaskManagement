const express = require('express');
const cors = require('cors');
const pool = require('pg').Pool;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const pool = new pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

app.use('/tasks', require('./routes/tasks'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
