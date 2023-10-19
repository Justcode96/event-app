import React, { useState, useEffect } from 'react';
import { Heading, Text, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, useToast } from '@chakra-ui/react';
import { Link, useParams, useNavigate,  } from 'react-router-dom';
import { EditForm } from '../components/EditForm';
import eventsData from '/events.json';

export const EventPage = () => {
  const { eventId } = useParams();
  const [event, setEvent] = useState(
    eventsData.events.find((e) => e.id === parseInt(eventId))
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate(); 

  useEffect(() => {
    // Function to fetch event data based on the eventId
    async function fetchEvent() {
      try {
        const response = await fetch('/events.json');
    if (!response.ok) {
      throw new Error('Failed to fetch event data');
    }
    const eventData = await response.json();
    const event = eventData.events.find((e) => e.id === parseInt(eventId));
    setEvent(event);

      } catch (error) {
        console.error('Error fetching event:', error);
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
    try {
      setEvent(updatedEvent);

      toast({
        title: 'Event Updated',
        description: 'Event details have been updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Update Failed',
        description: 'Failed to update event details. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };


  // Function to handle saving updates
  const handleSave = (updatedEvent) => {
     updateEvent(updatedEvent);
     onClose(); 
  };

  // Function to handle event deletion
  const handleDelete = () => {
   // Show a confirmation dialog to confirm deletion.
   if (window.confirm('Are you sure you want to delete this event?')) {
    try {  
      
       // Update the event state to indicate that it has been deleted
       setEvent(null); 
      
      toast({
        title: 'Event Deleted',
        description: 'Event has been deleted successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

    // Redirect the user to the homepage
    navigate('/');

      // Redirect the user to the homepage or perform any necessary actions.
    } catch (error) {
      toast({
        title: 'Delete Failed',
        description: 'Failed to delete event. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  }
  };
  
  return (
    <div style={{ textAlign: 'center' }}>
      {/* Display event details */}
      <Heading mb="4">{event.title}</Heading>
      <Image src={event.image} alt="Event"        
      style={{ width: '50%', borderRadius: '10px', margin: '10px auto' }}
      />
      <Text><strong>Description:</strong> {event.description}</Text>
      <Text><strong>Start Time:</strong> {new Date(event.startTime).toLocaleString()}</Text>  
      <Text><strong>End Time:</strong>  {new Date(event.endTime).toLocaleString()}</Text>
      <Text><strong>Categories:</strong> {event.categoryIds.map((categoryId) =>
        eventsData.categories.find((category) => category.id === categoryId).name
      ).join(', ')}</Text>
      <Text><strong>Created By:</strong> {eventsData.users.find((user) => user.id === event.createdBy).name}</Text>
     
      <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginLeft: '40px' }}>
        {/* "Back to Home" Link */}
        <Link to="/" className="previous round" style={{ fontSize: '30px', fontWeight: 'bold' }}>
          &#8249;
        </Link>
      <Image src={eventsData.users.find((user) => user.id === event.createdBy).image} alt="Creator"
      style={{ width: '30%', borderRadius: '50%', margin: '50px' }}
      />
      </div>

      {/* Buttons for editing and deleting */}
      <Button mb="4" colorScheme="blue" bg="rgb(7, 79, 106)" style={{ marginRight: '10px' }} onClick={handleEdit}>Edit</Button>
      <Button mb="4" colorScheme="blue" bg="rgb(7, 79, 106)" onClick={handleDelete}>Delete</Button>

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



