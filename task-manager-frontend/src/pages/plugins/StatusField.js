import React from 'react';

const StatusField = ({ status, setStatus }) => {
  return (
    <div>
      <label>Status:</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="Not Started">Not Started</option>
        <option value="In Progress">In Progress</option>
        <option value="Review">Review</option>
        <option value="Completed">Completed</option>
      </select>
    </div>
  );
};

export default StatusField;