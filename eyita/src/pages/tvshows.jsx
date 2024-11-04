import React, { useState, useEffect } from 'react';
import api from '../context/axiosInstance';
import Navbare from '../components/navbar';
import { Link } from 'react-router-dom';

const TvShows = () => {
  const [activestate, setActive] = useState("tvshows");
  const [tvshows, setTvshows] = useState([]);
  console.log(tvshows);
  useEffect(() => {
    const fetchTvShows = async () => {
      try {
        const response = await api.get('/series'); // Replace with your actual API endpoint
        setTvshows(response.data);
      } catch (error) {
        console.error("Error fetching TV shows:", error);
      }
    };
    
    fetchTvShows();
  }, []);

  return (
    <div>
      <Navbare active={activestate} />
      <div>
        <h1 className='font-black text-5xl text-center mt-6'>Series</h1>
        <p className='text-center mx-6 my-5'>Browse and find your favourite series.</p>
      </div>

      <div className="mx-6 gap-3 flex">
        {tvshows.map((tvshow) => (
          <div key={tvshow.id} className="max-w-40 md:max-w-64 sm:max-w-80 rounded-lg overflow-hidden shadow-lg bg-white cursor-pointer">
            <Link to={`/seriesplay?id=${tvshow._id}`}>
              <div className="film-poster">
                <img
                  src={tvshow.poster}
                  alt="Trouble"
                  className="film-poster-img w-56"
                />
              </div>
            </Link>
            <div className="film-detail">
              <h2 className="film-name lg:text-lg md:text-sm sm:text-sm font-bold mb-2 ml-1">
                {tvshow.title}
              </h2>
              <div className="flex items-center float-right mr-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-4 h-4 text-gray-500"
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
                <span className="text-gray-600 lg:text-lg md:text-sm sm:text-sm">{tvshow.view_count}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TvShows;
