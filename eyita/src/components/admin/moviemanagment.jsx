import React, { useState ,useEffect } from 'react';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);

  // Handle form submit for adding/editing movies
  const handleSubmit = async (e) => {
    e.preventDefault();
    const movieData = {
      title,
      description,
      releaseYear,
      link,
      category,
      poster,
      view_count,
    };

    try {
      if (isEditing) {
        // Update existing movie
        await api.put(`/movies/${editingMovieId}`, movieData);
        setMovies(
          movies.map((movie) => (movie._id === editingMovieId ? { ...movie, ...movieData } : movie))
        );
        setMessage('Movie successfully updated!');
      } else {
        // Add new movie
        const response = await api.post('/movies', movieData);
        setMovies([...movies, response.data]);
        setMessage('Movie successfully added!');
      }
      closeForm();
    } catch (error) {
      console.error('Error saving movie: ', error);
      setMessage(isEditing ? 'Failed to update movie.' : 'Failed to add movie.');
    }
  };

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };
    fetchMovies();

  }, []);

    
  const handleDelete = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      setMovies(movies.filter((movie) => movie._id !== id)); // Remove the deleted movie from state
      setMessage('Movie successfully deleted!');
    } catch (error) {
      console.error('Error deleting movie:', error);
      setMessage('Failed to delete movie.');
    }
  };
    // Open form for adding a new movie
    const openFormForAdd = () => {
      resetForm();
      setIsEditing(false);
      setIsModalOpen(true);
    };
  
    // Open form for editing an existing movie
    const openFormForEdit = (movie) => {
      setTitle(movie.title);
      setDescription(movie.description);
      setReleaseYear(movie.releaseYear);
      setLink(movie.link);
      setPoster(movie.poster);
      setView_count(movie.view_count);
      setCategory(movie.category);
      setIsEditing(true);
      setEditingMovieId(movie._id);
      setIsModalOpen(true);
    };
  
    // Reset form fields
    const resetForm = () => {
      setTitle('');
      setDescription('');
      setReleaseYear('');
      setLink('');
      setPoster('');
      setView_count(0);
      setCategory('');
    };
  
    // Close the form modal
    const closeForm = () => {
      resetForm();
      setIsModalOpen(false);
      setEditingMovieId(null);
    };
  

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4 text-center">Movie Management</h1>
      {message && <p className="text-green-500 mb-4">{message}</p>}

      {/* Add Movie Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-6 px-6 py-2 bg-blue-500 text-white font-semibold rounded-md"
      >
        Add Movie
      </button>

      {/* Modal for Adding Movie */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white w-full max-w-lg rounded-lg shadow-lg p-6 relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Movie' : 'Add New Movie'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
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
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description:</label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label htmlFor="releaseYear" className="block text-sm font-medium text-gray-700">Release Year:</label>
                <select
                  id="releaseYear"
                  value={releaseYear}
                  onChange={(e) => setReleaseYear(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="">Select Year</option>
                  {Array.from({ length: new Date().getFullYear() - 1899 }, (_, i) => (
                    <option key={i} value={1900 + i}>
                      {1900 + i}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="link" className="block text-sm font-medium text-gray-700">Movie Link (YouTube):</label>
                <input
                  type="url"
                  id="link"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
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
              <div>
                <label htmlFor="poster" className="block text-sm font-medium text-gray-700">Poster Image (URL):</label>
                <input
                  type="url"
                  id="poster"
                  value={poster}
                  onChange={(e) => setPoster(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="mt-4 w-full px-4 py-2 bg-blue-500 text-white font-bold rounded-md"
              >
                {isEditing ? 'Update Movie' : 'Add Movie'}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Table to Display Movies */}
      <table className="min-w-full bg-white mt-8 border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-4 py-2 border-b font-semibold">Title</th>
            <th className="px-4 py-2 border-b font-semibold">Release Year</th>
            <th className="px-4 py-2 border-b font-semibold">Category</th>
            <th className="px-4 py-2 border-b font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id} className="hover:bg-gray-50">
              <td className="px-4 py-2 border-b">{movie.title}</td>
              <td className="px-4 py-2 border-b">{movie.releaseYear}</td>
              <td className="px-4 py-2 border-b">{movie.category}</td>
              <td className="px-4 py-2 border-b space-x-2">
                <button className="px-3 py-1 bg-yellow-400 text-white rounded-md" onClick={() => openFormForEdit(movie)}>Edit</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded-md" onClick={() => handleDelete(movie._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Moviemanagement;
