import React, { useState } from 'react';
import api from '../../context/axiosInstance';

function Moviemanagement() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [releaseYear, setReleaseYear] = useState('');
  const [link, setLink] = useState(''); 
  const [poster, setPoster] = useState(''); 
  const [view_count, setView_count] = useState(0); 
  const [category, setCategory] = useState(''); 
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newMovie = {
      title,
      description,
      releaseYear,
      link,
      category,
      poster,
      view_count
    };

    try {
      // Make an API call to add the new movie
      const response = await api.post('/movies', newMovie);
      setMessage('Movie successfully added!');
      
      // Clear the form
      setTitle('');
      setDescription('');
      setReleaseYear('');
      setLink('');
      setPoster('');
      setCategory('');
      setView_count(0);
    } catch (error) {
      console.error('Error adding movie: ', error);
      setMessage('Failed to add movie.');
    }
  };

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Movie Management</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">Genre:</label>
          <textarea
            type="text"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Release Year:</label>
          <input
            type="number"
            id="releaseYear"
            value={releaseYear}
            onChange={(e) => setReleaseYear(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="link" className="block text-sm font-medium text-gray-700">Movie Link:</label>
          <input
            type="url"
            id="link"
            value={link}
            onChange={(e) => setLink(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category:</label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          >
            <option value="" disabled>Select a category</option>
            <option value="Action">Action</option>
            <option value="Comedy">Comedy</option>
            <option value="Drama">Drama</option>
            <option value="Horror">Horror</option>
            <option value="Sci-Fi">Sci-Fi</option>
            <option value="Romantic">Romantic</option>
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="poster" className="block text-sm font-medium text-gray-700">Poster Image (link):</label>
          <input
            type="url"
            id="poster"
            value={poster}
            onChange={(e) => setPoster(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white font-bold rounded-md">
          Add Movie
        </button>
      </form>
    </div>
  );
}

export default Moviemanagement;
