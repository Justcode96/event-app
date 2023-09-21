import React, { useState, useEffect } from 'react';
import { Heading, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import { EditForm } from '../components/EditForm';
import eventsData from '/events.json';

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(
    eventsData.events.find((e) => e.id === parseInt(eventId))
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    // Function to fetch event data based on the eventId
    async function fetchEvent() {
      try {
        const response = await fetch(`/events.json/${eventId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch event from the server');
        }
        const eventData = await response.json();
        setEvent(eventData);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEvent();
  }, [eventId]);

  // Function to handle opening the edit modal
  const handleEdit = () => {
    onOpen();
  };

  // Function to send an update request to the server
  const updateEvent = async (updatedEvent) => {
    const response = await fetch(`/events.json/${event.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedEvent),
    });

    if (!response.ok) {
      throw new Error('Failed to update event on the server');
    }
  };

  // Function to handle saving updates
  const handleSave = (updatedEvent) => {
    updateEvent(updatedEvent)
      .then(() => {
        setEvent(updatedEvent);
        onClose();
        toast({
          title: 'Event updated successfully!',
          status: 'success',
          duration: 3000,
          isClosable: true,
        });
      })
      .catch(() => {
        toast({
          title: 'Failed to update event. Please try again.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      });
  };

  // Function to handle event deletion
  const handleDelete = () => {
    const isConfirmed = window.confirm('Are you sure you want to delete this event?');
    if (isConfirmed) {
      deleteEvent(event.id)
        .then(() => {
          toast({
            title: 'Event deleted successfully!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
          // Redirect to the homepage or any other appropriate page
          history.push('/');
        })
        .catch(() => {
          toast({
            title: 'Failed to delete event. Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        });
    }
  };

  // Function to send a delete request to the server
  const deleteEvent = async (eventId) => {
    const response = await fetch(`/events.json/${eventId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete event on the server');
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      {/* Display event details */}
      <Heading mb="4">{event.title}</Heading>
      <Image src={event.image} alt="Event"         
      style={{ width: '50%', borderRadius: '10px', margin: '10px auto' }}
      />
      <Text> <strong>Description:</strong> {event.description}</Text>
      <Text><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</Text>  
      <Text><strong>End Time:</strong>  {new Date(event.endTime).toLocaleString()}</Text>
      <Text><strong>Categories:</strong> {event.categoryIds.map((categoryId) =>
        eventsData.categories.find((category) => category.id === categoryId).name
      ).join(', ')}</Text>
      <Text><strong>Created By:</strong> {eventsData.users.find((user) => user.id === event.createdBy).name}</Text>
      <Image src={eventsData.users.find((user) => user.id === event.createdBy).image} alt="Creator" 
      style={{ width: '30%', borderRadius: '50%', margin: '10px auto' }}
      />

      {/* Buttons for editing and deleting */}
      <Button style={{ marginRight: '10px' }} onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>

      {/* Modal for editing event details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader className="edit-form-title">Edit Event</ModalHeader>
          <ModalBody>
            {/* Include the EditForm component */}
            <EditForm event={event} onSave={handleSave} onCancel={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" bg="rgb(7, 79, 106)" style={{ marginRight: '10px' }}  onClick={() => handleSave(event)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};
