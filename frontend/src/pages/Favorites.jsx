import { useFavorites } from '../context/FavoritesContext';
import MovieCard from '../components/MovieCard';
import { Heart } from 'lucide-react';

const Favorites = () => {
  const { favorites } = useFavorites();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 text-center flex items-center justify-center space-x-3">
          <Heart className="text-red-500" size={36} fill="currentColor" />
          <span>My Favorites</span>
        </h1>
        <p className="text-gray-400 text-center">
          {favorites.length > 0
            ? `You have ${favorites.length} favorite ${favorites.length === 1 ? 'movie' : 'movies'}`
            : 'No favorite movies yet'}
        </p>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-slate-800 rounded-lg p-12 max-w-md mx-auto">
            <Heart className="text-gray-600 mx-auto mb-4" size={64} />
            <h2 className="text-2xl font-bold text-white mb-2">No Favorites Yet</h2>
            <p className="text-gray-400 mb-6">
              Start adding movies to your favorites by clicking the heart icon on any movie card.
            </p>
            <a
              href="/"
              className="inline-block px-6 py-3 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors font-medium"
            >
              Browse Movies
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
