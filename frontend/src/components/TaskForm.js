import React, { useState } from 'react';
import axios from 'axios';

function TaskForm({ fetchTasks }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [priority, setPriority] = useState('Medium');
  const [status, setStatus] = useState('Not Started');

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://backend:5000/tasks', {
      title,
      description,
      due_date: dueDate,
      priority,
      status,
    });
    setTitle('');
    setDescription('');
    setDueDate('');
    setPriority('Medium');
    setStatus('Not Started');
    fetchTasks();
    alert('Task added successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        required
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Review">Review</option>
        <option value="Completed">Completed</option>
      </select>
      <button type="submit">Submit</button>
    </form>
  );
}

export default TaskForm;
