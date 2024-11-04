import React, { useState,useEffect } from 'react';
import Usermanagment from '../components/admin/users';
import Moviemanagment from '../components/admin/moviemanagment';
import Seriesmanagment from '../components/admin/seriesmanagment';
import Ads from '../components/admin/ads';
import Promo from '../components/admin/promo';
import { useAuth } from '../context/Authcontext'; // Adjust the import as necessary
import { useNavigate } from 'react-router-dom';

const Admin = () => {

  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect effect (example: navigate to a default component)
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login'); // Replace with your desired default path
    }
  }, [isAuthenticated, navigate]);
  const { logout } = useAuth();


  const handleLogout = () => {
    logout(); // Call the logout function from AuthContext
    navigate('/login'); // Redirect to the login page
  };


  // State for toggling dropdowns
  const [isMoviesOpen, setIsMoviesOpen] = useState(false);
  const [isAdsOpen, setIsAdsOpen] = useState(false);

  // State for active component
  const [activeComponent, setActiveComponent] = useState(null);

  // Toggle functions
  const toggleMoviesDropdown = () => setIsMoviesOpen(!isMoviesOpen);
  const toggleAdsDropdown = () => setIsAdsOpen(!isAdsOpen);

  // Main content switcher function
  const renderContent = () => {
    switch (activeComponent) {
      case 'Usermanagment':
        return <Usermanagment />;
      case 'Moviemanagment':
        return <Moviemanagment />;
      case 'Seriesmanagment':
        return <Seriesmanagment />;
      case 'Ads':
        return <Ads />;
      case 'Promo':
        return <Promo />;
      default:
        return <div>Please select an option from the sidebar.</div>;
    }
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="logo-sidebar"
                data-drawer-toggle="logo-sidebar"
                aria-controls="logo-sidebar"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
              >
                <span className="sr-only">Open sidebar</span>
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    fillRule="evenodd"
                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                  />
                </svg>
              </button>
              <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                እይታ
              </span>
            </div>






            <button 
      onClick={handleLogout} 
      className="flex items-center text-gray-500 hover:text-red-600 transition-colors duration-200 font-medium text-sm px-3 py-2 rounded-md"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-4 h-4 mr-1"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M15.75 9V5.25a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v13.5a2.25 2.25 0 002.25 2.25h6.75a2.25 2.25 0 002.25-2.25V15m-9-3h13.5m0 0l-3-3m3 3l-3 3"
        />
      </svg>
      Logout
    </button>


          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">

            {/* Movies & Series Dropdown */}
            <li>
              <button
                onClick={toggleMoviesDropdown}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Movies & Series</span>
                <svg className={`w-4 h-4 ms-auto ${isMoviesOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isMoviesOpen && (
                <ul className="pl-8 space-y-2">
                  <li>
                    <button onClick={() => setActiveComponent('Moviemanagment')} className={`block p-2 text-sm text-gray-900 rounded-lg dark:text-white w-full ${activeComponent == "Moviemanagment" ? 'bg-blue-300': ''}`}>
                      Movies
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveComponent('Seriesmanagment')} className={`block p-2 text-sm text-gray-900 rounded-lg dark:text-white w-full ${activeComponent == "Seriesmanagment" ? 'bg-blue-300': ''}`}>
                      Series
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Ads & Promo Dropdown */}
            <li>
              <button
                onClick={toggleAdsDropdown}
                className="flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <span className="flex-1 ms-3 whitespace-nowrap">Ads & Promo</span>
                <svg className={`w-4 h-4 ms-auto ${isAdsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>
              {isAdsOpen && (
                <ul className="pl-8 space-y-2">
                  <li>
                    <button onClick={() => setActiveComponent('Ads')} className={`block p-2 text-sm text-gray-900 rounded-lg dark:text-white w-full ${activeComponent == "Ads" ? 'bg-blue-300': ''}`}>
                      Ads
                    </button>
                  </li>
                  <li>
                    <button onClick={() => setActiveComponent('Promo')} className={`block p-2 text-sm text-gray-900 rounded-lg dark:text-white w-full ${activeComponent == "Promo" ? 'bg-blue-300': ''}`}>
                      Promotions
                    </button>
                  </li>
                </ul>
              )}
            </li>

            {/* Users */}
            <li>
              <button
                onClick={() => setActiveComponent('Usermanagment')}
                className={`flex items-center w-full p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700  ${activeComponent == "Usermanagment" ? 'bg-blue-300' : ''}`}
              >
                <span className={`flex-1 ms-3 whitespace-nowrap ${activeComponent == "Usermanagment" ? 'text-gray-700 hover:text-white' : ''} `}  >Users</span>
              </button>
            </li>

          </ul>
        </div>
      </aside>

      <div className="p-4 sm:ml-64 bg-blue-200 h-[700px]">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          {/* Main content will render based on the activeComponent state */}
          {renderContent()}
        </div>
      </div>
    </>
  );
};

export default Admin;
