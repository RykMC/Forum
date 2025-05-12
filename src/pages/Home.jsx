import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // const { eventId } = useParams();
  // const eventId = 3;
  // console.log(eventId);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:3001/api/events");
        setEvents(response.data.results);
        // console.log(response.data);
      } catch (error) {
        console.error(error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, []);

  console.log(events);

  return (
    <div className="px-8 py-6 bg-gray-100 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-gray-400 text-center">
        EVENTS
      </h2>
      {error && <p className="text-red-500">{error}</p>}
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8">
          {events.map((event) => (
            <div
              key={event.id}
              className=" bg-gray-400 text-white rounded shadow-md p-6 hover:shadow-xl transition-shadow"
            >
              {/* <Link to={`/products/${product.id}`}></Link> */}
              <h3 className="text-lg text-center font-semibold mb-2">
                {event.title}
              </h3>
              <p className="text-gray-300">Datum: {event.date}</p>
              <p className="text-gray-300 ">
                Beschreibung: {event.description}
              </p>
              <p className="text-gray-300 ">Location: {event.location}</p>
              <p className="text-gray-300 ">S || N: {event.latitude}</p>
              <p className="text-gray-300 ">O || W: {event.longitude}</p>
              <Link to={`/events/${event.id}`}>DETAILS HIER LANG...</Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default Home;
