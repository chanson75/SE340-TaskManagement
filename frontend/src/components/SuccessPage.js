import React from 'react';
import { Link } from 'react-router-dom';

function SuccessPage() {
  return (
    <div className="container success-message">
      <h1>Your task has been successfully submitted!</h1>
      <Link to="/">Submit another task</Link>
    </div>
  );
}

export default SuccessPage;