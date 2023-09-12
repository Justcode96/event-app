import React, { useState, useEffect } from 'react';

export const EditForm = ({ event, onSave, onCancel }) => {
  const [editedEvent, setEditedEvent] = useState({ ...event });

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

  return (
    <form onSubmit={handleSaveClick}>
      <label>
        Title:
        <input
          type="text"
          name="title"
          value={editedEvent.title}
          onChange={handleInputChange}
        />
      </label>

     {/* Save button triggers the handleSaveClick function */}
      <button type="submit">Save</button>

      {/* Cancel button triggers the onCancel prop function */}
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};
