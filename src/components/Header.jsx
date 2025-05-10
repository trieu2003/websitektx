
// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';

// function Header() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [scrolling, setScrolling] = useState(false); // State to track scroll
//   const location = useLocation(); // Get the current location

//   // Detect scroll event
//   useEffect(() => {
//     const handleScroll = () => {
//       if (window.scrollY > 50) {
//         setScrolling(true); // Set to true when user scrolls down
//       } else {
//         setScrolling(false); // Set to false when at the top of the page
//       }
//     };

//     window.addEventListener('scroll', handleScroll);

//     return () => {
//       window.removeEventListener('scroll', handleScroll);
//     };
//   }, []);

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   // Helper function to determine if a link is active
//   const isActive = (path) => location.pathname === path;

//   return (
//     <header
//       className={`fixed w-full z-50 transition-all duration-200 ease-in-out ${
//         scrolling ? 'bg-black py-4' : 'bg-transparent py-4 md:py-4'
//       }`}
//     >
//       <div className="container mx-auto flex justify-between items-center px-8">
//         {/* Logo */}
//         <div className="flex items-center space-x-2">
//           <img
//             src="/images/tmovie-55621206.png"
//             alt="theMovies logo"
//             className="w-12 h-12"
//           />
//           <Link to="/" className="text-4xl font-bold text-white">
//             theMovies
//           </Link>
//         </div>

//         {/* Desktop Menu */}
//         <nav className="hidden md:flex space-x-8">
//           <Link
//             to="/"
//             className={`text-white text-2xl relative transition-all ${
//               isActive('/') ? 'active-link' : ''
//             }`}
//           >
//             Home
//           </Link>
//           <Link
//             to="/movies"
//             className={`text-white text-2xl relative transition-all ${
//               isActive('/movies') ? 'active-link' : ''
//             }`}
//           >
//             Movies
//           </Link>
//           <Link
//             to="/tv-series"
//             className={`text-white text-2xl relative transition-all ${
//               isActive('/tv-series') ? 'active-link' : ''
//             }`}
//           >
//             TV Series
//           </Link>
//         </nav>

//         {/* Hamburger Menu (Mobile) */}
//         <div className="md:hidden">
//           <button onClick={toggleMenu} className="text-white hover:text-red-600">
//             <i className="fas fa-bars"></i>
//           </button>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <div
//         className={`${
//           isMenuOpen ? 'block' : 'hidden'
//         } bg-black text-white md:hidden`}
//       >
//         <ul className="flex flex-col items-center space-y-4 py-4">
//           <li>
//             <Link
//               to="/"
//               className={`relative transition-all hover-link ${
//                 isActive('/') ? 'active-link' : ''
//               }`}
//             >
//               Home
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/movies"
//               className={`relative transition-all hover-link ${
//                 isActive('/movies') ? 'active-link' : ''
//               }`}
//             >
//               Movies
//             </Link>
//           </li>
//           <li>
//             <Link
//               to="/tv-series"
//               className={`relative transition-all hover-link ${
//                 isActive('/tv-series') ? 'active-link' : ''
//               }`}
//             >
//               TV Series
//             </Link>
//           </li>
//         </ul>
//       </div>
//     </header>
//   );
// }

// export default Header;
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
