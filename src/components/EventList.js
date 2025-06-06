import React, { useEffect, useState } from "react";
import { getEvents } from "../services/api";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getEvents();
        console.log("Fetched events:", data); // Debugging line
        setEvents(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error fetching events: {error}</div>;
  }

  return (
    <div className="event-list">
      {events.map((event) => (
        <div key={event.id} className="event-thumbnail">
          <div className="event-title">{event.title}</div>
          <div className="event-date">
            <span>{event.date}</span>
          </div>
          <div className="event-description">{event.description}</div>
          <div className="event-category">{event.category}</div>
        </div>
      ))}
    </div>
  );
};
export default EventList;
