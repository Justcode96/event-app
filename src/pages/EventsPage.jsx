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
        const eventsResponse = await fetch(`http://localhost:3000/events`);
        if (!eventsResponse.ok) {
          throw new Error('Failed to fetch events data from the server');
        }
        const eventsData = await eventsResponse.json();
        setEvents(eventsData);
  
        const categoriesResponse = await fetch(`http://localhost:3000/categories`);
        if (!categoriesResponse.ok) {
          throw new Error('Failed to fetch categories data from the server');
        }
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData);
      } catch (error) {
        console.error(error);
      }
    }
  
    fetchDataFromServer();
  }, []);
  
    
  // Function to add a new event to the server.
  const addEvent = async () => {
    try {
      const response = await fetch(`http://localhost:3000/events`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEvent),
      });

      if (!response.ok) {
        throw new Error('Failed to add event to the server');
      }

// Get the newly added event from the server response
const addedEvent = await response.json();

setEvents((prevEvents) => [...prevEvents, addedEvent]);

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
      setTimeout(() => {
        setSuccessMessage('');
      }, 5000);
    } catch (error) {
      console.error(error);
      setSuccessMessage('Failed to add event. Please try again.');
    }
  };

  // Filter events based on search term and selected category.
const filteredEvents = events.filter((event) => {
  const matchesSearch =
    event.title &&
    event.title.toLowerCase().includes(searchTerm.toLowerCase());
  const matchesCategory =
    !selectedCategory || (event.categoryIds && event.categoryIds.includes(parseInt(selectedCategory)));
  return matchesSearch && matchesCategory;
});


  return (
    <div style={{ textAlign: 'center' }}>
      <h1>Events Page</h1>

      {/* Form to add a new event */}
        <h2><strong>Add New Event</strong></h2>
        <div>
        <Input 
          type="text"
          placeholder="Event Title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          style={{ width: '200px', margin: '10px 0', padding: '10px' }} 
        />
        </div>

        <div>
        <Input  
          type="text"
          placeholder="Description"
          value={newEvent.description}
          onChange={(e) =>
            setNewEvent({ ...newEvent, description: e.target.value })
          }
          style={{ width: '200px', margin: '10px 0', padding: '10px' }}
        />
        </div>

        <div>
        <Input  
        type="text"
        placeholder="Image URL" 
        value={newEvent.image}
        onChange={(e) =>
          setNewEvent({ ...newEvent, image: e.target.value })
        }
        style={{ width: '200px', margin: '10px 0', padding: '10px' }}
      />
      </div>

      <div>
      <Input  
        type="text"
        placeholder="Start Time" 
        value={newEvent.startTime}
        onChange={(e) =>
          setNewEvent({ ...newEvent, startTime: e.target.value })
        }
        style={{ width: '200px', margin: '10px 0', padding: '10px' }}
      />
      </div>

      <div>
      <Input  
        type="text"
        placeholder="End Time" 
        value={newEvent.endTime}
        onChange={(e) =>
          setNewEvent({ ...newEvent, endTime: e.target.value })
        }
        style={{ width: '200px', margin: '10px 0', padding: '10px' }}
        />
        </div>

        <div>
        <Input
          type="text"
          placeholder="Categories"
          value={newEvent.categories}
          onChange={(e) => setNewEvent({ ...newEvent, categories: e.target.value })}
          style={{ width: '200px', margin: '10px 0', padding: '10px' }}
        />
      </div>
        
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
            <Link to={`/event/${event.id}`}>
            <img src={event.image} alt={event.title} 
            style={{ width: '60%', borderRadius: '10px', margin: '10px auto' }}
            /> 
            </Link> 
            <Link to={`/event/${event.id}`}>
            <Text><strong>Description:</strong> {event.description}</Text></Link>
            <Link to={`/event/${event.id}`}>
            <Text><strong>Start Time:</strong> {event.startTime}</Text></Link>
            <Link to={`/event/${event.id}`}>
            <Text><strong>End Time:</strong> {event.endTime}</Text></Link> 
            <Link to={`/event/${event.id}`}>
            <Text><strong>Categories:</strong>
              {' '}
              {(event.categoryIds || []) 
                .map((categoryId) => {
                  const category = categories.find((cat) => cat.id === categoryId);
                  return category ? category.name : '';
                })
                .join(', ')}
            </Text>{' '}</Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
