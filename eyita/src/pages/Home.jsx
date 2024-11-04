import { useState, useEffect } from 'react';
import Navbare from '../components/navbar';
import Splash from '../components/splash-screen';

function Home() {
  const [loading, setLoading] = useState(true); // Loading state to control splash screen visibility
  const [activestate, setActive] = useState("home");

  useEffect(() => {
    // Set a timeout to hide the splash screen after 3 seconds
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); // 3000 ms = 3 seconds

    // Clear the timer if the component unmounts
    return () => clearTimeout(timer);
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
                <div className='bg-gradient-to-br from-black to-transparent h-[1000px] sm:h-[300px] md:h-[610px] w-full inset-0 relative z-20'></div>
                <div className="grid grid-cols-4 sm:grid-cols-3 lg:grid-cols-6 xl:grid-cols-10 gap-2 -rotate-6 absolute z-0 top-0 w-[100%] mx-auto " >
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
          
        </>
      )}
    </>
  );
}

export default Home;
