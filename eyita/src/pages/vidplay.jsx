import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../context/axiosInstance';
import Navbare from '../components/navbar';

const Vidplay = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id');
  console.log(id);
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState({
    link1: '',
    link2: '',
    link3: '',
    adClient: ''
  });

  useEffect(() => {
    if (id) {
      api.get(`/movies/${id}`)
        .then((response) => {
          setMovie(response.data);
          setLoading(false);
        })
        .catch((error) => {
          setError('Failed to load movie data.');
          setLoading(false);
        });
    }
  }, [id]);

  useEffect(() => {
    const fetchAdvert = async () => {
      try {
        const response = await api.get('/adverts');
        // If the response contains an advert, update the state
        if (response.data) {
          setAdvert(response.data);
        }
      } catch (error) {
        console.error("Error fetching advert:", error);
      }
    };
    fetchAdvert();
  }, []);

  const extractYouTubeVideoId = (url) => {
    let videoId = '';
    const shortUrlMatch = url.match(/youtu\.be\/([a-zA-Z0-9_-]+)/);
    const longUrlMatch = url.match(/v=([a-zA-Z0-9_-]+)/);
    const embedUrlMatch = url.match(/embed\/([a-zA-Z0-9_-]+)/);

    if (shortUrlMatch) {
      videoId = shortUrlMatch[1];
    } else if (longUrlMatch) {
      videoId = longUrlMatch[1];
    } else if (embedUrlMatch) {
      videoId = embedUrlMatch[1];
    } else {
      throw new Error("Invalid YouTube URL");
    }

    return videoId;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className=''>
      <Navbare />
      {movie && (
        <div className='mx-5 mt-5 mb-2'>
          <iframe
            width="1000"
            height="500"
            className='mx-auto rounded-xl border-blue-500 border-4'
            src={`https://www.youtube.com/embed/${extractYouTubeVideoId(movie.link)}`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          <div className='flex shadow-xl p-5 rounded-lg'>
            {movie.poster && (
              <img
                src={movie.poster}
                alt={movie.title}
                className='w-40 h-auto rounded-lg mr-5'
              />
            )}
            <div className='flex flex-col justify-start'>
              <h1 className='font-extrabold text-2xl mb-2'>{movie.title}</h1>
              <p className='mb-1'>Release Year: {movie.releaseYear}</p>
              <p className='mb-1'>Category: {movie.category}</p>
              <p className='mb-1'>{movie.description}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Vidplay;
