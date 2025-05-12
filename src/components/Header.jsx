
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolling, setScrolling] = useState(false);
  const location = useLocation();

  // Detect scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolling(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`px-8 flex justify-center fixed top-0 w-full z-50 transition-all duration-200 ease-in-out py-0 md:py-8 ${
        scrolling ? 'bg-black' : 'bg-transparent'
      }`}
    >
      <div className="max-w-screen-2xl flex justify-between items-center w-full">
        <a className="hidden md:flex items-center hover:cursor-pointer group" href="/">
          <img
            src="/images/tmovie-55621206.png"
            alt="Logo"
            className="mr-4 w-8 md:w-12"
          />
          <h1 className="text-white font-semibold text-2xl md:text-4xl group-hover:text-red-main group-hover:transition-custom">
            theMovies
          </h1>
        </a>

        <div
          className="fixed md:relative left-0 md:left-auto right-0 md:right-auto bottom-0 md:bottom-auto flex items-center justify-evenly bg-black md:bg-transparent py-2 md:py-4 -mx-4"
        >
          <div className="px-4">
            <Link
              to="/"
              className={`nav-item text-lg md:text-2xl ${isActive('/') ? 'after:w-full' : ''}`}
            >
              Home
            </Link>
          </div>
          <div className="px-4">
            <Link
              to="/movies"
              className={`nav-item text-lg md:text-2xl ${isActive('/movies') ? 'after:w-full' : ''}`}
            >
              Movies
            </Link>
          </div>
          <div className="px-4">
            <Link
              to="/tv-series"
              className={`nav-item text-lg md:text-2xl ${isActive('/tv-series') ? 'after:w-full' : ''}`}
            >
              TV Series
            </Link>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-white hover:text-red-600"
          >
            <i className="fas fa-bars"></i>
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? 'block' : 'hidden'
          } bg-black text-white md:hidden absolute top-full left-0 w-full`}
        >
         <div className="px-4 ">
  <Link
    to="/"
    className={` nav-item  ${isActive('/') ? 'active-link' : ''}`}
  >
    Home
  </Link>
</div>
<div className="px-4">
  <Link
    to="/movies"
    className={`nav-item text-2xl ${isActive('/movies') ? 'active-link' : ''}`}
  >
    Movies
  </Link>
</div>
<div className="px-4">
  <Link
    to="/tv-series"
    className={`nav-item text-2xl ${isActive('/tv-series') ? 'active-link' : ''}`}
  >
    TV Series
  </Link>
</div>

        </div>
      </div>
    </header>
  );
}

export default Header;
