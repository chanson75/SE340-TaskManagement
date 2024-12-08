import React from 'react';

const PriorityField = ({ priority, setPriority }) => {
  return (
    <div>
      <label>Priority:</label>
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
    </div>
  );
};

export default PriorityField;