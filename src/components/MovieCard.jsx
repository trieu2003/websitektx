
import { useNavigate } from 'react-router-dom';

function MovieCard({ movie }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`); // Navigate to movie detail page with movie ID
  };

  return (
    <div className="relative group ">
      {/* Image */}
      <div
        className="movie-card cursor-pointer"
        onClick={handleClick}
      >
        <img
          className="w-full h-full object-cover rounded-[30px] group-hover:opacity-50 transition-all duration-300" // Image will fade on hover
          src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
          alt={movie.title || movie.name}
        />
      </div>

      {/* Play Button (YouTube Style) */}
      <button
        onClick={handleClick}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-600 text-white rounded-full opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-110 group-hover:border-8 group-hover:border-red-600 bg-red-600 shadow-[0_0_15px_15px_rgba(255,0,0,0.2)] border-4 border-transparent py-2 px-6 hover:border-red-500 hover:shadow-[0_0_18px_18px_rgba(255,0,0,0.5)]"
      >
        <svg
          className="w-4 h-4"  // Tăng kích thước lên 4em, lớn hơn nữa
          fill="none"
          stroke="currentColor"
          viewBox="0 0 4 4"  // Mở rộng vùng nhìn thấy của SVG để chứa tam giác lớn hơn
          xmlns="http://www.w3.org/2000/svg"
        >
          <polygon points="1,0.5 3,2 1,3.5" className="fill-white" />  {/* Tam giác lớn hơn một chút */}
        </svg>

      </button>

      {/* Title */}
      <h2 className="text-white text-left mt-6 ml-4 pl-4 transition-colors duration-300 group-hover:text-red-600 hover:text-red-600">
      {movie.title || movie.name}
      </h2>
    </div>
  );
}

export default MovieCard;
