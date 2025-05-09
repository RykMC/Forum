import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function EventDetails() {
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(false);

  const { id } = useParams();
  console.log(id);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
            `http://localhost:3001/api/events/${id}`);
        setEvent(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  console.log(event);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : event ? (
        <div>
          <h2>Event Details</h2>
          <h3>{event.title}</h3>
          <p>{event.date}</p>
      <p>{event.description}</p>
      <p>{event.location}</p>
      <p>{event.latitude}</p>
      <p>{event.longitude}</p>
        </div>
      ) : (
        <p>not found</p>
      )}
    </div>
  );
}

export default EventDetails;
