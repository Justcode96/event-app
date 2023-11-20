import React, { useState, useEffect } from 'react';
import { Input, Textarea, Button } from '@chakra-ui/react';

// EditForm component for editing events
export const EditForm = ({ event, onSave, onCancel }) => {
    // State to manage the edited event
  const [editedEvent, setEditedEvent] = useState({ ...event });
  
  // Effect to format date strings when the event prop changes
    useEffect(() => {
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      startTime: new Date(prevEvent.startTime).toISOString().slice(0, 16),
      endTime: new Date(prevEvent.endTime).toISOString().slice(0, 16),
    }));
  }, [event]);

    // Event handler for input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

    // Event handler for save button click
  const handleSaveClick = () => {
    onSave(editedEvent);
  };

  return (
    <div>
      {/* Input for editing event title */}
      <label>Title:</label>
      <Input
        type="text"
        name="title"
        value={editedEvent.title}
        onChange={handleInputChange}
        style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }} 
      />
      
      {/* Textarea for editing event description */}
      <label>Description:</label>
      <Textarea
        name="description"
        value={editedEvent.description}
        onChange={handleInputChange}
        style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }} 
      />

      {/* Input for editing event start time */}
      <label>Start Time:</label>
      <Input
        type="datetime-local"
        name="startTime"
        value={editedEvent.startTime}
        onChange={handleInputChange}
        style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }} 
      />

      {/* Input for editing event end time */}
      <label>End Time:</label>
      <Input
        type="datetime-local"
        name="endTime"
        value={editedEvent.endTime}
        onChange={handleInputChange}
        style={{ margin: '10px 0', borderRadius: '5px', color: 'rgb(7, 79, 106)' }} 
      />

      {/* Save and Cancel buttons */}
      <div>
      <Button mb="4" mt="4" colorScheme="blue" bg="rgb(7, 79, 106)" style={{ marginRight: '10px' }}  onClick={handleSaveClick}>
        Save
      </Button>
      <Button onClick={onCancel}>Cancel</Button>
      </div>
    </div>
  );
};
