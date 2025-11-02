import { Link, useLocation } from 'react-router-dom';
import { Film, Heart } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';

const Navbar = () => {
  const location = useLocation();
  const { favorites } = useFavorites();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-slate-800 shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center space-x-2 text-white hover:text-amber-400 transition-colors">
            <Film size={32} className="text-amber-400" />
            <span className="text-xl font-bold">MovieApp</span>
          </Link>

          <div className="flex items-center space-x-6">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                isActive('/')
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Film size={20} />
              <span className="font-medium">Browse</span>
            </Link>

            <Link
              to="/favorites"
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all relative ${
                isActive('/favorites')
                  ? 'bg-amber-500 text-white'
                  : 'text-gray-300 hover:bg-slate-700 hover:text-white'
              }`}
            >
              <Heart size={20} />
              <span className="font-medium">Favorites</span>
              {favorites.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
