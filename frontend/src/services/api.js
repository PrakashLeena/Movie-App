import axios from 'axios';

// Use environment variable for API base URL or fallback to relative path
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

// Create an axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    console.log('Request:', config.method.toUpperCase(), config.url);
    return config;
  },
  (error) => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Response Error:', {
        status: error.response.status,
        statusText: error.response.statusText,
        url: error.response.config.url,
        data: error.response.data
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('Request setup error:', error.message);
    }
    return Promise.reject(error);
  }
);

export const movieApi = {
  // Get popular movies with pagination
  getPopularMovies: async (page = 1) => {
    try {
      const response = await api.get('/api/movies/popular', {
        params: { page }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching popular movies:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch movies';
      throw new Error(errorMessage);
    }
  },

  // Search movies
  searchMovies: async (query, page = 1) => {
    try {
      const response = await api.get('/api/movies/search', {
        params: { q: query, page }
      });
      return response.data;
    } catch (error) {
      console.error('Error searching movies:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to search movies';
      throw new Error(errorMessage);
    }
  },

  // Get movie details
  getMovieDetails: async (id) => {
    try {
      const response = await api.get(`/api/movies/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching movie details:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Failed to fetch movie details';
      throw new Error(errorMessage);
    }
  }
};

export const getImageUrl = (path, size = 'w500') => {
  if (!path) return 'https://via.placeholder.com/500x750?text=No+Image';
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
