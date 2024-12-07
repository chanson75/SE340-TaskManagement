import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SuccessPage.css'; // Import the CSS file

const SuccessPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h1>Task successfully added!</h1>
      <button className="wide-button" onClick={() => navigate('/')}>Add another task</button>
      <button className="wide-button" onClick={() => navigate('/tasks')}>View all tasks</button>
    </div>
  );
};

export default SuccessPage;