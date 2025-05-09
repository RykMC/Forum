import axios from "axios";
import { useState } from "react";

function CreateEvent() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    latitude: "",
    longitude: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("http://localhost:3001/api/events", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Event wurde erstellt!");
      setFormData({
        title: "",
        description: "",
        date: "",
        location: "",
        latitude: "",
        longitude: "",
      });
    } catch (error) {
      console.error(error);
      alert(error.response?.data.error || "failed!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="datetime-local"
          value={formData.date}
          onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={(e) =>
            setFormData({ ...formData, location: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Latitude"
          value={formData.latitude}
          onChange={(e) =>
            setFormData({ ...formData, latitude: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Longitude"
          value={formData.longitude}
          onChange={(e) =>
            setFormData({ ...formData, longitude: e.target.value })
          }
        />
        <button type="submit">Send</button>
      </form>
    </>
  );
}

export default CreateEvent;
