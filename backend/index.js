import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

// Load environment variables
dotenv.config();

// Verify required environment variables
const requiredEnvVars = ['TMDB_API_KEY', 'PORT'];
const missingVars = requiredEnvVars.filter(varName => !process.env[varName]);

if (missingVars.length > 0) {
  console.error('Missing required environment variables:', missingVars.join(', '));
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 3000; // Vercel requires port 3000
const TMDB_API_KEY = process.env.TMDB_API_KEY;
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
const NODE_ENV = process.env.NODE_ENV || 'development';

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? [
        'https://your-frontend-app.vercel.app',
        'https://*.vercel.app'
      ]
    : '*', // Allow all in development
  methods: ['GET', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
};

// Log environment info
console.log(`Starting server in ${NODE_ENV} mode`);
console.log(`CORS allowed origins:`, corsOptions.origin);

// Middleware
app.use(cors(corsOptions));
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl} - ${res.statusCode} - ${duration}ms`);
  });
  next();
});

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Movie App API',
    endpoints: {
      health: '/health',
      popularMovies: '/movies/popular?page=1',
      searchMovies: '/movies/search?q=query&page=1',
      movieDetails: '/movies/:id',
      movieCredits: '/movies/:id/credits',
      movieVideos: '/movies/:id/videos',
      movieReviews: '/movies/:id/reviews',
      similarMovies: '/movies/:id/similar'
    },
    documentation: 'Check the API documentation for more details'
  });
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' });
});

// Get popular movies with pagination
app.get('/movies/popular', async (req, res) => {
  const page = req.query.page || 1;
  console.log(`Fetching popular movies - Page: ${page}`);
  
  try {
    const response = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
      params: {
        api_key: TMDB_API_KEY,
        page: page,
        language: 'en-US'
      },
      timeout: 10000 // 10 second timeout
    });
    
    console.log(`Successfully fetched ${response.data.results?.length || 0} movies`);
    res.json(response.data);
  } catch (error) {
    const errorMessage = error.response?.data?.status_message || error.message;
    const statusCode = error.response?.status || 500;
    
    console.error('Error fetching popular movies:', {
      message: errorMessage,
      status: statusCode,
      page: page,
      stack: NODE_ENV === 'development' ? error.stack : undefined
    });
    
    res.status(statusCode).json({ 
      success: false,
      error: 'Failed to fetch popular movies',
      message: errorMessage,
      ...(NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// Search movies
app.get('/movies/search', async (req, res) => {
  const query = req.query.q;
  const page = req.query.page || 1;
  
  if (!query) {
    console.warn('Search request received without query parameter');
    return res.status(400).json({ 
      success: false,
      error: 'Search query is required',
      message: 'Please provide a search query using the q parameter'
    });
  }

  console.log(`Searching movies - Query: "${query}", Page: ${page}`);

  try {
    const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
      params: {
        api_key: TMDB_API_KEY,
        query: query,
        page: page,
        language: 'en-US'
      },
      timeout: 10000 // 10 second timeout
    });

    console.log(`Found ${response.data.results?.length || 0} movies for query: "${query}"`);
    res.json({
      success: true,
      ...response.data
    });
  } catch (error) {
    const errorMessage = error.response?.data?.status_message || error.message;
    const statusCode = error.response?.status || 500;
    
    console.error('Error searching movies:', {
      query: query,
      page: page,
      message: errorMessage,
      status: statusCode,
      ...(NODE_ENV === 'development' && { stack: error.stack })
    });
    
    res.status(statusCode).json({
      success: false,
      error: 'Failed to search movies',
      message: errorMessage,
      ...(NODE_ENV === 'development' && { stack: error.stack })
    });
  }
});

// Get movie details
app.get('/movies/:id', async (req, res) => {
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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Not Found',
    message: `The requested resource ${req.originalUrl} was not found`
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', {
    message: err.message,
    stack: NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  res.status(500).json({
    success: false,
    error: 'Internal Server Error',
    message: NODE_ENV === 'development' ? err.message : 'Something went wrong',
    ...(NODE_ENV === 'development' && { stack: err.stack })
  });
});

// Start the server
const server = app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running in ${NODE_ENV} mode on port ${PORT}`);
  console.log(`API Base URL: http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log(`- GET /health - Health check`);
  console.log(`- GET /movies/popular - Get popular movies`);
  console.log(`- GET /movies/search?q={query} - Search movies`);
  console.log(`- GET /movies/{id} - Get movie details`);
  if (!TMDB_API_KEY) {
    console.warn('⚠️  WARNING: TMDB_API_KEY is not set in .env file');
  }
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  server.close(() => process.exit(1));
});
