import React from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { EventPage } from './pages/EventPage'; 
import { EventsPage } from './pages/EventsPage'; 

function App() {
  return (
  <ChakraProvider>
    <Router>
      <Switch>
        {/* Route for matching paths */}
        <Route path="/events/:eventId">
          {/* Render EventPage when route matches */}
          <EventPage />
        </Route>
        <Route path="/events">
          <EventsPage />
        </Route>
      </Switch>
    </Router>
</ChakraProvider>
  );
}

export default App;
