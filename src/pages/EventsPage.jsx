import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button, Input, Select, VStack, Text } from '@chakra-ui/react'; 

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
  const [selectedCategory, setSelectedCategory] = useState('null');
  const [categories, setCategories] = useState([]); 

  // useEffect to fetch events and categories from the server 
  useEffect(() => {
    async function fetchEventsFromServer() {
      try {
        const response = await fetch('http://localhost:5173/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events from the server');
        }
        const data = await response.json();
        setEvents(data);
      } catch (error) {
        console.error(error);
      }
    }

    async function fetchCategoriesFromServer() {
      try {
        const response = await fetch('http://localhost:5173/api/categories');
        if (!response.ok) {
          throw new Error('Failed to fetch categories from the server');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventsFromServer();
    fetchCategoriesFromServer(); 
  }, []);

  // Function to add a new event to the server.
  const addEvent = async () => {
    try {
      const response = await fetch('http://localhost:5173/api/events', {
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
      !selectedCategory || event.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h1>Events Page</h1>

      {/* Form to add a new event */}
      <VStack spacing={4} align="flex-start">
        <h2>Add New Event</h2>
        <Input
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <Input
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
        />
        <Button colorScheme="blue" onClick={addEvent}>
          Add Event
        </Button>
        <Text color="green">{successMessage}</Text>
      </VStack>

      {/* Event Filters */}
      <VStack spacing={4} align="flex-start">
        <h2>Filter and Search</h2>
        <Input
          type="text"
          placeholder="Search by Event Name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          placeholder="Filter by Category"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </Select>
      </VStack>

      {/* Display filtered events */}
      <div>
        {filteredEvents.map((event) => (
          <div key={event.id}>
            <Link to={`/events/${event.id}`}>
              <h2>{event.title}</h2>
            </Link>
            <p>{event.description}</p>
            <img src={event.image} alt={event.title} /> 
            <p>Start Time: {event.startTime}</p> 
            <p>End Time: {event.endTime}</p> 
            <p>
              Categories:{' '}
              {event.categoryIds
                .map((categoryId) => {
                  const category = categories.find((cat) => cat.id === categoryId);
                  return category ? category.name : '';
                })
                .join(', ')}
            </p>{' '}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
