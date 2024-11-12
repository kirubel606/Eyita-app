import { useState, useEffect } from 'react';
import Navbare from '../components/navbar';
import api from '../context/axiosInstance';
import Splash from '../components/splash-screen';
import {Link} from 'react-router-dom';

function Home() {
  const [loading, setLoading] = useState(true); // Loading state to control splash screen visibility
  const [activestate, setActive] = useState("home");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Set a timeout to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 3000 ms = 3 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
  }, []);

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
    <>
      {loading ? (
        // Render splash screen as full-screen overlay
        <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
          <Splash />
        </div>
      ) : (
        // Render main content once loading is complete
        <>
          <Navbare active={activestate} />
          <div className='relative bg-[#FDA758] w-full overflow-clip '>
                <div className='bg-gradient-to-br from-black to-transparent h-[1000px] sm:h-[500px] md:h-[610px] w-full inset-0 relative z-20'>
                  <h1 className='font-bold text-9xl text-white text-center p-5'>እይታ</h1>
                  <p className='text-white text-3xl text-center'>እንኳን ደህና መጡ!</p>
                  <p className='text-white text-2xl text-center'>የሚፈልጉትን ሁሉ እዚሁ እኛ ጋር ያገኛሉ ! </p>
                  <div className="flex justify-center items-center h-1/2">
                  <Link to={`/movies`} className="text-black no-underline hover:underline">

                    <button className='sm:text-4xl md:text-4xl xl:text-5xl text-white py-5 px-5 bg-[#FDA758] text-7xl rounded-lg bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,.2)_80%,transparent_55%,transparent_100%)] relative max-w-md overflow-hidden bg-[length:250%_250%,100%_100%] bg-[position:-100%_0,0_0] bg-no-repeat shadow-[#4d3a28] shadow-xl transition-[background-position_0s_ease] hover:bg-[position:200%_0,0_0] hover:duration-[1500ms]'>ይጀምሩ</button>
                  </Link>
                  </div>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-10 gap-2 -rotate-6 absolute z-0 top-0 w-[100%] mx-auto " >
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRwfTiquetFOE6X8XWMBjUZxRO95Fs1c8iQ&s" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image1.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image2.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image3.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRwfTiquetFOE6X8XWMBjUZxRO95Fs1c8iQ&s" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image1.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image2.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image3.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRwfTiquetFOE6X8XWMBjUZxRO95Fs1c8iQ&s" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image1.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image2.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image3.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRwfTiquetFOE6X8XWMBjUZxRO95Fs1c8iQ&s" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image1.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image2.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image3.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtRwfTiquetFOE6X8XWMBjUZxRO95Fs1c8iQ&s" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image1.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image2.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                  <div>
                    <img id="image6_2_5" className='w-[600px] rounded-lg' src="./images/image3.jpg" alt="Amharic Movie Thumbnail" />
                  </div>
                </div>
          </div>
          <div className="container mx-auto p-4">
            {movies.map((movie) => (
              <div key={movie._id} className="max-w-2xl mx-auto mb-8 border-b border-gray-300 pb-8">
                <Link to={`/vidplay?id=${movie._id}`} className="text-black no-underline hover:underline">
                  <h2 className="text-2xl font-serif font-bold text-gray-800 mb-4">
                    {movie.title}
                  </h2>
                </Link>
                <div className="flex items-start space-x-6">
                  <img
                    src={movie.poster}
                    alt={movie.title}
                    className="w-40 h-auto rounded shadow-lg"
                  />
                  <div>
                    <p className="text-gray-600 text-lg font-serif mb-4">
                      {movie.description}
                    </p>
                    <p className="text-gray-500 italic text-sm mb-2">
                      Release Date: {movie.releaseYear || "Unknown"}
                    </p>
                    <Link
                      to={`/vidplay?id=${movie._id}`}
                      className="inline-block text-blue-600 font-semibold hover:underline"
                    >
                      Watch now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </>
      )}
    </>
  );
}

export default Home;
