import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// CORS configuration - temporarily permissive for debugging
const corsOptions = {
  origin: '*', // Temporarily allow all origins
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Movie App API',
    endpoints: {
      health: '/api/health',
      popularMovies: '/api/movies/popular?page=1',
      searchMovies: '/api/movies/search?q=query&page=1',
      movieDetails: '/api/movies/:id',
      movieCredits: '/api/movies/:id/credits',
      movieVideos: '/api/movies/:id/videos',
      movieReviews: '/api/movies/:id/reviews',
      similarMovies: '/api/movies/:id/similar'
    },
    documentation: 'Check the API documentation for more details'
  });
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get popular movies with pagination
app.get('/api/movies/popular', async (req, res) => {
  try {
    const page = req.query.page || 1;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
        language: 'en-US'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching popular movies:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch popular movies',
      message: error.message 
    });
  }
});

// Search movies
app.get('/api/movies/search', async (req, res) => {
  try {
    const query = req.query.q;
    const page = req.query.page || 1;
    
    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: page,
        language: 'en-US'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error searching movies:', error.message);
    res.status(500).json({ 
      error: 'Failed to search movies',
      message: error.message 
    });
  }
});

// Get movie details
app.get('/api/movies/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const response = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY,
        language: 'en-US'
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching movie details:', error.message);
    res.status(500).json({ 
      error: 'Failed to fetch movie details',
      message: error.message 
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  if (!TMDB_API_KEY) {
    console.warn('⚠️  WARNING: TMDB_API_KEY is not set in .env file');
  }
});
