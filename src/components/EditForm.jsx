import React, { useState, useEffect } from 'react';

export const EditForm = ({ event, onSave, onCancel }) => {
  // Use a separate state for each field to keep track of changes
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
  const handleSaveClick = (e) => {
    e.preventDefault(); 
    onSave(editedEvent);
  };


  return (
    <form onSubmit={handleSaveClick} className="edit-form">
      <div>
        <label className="custom-label">
       <span className="label-text">Title:</span> 
        </label>
        <input
            type="text"
            name="title"
            value={editedEvent.title} 
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>
      <div>
        <label className="custom-label">
          <span className="label-text">Description:</span>
            </label>
          <textarea
            name="description"
            value={editedEvent.description}
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>
      <div>
        <label className="custom-label">
        <span className="label-text">Start Time:</span>
          </label>
          <input
            type="text"
            name="startTime"
            value={editedEvent.startTime}
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>
      <div>
        <label className="custom-label">
        <span className="label-text">End Time:</span>
          </label>
          <input
            type="text"
            name="endTime"
            value={editedEvent.endTime}
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>
      <div>
        <label className="custom-label">
        <span className="label-text">Categories:</span> 
          </label>
          <input
            type="text"
            name="categories"
            value={editedEvent.categories}
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>
      <div>
        <label className="custom-label">
        <span className="label-text">Created By:</span>
          </label>
          <input
            type="text"
            name="createdBy"
            value={editedEvent.createdBy}
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>
      <div>
        <label className="custom-label">
        <span className="label-text">Image:</span>
          </label>
          <input
            type="text"
            name="image"
            value={editedEvent.image}
            onChange={handleInputChange}
            style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }}
          />
      </div>     
    </form>  
  );
};

