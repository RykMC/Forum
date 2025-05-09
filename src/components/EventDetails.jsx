import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';


function EventDetails() {
const [event, setEvent] = useState([]);
const { id } = useParams();

useEffect(() => {
    const fetchEvent = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/api/events/${id}`);
            setEvent(response.data);
        } catch (error) {
            console.error(error);
        }
    };
    fetchEvent();
}, [id]);

  return (
    <div>EventDetails</div>
  )
}

export default EventDetails;