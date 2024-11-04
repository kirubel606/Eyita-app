import React, { useState, useEffect } from 'react';
import api from '../../context/axiosInstance';


const Seriesmanagment = () => {
  const [seriesList, setSeriesList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSeries, setNewSeries] = useState({
    title: '',
    description: '',
    poster: '',
    category: '',
    viewCount: 0,
    seasons: [],
  });
  const [editingSeries, setEditingSeries] = useState(null);

  const categories = ["Action", "Mystery", "Drama", "Comedy"];

  // Fetch all series
  const fetchSeries = async () => {
    try {
      const response = await api.get('/series'); // Replace '/api/series' with the correct URL
      setSeriesList(response.data);
    } catch (error) {
      console.error("Error fetching series:", error);
    } finally {
      setLoading(false);
    }
  };

  // Add a new series
  const handleAddSeries = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/series', newSeries); // Adjust the URL as necessary
      setSeriesList([...seriesList, response.data]);
      setIsModalOpen(false);
      setNewSeries({
        title: '',
        description: '',
        poster: '',
        category: '',
        viewCount: 0,
        seasons: [],
      });
    } catch (error) {
      console.error("Error adding series:", error);
    }
  };
  const addSeason = () => {
    setNewSeries((prevSeries) => ({
      ...prevSeries,
      seasons: [
        ...prevSeries.seasons,
        {
          seasonNumber: prevSeries.seasons.length + 1, // Incrementing season number
          episodes: [],
        },
      ],
    }));
  };
  const removeSeason = (index) => {
    setNewSeries((prevSeries) => ({
      ...prevSeries,
      seasons: prevSeries.seasons.filter((_, i) => i !== index),
    }));
  };
    
  const addEpisode = (seasonIndex) => {
    setNewSeries((prevSeries) => {
      const updatedSeasons = prevSeries.seasons.map((season, index) => {
        if (index === seasonIndex) {
          // Add a new episode with default details
          return {
            ...season,
            episodes: [
              ...season.episodes,
              { episodeNumber: season.episodes.length + 1, title: "", description: "" }
            ]
          };
        }
        return season;
      });
      return {
        ...prevSeries,
        seasons: updatedSeasons,
      };
    });
  };
      
  // Update an existing series
  const handleUpdateSeries = async (e) => {
    e.preventDefault();
    try {
      const response = await api.put(`/series/${editingSeries._id}`, newSeries); // Use correct URL with ID
      setSeriesList(seriesList.map((series) =>
        series.id === editingSeries.id ? response.data : series
      ));
      setEditingSeries(null);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating series:", error);
    }
  };

  // Delete a series
  const handleDelete = async (seriesId) => {
    try {
      await api.delete(`/series/${seriesId}`); // Adjust the URL accordingly
      setSeriesList(seriesList.filter((series) => series.id !== seriesId));
    } catch (error) {
      console.error("Error deleting series:", error);
    }
  };

  useEffect(() => {
    fetchSeries();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Series Management</h1>

      {/* Add New Series Button */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setIsModalOpen(true)} // Open modal on click
        >
          Add New Series
        </button>
      </div>

      {/* Series Table */}
      {loading ? (
        <p>Loading series...</p>
      ) : (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border">Title</th>
              <th className="py-2 px-4 border">Description</th>
              <th className="py-2 px-4 border">Category</th>
              <th className="py-2 px-4 border">View Count</th>
              <th className="py-2 px-4 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {seriesList.map((series) => (
              <tr key={series.id}>
                <td className="py-2 px-4 border">{series.title}</td>
                <td className="py-2 px-4 border">{series.description}</td>
                <td className="py-2 px-4 border">{series.category}</td>
                <td className="py-2 px-4 border">{series.view_count}</td>
                <td className="py-2 px-4 border">
                  {/* Edit Button */}
                  <button
                    className="bg-yellow-500 text-white px-2 py-1 mr-2 rounded"
                    onClick={() => {
                      setEditingSeries(series); // Set the series to edit
                      setNewSeries({
                        title: series.title,
                        description: series.description,
                        poster: series.poster,
                        category: series.category,
                        viewCount: series.view_count,
                        seasons: series.seasons, // Load existing seasons
                      });
                      setIsModalOpen(true); // Open modal
                    }}
                    
                  >
                    Edit
                  </button>
                  
                  
                  {/* Delete Button */}
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => handleDelete(series._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {/* Modal for Adding New Series */}
{/* Modal for Adding New Series */}
{isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-bold mb-4">Add New Series</h2>
      <form onSubmit={editingSeries ? handleUpdateSeries : handleAddSeries}>

        {/* Title Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Title</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
            value={newSeries.title}
            onChange={(e) => setNewSeries({ ...newSeries, title: e.target.value })}
            required
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
            value={newSeries.description}
            onChange={(e) => setNewSeries({ ...newSeries, description: e.target.value })}
            required
          />
        </div>

        {/* Poster URL Field */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Poster URL</label>
          <input
            type="text"
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
            value={newSeries.poster}
            onChange={(e) => setNewSeries({ ...newSeries, poster: e.target.value })}
            required
          />
        </div>

        {/* Category Dropdown */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Category</label>
          <select
            className="mt-1 block w-full border border-gray-300 px-3 py-2 rounded-md"
            value={newSeries.category}
            onChange={(e) => setNewSeries({ ...newSeries, category: e.target.value })}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Nested Seasons and Episodes */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Seasons & Episodes</label>
          {newSeries.seasons.map((season, seasonIndex) => (
            <div key={season.seasonID} className="mb-2 p-2 border border-gray-300 rounded-md">
              <div className="flex justify-between items-center mb-2">
                <span>Season {season.season_number}</span>
                <button
                  type="button"
                  className="text-red-500 text-sm"
                  onClick={() => removeSeason(seasonIndex)}
                >
                  Remove Season
                </button>
              </div>
              <div className="ml-4">
              {season.episodes.map((episode, episodeIndex) => (
  <div key={episode.episodeID} className="mb-1">
    <label>
      Episode {episode.episode_number} Title:
      <input
        type="text"
        value={episode.title}
        onChange={(e) => {
          const updatedSeasons = [...newSeries.seasons];
          updatedSeasons[seasonIndex].episodes[episodeIndex].title = e.target.value;
          setNewSeries({ ...newSeries, seasons: updatedSeasons });
        }}
      />
    </label>
    <label>
      Link:
      <input
        type="text"
        value={episode.link}
        onChange={(e) => {
          const updatedSeasons = [...newSeries.seasons];
          updatedSeasons[seasonIndex].episodes[episodeIndex].link = e.target.value;
          setNewSeries({ ...newSeries, seasons: updatedSeasons });
        }}
      />
    </label>
    <button
      type="button"
      className="text-red-500 text-sm ml-2"
      onClick={() => removeEpisode(seasonIndex, episodeIndex)}
    >
      Remove
    </button>
  </div>
))}

                <button
                  type="button"
                  className="text-blue-500 text-sm mt-1"
                  onClick={() => addEpisode(seasonIndex)}
                >
                  Add Episode
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="text-blue-500 text-sm"
            onClick={addSeason}
          >
            Add Season
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end">
          <button
            type="button"
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
            onClick={() => setIsModalOpen(false)}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
             {editingSeries ? 'Update Series' : 'Add Series'}
          </button>
        </div>
      </form>
    </div>
  </div>
)}

    </div>
  );
};

export default Seriesmanagment;
