const express = require('express');
const cors = require('cors');
const pool = require('pg').Pool;
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Enable CORS for all routes
app.use(cors({
  origin: 'http://localhost:3000', // Allow requests from the frontend
  methods: 'GET,POST,PUT,DELETE',
  allowedHeaders: 'Content-Type,Authorization',
}));

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
