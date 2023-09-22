import React from 'react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/" className="link-style">Events</Link>
        </li>
        <li>
          <Link to="/event/1" className="link-style">Event</Link>
        </li>
      </ul>
    </nav>
  );
};
