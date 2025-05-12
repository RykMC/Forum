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
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-6 rounded-2xl shadow-lg w-full max-w-lg mx-auto flex flex-col space-y-4 mt-8"
      >
        <h2 className="text-2xl font-bold text-center text-white">Create Event</h2>

        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Date & Time:</label>
          <input
            type="datetime-local"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Title:</label>
          <input
            type="text"
            placeholder="Title"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Description:</label>
          <input
            type="text"
            placeholder="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-300 mb-1">Location:</label>
          <input
            type="text"
            placeholder="Location"
            value={formData.location}
            onChange={(e) =>
              setFormData({ ...formData, location: e.target.value })
            }
            className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Latitude:</label>
            <input
              type="text"
              placeholder="Latitude"
              value={formData.latitude}
              onChange={(e) =>
                setFormData({ ...formData, latitude: e.target.value })
              }
              className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-gray-300 mb-1">Longitude:</label>
            <input
              type="text"
              placeholder="Longitude"
              value={formData.longitude}
              onChange={(e) =>
                setFormData({ ...formData, longitude: e.target.value })
              }
              className="p-3 rounded bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
        </div>

        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-semibold py-2 px-4 rounded-xl shadow hover:scale-105 transition-all duration-300"
        >
          Send
        </button>
      </form>

    </>
  );
}

export default CreateEvent;
