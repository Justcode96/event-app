import React, { useState, useEffect } from 'react';
import { Heading, Text, Image, Button, Modal, ModalOverlay,ModalContent, ModalHeader,ModalBody, ModalFooter, useDisclosure, useToast, ToastContainer } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import { EditForm } from '../components/EditForm'; 
import eventsData from '/events.json';

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(
    eventsData.events.find((e) => e.id === parseInt(eventId))
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const history = useHistory();

  useEffect(() => {
    // Function to fetch event data based on the eventId
    async function fetchEvent() {
      try {
        const response = await fetch(`http://localhost:5173/api/events/${eventId}`);
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
    const response = await fetch(`http://localhost:5173/api/events/${updatedEvent.id}`, {
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
    const response = await fetch(`http://localhost:5173/api/events/${eventId}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Failed to delete event on the server');
    }
  };

  return (
    <div>
          {/* Display event details */}
      <Image src={event.image} alt={event.title} />
      <Heading>{event.title}</Heading>
      <Text>Description: {event.description}</Text>
      <Text>Start Time: {event.startTime}</Text>
      <Text>End Time: {event.endTime}</Text>
      <Text>Categories: {event.categoryIds.join(', ')}</Text>
      <Text>Created By: {eventsData.users.find((user) => user.id === event.createdBy).name}</Text>
      <Image src={eventsData.users.find((user) => user.id === event.createdBy).image} alt="Creator" />
      
        {/* Buttons for editing and deleting */}
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
      
        {/* Modal for editing event details */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Event</ModalHeader>
          <ModalBody>
              {/* Include the EditForm component */}
            <EditForm event={event} onSave={handleSave} onCancel={onClose} />
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" onClick={() => handleSave(event)}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ToastContainer />
    </div>
  );
};
