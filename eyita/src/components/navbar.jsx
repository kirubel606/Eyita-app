import { useState } from 'react';
import { Link } from 'react-router-dom'

function Navbare({ active }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="border-gray-200 bg-[#FDA758] relative z-20">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <a className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-3xl whitespace-nowrap dark:text-white font-extrabold">እይታ</span>
        </a>
        <div className="flex md:order-2">
          <div className="relative hidden md:block">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search icon</span>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-gray-900 border border-[#553416] rounded-lg bg-[#FDA758] focus:ring-[#613c19] focus:border-[#49321c] dark:placeholder-gray-200 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search..." />
          </div>
          <button
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-[#301e0d] focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-search"
            aria-expanded={isMenuOpen}
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div className={`${isMenuOpen ? 'block' : 'hidden'} items-center justify-between w-full md:flex md:w-auto md:order-1`} id="navbar-search">
          <div className="relative mt-3 md:hidden">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg className="w-4 h-4 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
            </div>
            <input type="text" id="search-navbar" className="block w-full p-2 ps-10 text-sm text-white border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-[#FDA758]  dark:text-white placeholder:text-white" placeholder="Search..." />
          </div>
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border hover:border-gray-100 rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-white dark:bg-[#FDA758]">
            <li>
              <Link to='/'>
                <a href="#" className={active == "home" ? `text-[#fdfdfd] border-b-4 text-center block hover:bg-[#704823] px-5` : `text-[#000000] text-center px-5`} aria-current="page">Home</a>
              </Link>
            </li>
            <li>
              <Link to='/movies'>
                <a href="#" className={active == "movies" ? `text-[#fdfdfd] border-b-4 text-center block hover:bg-[#704823] px-5` : `text-[#000000] text-center px-5`}>Movies</a>
              </Link>
            </li>
            <li>
              <Link to='/tvshows'>
                <a href="#" className={active == "tvshows" ? `text-[#fdfdfd] border-b-4 text-center block hover:bg-[#704823] px-5` : `text-[#000000] text-center px-5`}>Tv Shows</a>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbare;
