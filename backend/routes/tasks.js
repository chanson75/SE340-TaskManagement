const express = require('express');
const router = express.Router();
const { getTasks, createTask } = require('../models/Task');

router.get('/', getTasks);
router.post('/', createTask);

module.exports = router;
