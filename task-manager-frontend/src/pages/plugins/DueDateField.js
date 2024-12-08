import React from 'react';

const DueDateField = ({ dueDate, setDueDate }) => {
  return (
    <div>
      <label>Due Date:</label>
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} />
    </div>
  );
};

export default DueDateField;