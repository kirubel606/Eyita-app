import React, { useState, useEffect } from 'react';
import api from '../context/axiosInstance';
import Navbare from '../components/navbar';
import { Link } from 'react-router-dom';
import Splash from '../components/splash-screen';

const Movies = () => {
  const [activestate, setActive] = useState("movies");
  const [movies, setMovies] = useState([]);
  const [promos, setPromos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await api.get('/movies');
        setMovies(response.data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };
    fetchMovies();
    
    const fetchPromos = async () => {
      try {
        const response = await api.get('/promos');
        setPromos(response.data);
        console.log("Fetched promos:", response.data);
      } catch (error) {
        console.error("Error fetching promos:", error);
      }
    };
    fetchPromos();
  }, []);

  // Create a combined array of movies and promos
  const combinedData = [];
  const promoLength = promos.length;

  // Interleave movies and promos
  movies.forEach((movie, index) => {
    combinedData.push({ type: 'movie', data: movie });
    // Insert a promo after every 2 movies, cycling through promo data
    if ((index + 1) % 2 === 0 && promoLength > 0) {
      const promoIndex = Math.floor(index / 2) % promoLength;
      combinedData.push({ type: 'promo', data: promos[promoIndex] });
    }
  });

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
            <h1 className="font-black text-5xl text-center mt-6">Movies</h1>
            <p className="text-center mx-6 my-5">Browse and find your favourite Movies</p>
          </div>
          <div className="gap-3 mx-auto flex flex-wrap">
            {combinedData.map((item, index) => (
              <React.Fragment key={index}>
                {item.type === 'movie' ? (
                  // Movie Card
                  <div className="w-64 h-3/5 shadow-xl p-2 transform transition duration-300 hover:scale-105 hover:shadow-xl rounded-md">
                    <Link to={`/vidplay?id=${item.data._id}`}>
                      <div className="film-poster">
                        <img src={item.data.poster} alt={item.data.title} className="film-poster-img w-full" />
                      </div>
                    </Link>
                    <div className="film-detail p-2">
                      <h2 className="film-name lg:text-lg md:text-sm sm:text-sm font-bold mb-2">
                        {item.data.title}
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
                        <span className="text-gray-600 lg:text-lg md:text-sm sm:text-sm">{item.data.view_count}</span>
                      </div>
                      <div className="flex items-center float-left">{item.data.releaseYear}</div>
                    </div>
                  </div>
                ) : (
              // Promo Card
              <Link to={item.data.link}>
              <div className="w-80 h-3/5 rounded-lg overflow-hidden shadow-lg bg-gradient-to-br p-4 flex flex-col justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl m-2">
                <h3 className="font-extrabold text-2xl mb-3">{item.data.title || "Promo Title"}</h3>
                <div className="film-poster mb-3">
                  <img src={item.data.image} alt={item.data.title} className="film-poster-img w-full h-40 object-cover rounded-md border-2 border-white shadow-md" />
                </div>
                <p className=" h-[415px] text-sm font-medium leading-relaxed">{item.data.description || "Promo Description"}</p>
                <button className="mt-4 py-2 px-5 rounded-full bg-white text-indigo-500 font-bold text-sm shadow-md hover:bg-gray-100 transition duration-200 ease-in-out">
                  Learn More
                </button>
              </div>
              </Link>
                )}
              </React.Fragment>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Movies;

