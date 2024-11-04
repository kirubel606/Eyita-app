import React, { useState, useEffect } from 'react';
import api from '../context/axiosInstance';
import Navbare from '../components/navbar';
import { Link } from 'react-router-dom';
import Splash from '../components/splash-screen';

const Movies = () => {
  const [activestate, setActive] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state to control splash screen visibility

  console.log(movies);
  useEffect(() => {
    // Set a timeout to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 3000 ms = 3 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);
  // Fetch movies from the API using Axios
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies'); // Replace '/api/movies' with your actual endpoint
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div>
      {loading ? (
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
        <Splash />
      </div>
         ) : (
          <>
      <Navbare active={activestate} />

      <div>
        <h1 className='font-black text-5xl text-center mt-6'>Movies</h1>
        <p className='text-center mx-6 my-5'>Browse and find your favourite Movies</p>
      </div>

      <div className="mx-6 gap-3 flex flex-wrap">
        {movies.map((movie) => (
          <div key={movie._id} className="max-w-40 md:max-w-64 sm:max-w-80 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer">
            <Link to={`/vidplay?id=${movie._id}`}>
              <div className="film-poster">
                <img
                  src={movie.poster}
                  alt={movie.title}
                  className="film-poster-img w-56"
                />
              </div>
            </Link>
            <div className="film-detail p-2">
              <h2 className="film-name lg:text-lg md:text-sm sm:text-sm font-bold mb-2">
                {movie.title}
              </h2>
              <div className="flex items-center float-right">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500 mr-1"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12c0 2.21-1.79 4-4 4s-4-1.79-4-4 1.79-4 4-4 4 1.79 4 4z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M2.458 12C3.732 7.943 7.522 5 12 5c4.478 0 8.268 2.943 9.542 7-.058.178-.121.354-.19.53a9.985 9.985 0 01-.352.98C19.267 17.057 15.477 20 12 20c-4.478 0-8.268-2.943-9.542-7 .07-.173.134-.349.19-.53a9.985 9.985 0 01.352-.98z"
                  />
                </svg>
                <span className="text-gray-600 lg:text-lg md:text-sm sm:text-sm">{movie.view_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      </>
      )}
    </div>
  );
};

export default Movies;
