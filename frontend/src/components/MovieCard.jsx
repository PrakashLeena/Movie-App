import { Heart, Star, Calendar } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { getImageUrl } from '../services/api';

const MovieCard = ({ movie }) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const favorite = isFavorite(movie.id);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    toggleFavorite(movie);
  };

  return (
    <div className="bg-slate-800 rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
      <div className="relative">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className="w-full h-96 object-cover"
          loading="lazy"
        />
        <button
          onClick={handleFavoriteClick}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
            favorite
              ? 'bg-red-500 text-white'
              : 'bg-black/50 text-white hover:bg-red-500'
          }`}
          aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart
            size={20}
            fill={favorite ? 'currentColor' : 'none'}
          />
        </button>
        
        {movie.vote_average > 0 && (
          <div className="absolute top-3 left-3 bg-amber-500 text-white px-2 py-1 rounded-lg flex items-center space-x-1 font-semibold">
            <Star size={16} fill="currentColor" />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-1 group-hover:text-amber-400 transition-colors">
          {movie.title}
        </h3>
        
        {movie.release_date && (
          <div className="flex items-center space-x-2 text-gray-400 text-sm mb-2">
            <Calendar size={16} />
            <span>{new Date(movie.release_date).getFullYear()}</span>
          </div>
        )}

        <p className="text-gray-400 text-sm line-clamp-3">
          {movie.overview || 'No description available.'}
        </p>
      </div>
    </div>
  );
};

export default MovieCard;
