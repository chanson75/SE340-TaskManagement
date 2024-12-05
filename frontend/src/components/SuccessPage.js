import React from 'react';
import { Link } from 'react-router-dom';
import './SuccessPage.css';

const SuccessPage = () => {
  return (
    <div className="success-page">
      <h1>Success!</h1>
      <p>Your task has been successfully added to the database.</p>
      <Link to="/tasks">View Tasks</Link>
    </div>
  );
};

export default SuccessPage;