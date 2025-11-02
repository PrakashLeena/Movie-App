import { useState, useEffect } from 'react';
import { movieApi } from '../services/api';
import MovieCard from '../components/MovieCard';
import SearchBar from '../components/SearchBar';
import Pagination from '../components/Pagination';
import Loading from '../components/Loading';
import ErrorMessage from '../components/ErrorMessage';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchMovies();
  }, [currentPage, searchQuery]);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      setError(null);
      
      let data;
      if (searchQuery) {
        data = await movieApi.searchMovies(searchQuery, currentPage);
      } else {
        data = await movieApi.getPopularMovies(currentPage);
      }

      setMovies(data.results);
      setTotalPages(Math.min(data.total_pages, 500)); // TMDB limits to 500 pages
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to fetch movies. Please try again.');
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-white mb-2 text-center">
          {searchQuery ? `Search Results for "${searchQuery}"` : 'Popular Movies'}
        </h1>
        <p className="text-gray-400 text-center">
          {searchQuery ? 'Find your favorite movies' : 'Discover the most popular movies'}
        </p>
      </div>

      <SearchBar onSearch={handleSearch} initialValue={searchQuery} />

      {loading && <Loading />}

      {error && <ErrorMessage message={error} />}

      {!loading && !error && movies.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-xl">No movies found.</p>
          {searchQuery && (
            <button
              onClick={() => handleSearch('')}
              className="mt-4 px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition-colors"
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {movies.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>

          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
