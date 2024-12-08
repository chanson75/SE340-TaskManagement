import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './FormPage.css'; // Import the CSS file
import DueDateField from './plugins/DueDateField';
import PriorityField from './plugins/PriorityField';
import StatusField from './plugins/StatusField';

const FormPage = () => {
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const [title, setTitle] = useState('Task Title');
  const [description, setDescription] = useState('Task Description');
  const [dueDate, setDueDate] = useState(getCurrentDate());
  const [priority, setPriority] = useState('Low');
  const [status, setStatus] = useState('Not Started');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/tasks', {
        title,
        description,
        due_date: dueDate,
        priority,
        status,
      });
      navigate('/success');
    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Failed to submit the form. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Add a New Task</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description:</label>
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <DueDateField dueDate={dueDate} setDueDate={setDueDate} />
        <PriorityField priority={priority} setPriority={setPriority} />
        <StatusField status={status} setStatus={setStatus} />
        <div className="button-container">
          <button type="submit" className="wide-button">Submit</button>
          <Link to="/tasks">
            <button className="wide-button">View All Tasks</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default FormPage;