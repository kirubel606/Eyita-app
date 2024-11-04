import React, { useState, useEffect } from 'react';
import api from '../context/axiosInstance';
import Navbare from '../components/navbar';

const Seriesmanagment = () => {
  const [series, setSeries] = useState({});
  const [loading, setLoading] = useState(true);
  const [selectedSeason, setSelectedSeason] = useState(null);
  const [embeddedVideoId, setEmbeddedVideoId] = useState('');
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get('id'); // Assume searchParams is defined elsewhere
  console.log(series);
  useEffect(() => {
    // Fetch the specific series when the component mounts or the id changes
    const fetchSeries = async () => {
      try {
        const response = await api.get(`/series/${id}`); // Fetch the series by id
        setSeries(response.data);
        setLoading(false);

        // Set default season and episode if seasons exist
        if (response.data.seasons.length > 0) {
          const firstSeason = response.data.seasons[0];
          setSelectedSeason(firstSeason);
          if (firstSeason.episodes.length > 0) {
            const videoId = extractYouTubeVideoId(firstSeason.episodes[0].link);
            setEmbeddedVideoId(videoId);
          }
        }
      } catch (error) {
        console.error("Error fetching series:", error);
        setLoading(false);
      }
    };

    fetchSeries();
  }, [id]);

  // Function to extract YouTube video ID from a URL
  const extractYouTubeVideoId = (url) => {
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?/\s]{11})/i;
    const match = url.match(regex);
    return match ? match[1] : null;
  };

  // Handle season selection
  const handleSeasonChange = (event) => {
    const seasonIndex = event.target.value;
    setSelectedSeason(series.seasons[seasonIndex]);
  };

  // Handle episode click to embed the video
  const handleEpisodeClick = (episodeLink) => {
    const videoId = extractYouTubeVideoId(episodeLink);
    if (videoId) {
      setEmbeddedVideoId(videoId);
    } else {
      alert('Invalid YouTube link');
    }
  };

  return (
    <>
    <Navbare/>
    <div className="container mx-auto p-4">
      
      <h1 className="text-2xl font-bold mb-4">{series.title}</h1>
          {/* Embedded YouTube Video */}
          {embeddedVideoId && (
            <div className="mt-4 mb-5">
              <iframe
                width="1000"
                height="500"
                className='mx-auto rounded-xl border-blue-500 border-4'
                src={`https://www.youtube.com/embed/${embeddedVideoId}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
      {loading ? (
        <p>Loading series...</p>
      ) : (
        <div>
          {/* Season Dropdown */}
          {series && (
            <div>
              <select
                className="block w-1/7 mb-4 border border-gray-300 px-3 py-2 rounded-md"
                onChange={handleSeasonChange}
              >
                <option value="">Select a Season</option>
                {series.seasons.map((season, index) => (
                  <option key={season.seasonID} value={index}>
                    Season {season.season_number}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Episode Buttons */}
          {selectedSeason && (
            <div>
              {selectedSeason.episodes.map((episode) => (
                <button
                  key={episode.episodeID}
                  className="block bg-blue-500 text-white mb-2 px-4 py-2 rounded active:bg-blue-950"
                  onClick={() => handleEpisodeClick(episode.link)}
                >
                  {episode.title}
                </button>
              ))}
            </div>
          )}


        </div>
      )}

      <h1 className="text-2xl font-bold mb-4">{series.title}</h1>
      <p>{series.description}</p>
    </div>
    </>
  );
};

export default Seriesmanagment;
