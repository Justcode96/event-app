import React, { useState, useEffect } from 'react';

export const EditForm = ({ event, onSave, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });

  // Update the editedEvent state when the event prop changes
  useEffect(() => {
    setEditedEvent({ ...event });
  }, [event]);

  // Function to handle input changes and update the editedEvent state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // Update the editedEvent with the new value for the specific input field
    setEditedEvent({
      ...editedEvent,
      [name]: value,
    });
  };

  // Function to handle the save button click
  const handleSaveClick = () => {
    onSave(editedEvent);
  };

   // Function to handle the cancel button click
   const handleCancelClick = () => {
    onCancel();
  };

  return (
    <form onSubmit={handleSaveClick} className="edit-form">
      <label>
        Title: 
        <input 
          type="text"
          name="title"
          value={editedEvent.title}
          onChange={handleInputChange}
        />
       </label>
      <div>
        <button type="submit" onClick={handleSaveClick}></button>
        <button type="button" onClick={handleCancelClick}></button>
      </div>
    </form>
  );
};
