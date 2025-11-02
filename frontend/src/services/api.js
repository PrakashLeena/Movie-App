import axios from 'axios';

const API_BASE_URL = '/api';

export const movieApi = {
  // Get popular movies with pagination
  getPopularMovies: async (page = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/popular`, {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      throw error;
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/search`, {
        params: { q: query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      throw error;
    }
  },

  // Get movie details
  getMovieDetails: async (id) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      throw error;
    }
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
