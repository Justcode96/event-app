import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heading, Button, Input, Select, Text } from '@chakra-ui/react'; 

const EventsPage = () => {
  // State variables for managing events, new event input, success message, search term, selected category, and categories.
  const [events, setEvents] = useState([]); 
  const [newEvent, setNewEvent] = useState({
    title: '',
    description: '',
    image: '',
    startTime: '',
    endTime: '',
    categories: [],
  });

  const [successMessage, setSuccessMessage] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [categories, setCategories] = useState([]); 

  // useEffect to fetch events and categories from the server 
  useEffect(() => {
    async function fetchDataFromServer() {
      try {
        const response = await fetch('/events.json');
        if (!response.ok) {
          throw new Error('Failed to fetch data from the server');
        }
        const data = await response.json();
        setEvents(data.events);
        setCategories(data.categories);
      } catch (error) {
        console.error(error);
      }
    }
    
    fetchDataFromServer();
  }, []);
    
  // Function to add a new event to the server.
  const addEvent = async () => {
    try {
      const response = await fetch('/events.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to add event to the server');
      }

      // Reset the newEvent input and set a success message.
      setNewEvent({
        title: '',
        description: '',
        image: '',
        startTime: '',
        endTime: '',
        categories: [],
      });
      setSuccessMessage('Event added successfully!');
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to add event. Please try again.');
    }
  };

  // Filter events based on search term and selected category.
  const filteredEvents = events.filter((event) => {
  const matchesSearch = event.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory =
  !selectedCategory || event.categoryIds.includes(parseInt(selectedCategory));
    return matchesSearch && matchesCategory;
  });

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Events Page</h1>

      {/* Form to add a new event */}
        <h2><strong>Add New Event</strong></h2>
        <Input 
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          style={{ width: '200px', margin: '10px', padding: '10px' }} 
        />
        <Input  
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          style={{ width: '200px', padding: '10px' }}
        />
        <Button colorScheme="blue" bg="rgb(7, 79, 106)" borderRadius="5px"
        ml='4' mt="8"  mb="10" onClick={addEvent}>
          Add Event
        </Button>
        <Text color="green" mb="10">{successMessage}</Text>

      {/* Event Filters */}
        <h2><strong>Filter and Search</strong></h2>
        <Input  mt="4" 
          type="text"
          placeholder="Search by Event Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ width: '400px', padding: '10px' }}
        />
        <Select  mt="4"   
          placeholder="Filter by Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{ width: '400px', padding: '10px' }}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>

      {/* Display filtered events */}
      <div>
        {filteredEvents.map((event) => (
          <div key={event.id}>
            <Link to={`/event/${event.id}`}>
              <Heading mt="10" mb="4">{event.title}</Heading>
            </Link>
            <img src={event.image} alt={event.title} 
            style={{ width: '60%', borderRadius: '10px', margin: '10px auto' }}
            /> 
            <Text><strong>Description:</strong> {event.description}</Text>
            <Text><strong>Start Time:</strong> {event.startTime}</Text> 
            <Text><strong>End Time:</strong> {event.endTime}</Text> 
            <Text><strong>Categories:</strong>
              {' '}
              {event.categoryIds
                .map((categoryId) => {
                  const category = categories.find((cat) => cat.id === categoryId);
                  return category ? category.name : '';
                })
                .join(', ')}
            </Text>{' '}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
