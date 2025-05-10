
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-black w-full h-auto text-white py-44 sm:py-20  bg-cover bg-center mt-[-20px]" style={{ backgroundImage: "url('../public/images/footerbg.png')" }}>
      <div className="flex items-center justify-center space-x-3 mb-6"> {/* Sử dụng flex để căn logo và tên vào một dòng */}
        {/* Logo */}
        <img src="../public/images/tmovie-55621206.png" alt="theMovies" className="w-12 h-12" />
        <span className="text-3xl font-bold">theMovies</span> {/* Tên nằm cùng dòng với logo */}
      </div>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-32 "> {/* Giảm khoảng cách giữa các cột */}
          <div className="text-left"></div>
          
          {/* Column 1 */}
          <div className="text-left">
            <ul className="space-y-2">
              <li className="text-2xl"><Link to="/home" className="hover:text-red-600 transition-all">Home</Link></li>
              <li className="text-2xl"><Link to="/live" className="hover:text-red-600 transition-all">Contact us</Link></li>
              <li className="text-2xl"><Link to="/premium" className="hover:text-red-600 transition-all">Terms of Services</Link></li>
              <li className="text-2xl"><Link to="/about-us" className="hover:text-red-600 transition-all">About us</Link></li>
            </ul>
          </div>

          {/* Column 2 */}
          <div className="text-left">
            <ul className="space-y-2">
              <li className="text-2xl"><Link to="/faq" className="hover:text-red-600 transition-all">Live</Link></li>
              <li className="text-2xl"><Link to="/recent-release" className="hover:text-red-600 transition-all">FAQ</Link></li>
              <li className="text-2xl"><Link to="/top-imdb" className="hover:text-red-600 transition-all">Premium</Link></li>
            </ul>
          </div>

          {/* Column 3 */}
          <div className="text-left">
            <ul className="space-y-2">
              <li className="text-2xl"><Link to="/about-us" className="hover:text-red-600 transition-all">You must watch</Link></li>
              <li className="text-2xl"><Link to="/privacy-policy" className="hover:text-red-600 transition-all">Recent Release</Link></li>
              <li className="text-2xl"><Link to="/about-us" className="hover:text-red-600 transition-all">Top IMDb</Link></li>
              <li className="text-2xl"><Link to="/terms" className="hover:text-red-600 transition-all">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="text-left"></div>
         
        </div>
      </div>
    </footer>
  );
}

export default Footer;
