# 🎬 Movie App

A full-stack movie browsing application built with React, Express, and Tailwind CSS, featuring TMDB API integration.

## ✨ Features

- **Browse Popular Movies**: View a curated list of popular movies from TMDB
- **Search Functionality**: Search for specific movies by title
- **Pagination**: Navigate through pages of movie results
- **Favorites System**: Mark movies as favorites and store them locally
- **Dedicated Favorites Page**: View all your favorite movies in one place
- **Responsive Design**: Beautiful UI that works on all devices
- **Modern Tech Stack**: React, Express, Tailwind CSS, and Lucide icons

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- TMDB API Key (get one at [https://www.themoviedb.org/settings/api](https://www.themoviedb.org/settings/api))

### Installation

1. **Navigate to the project**
   ```bash
   cd "e:/fullstuck course/Movie app"
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the backend directory:
   ```bash
   cd ../backend
   # Copy the example file
   cp .env.example .env
   ```
   
   Edit `backend/.env` and add your TMDB API key:
   ```
   TMDB_API_KEY=your_actual_api_key_here
   PORT=5000
   ```

### Running the Application

**Terminal 1 - Start Backend:**
```bash
cd backend
npm start
```

**Terminal 2 - Start Frontend:**
```bash
cd frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## 📁 Project Structure

```
Movie app/
├── frontend/               # React frontend (independent)
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── MovieCard.jsx
│   │   │   ├── SearchBar.jsx
│   │   │   ├── Pagination.jsx
│   │   │   ├── Loading.jsx
│   │   │   └── ErrorMessage.jsx
│   │   ├── context/       # React context
│   │   │   └── FavoritesContext.jsx
│   │   ├── pages/         # Page components
│   │   │   ├── Home.jsx
│   │   │   └── Favorites.jsx
│   │   ├── services/      # API services
│   │   │   └── api.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── node_modules/
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/               # Express backend (independent)
│   ├── node_modules/
│   ├── index.js
│   ├── package.json
│   ├── .env.example
│   ├── .env              # Create this with your API key
│   └── .gitignore
├── .gitignore
└── README.md
```

## 🎯 API Endpoints

### Backend API

- `GET /api/health` - Health check
- `GET /api/movies/popular?page=1` - Get popular movies
- `GET /api/movies/search?q=query&page=1` - Search movies
- `GET /api/movies/:id` - Get movie details

## 🛠️ Technologies Used

### Frontend
- **React 18** - UI library
- **React Router DOM** - Routing
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - HTTP client
- **Vite** - Build tool

### Backend
- **Express** - Web framework
- **Axios** - HTTP client for TMDB API
- **CORS** - Cross-origin resource sharing
- **dotenv** - Environment variables

## 🎨 Features in Detail

### 1. Movie Browsing
- Display popular movies in a responsive grid layout
- Beautiful movie cards with poster images, ratings, and descriptions
- Smooth hover effects and transitions

### 2. Search
- Real-time search functionality
- Search results with pagination
- Clear search button for easy reset

### 3. Pagination
- Navigate through multiple pages of results
- Smart pagination with ellipsis for large page counts
- Smooth scroll to top on page change

### 4. Favorites
- Add/remove movies from favorites with a single click
- Favorites stored in browser's localStorage
- Persistent across sessions
- Dedicated favorites page
- Badge showing favorite count in navigation

## 🔒 Environment Variables

Create a `.env` file in the **backend** directory with:

```env
TMDB_API_KEY=your_tmdb_api_key_here
PORT=5000
```

## 📝 Getting a TMDB API Key

1. Go to [TMDB website](https://www.themoviedb.org/)
2. Create an account or log in
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Fill in the required information
6. Copy your API key and add it to `.env`

## 🚀 Deployment

### Backend Deployment
Deploy the Express server to platforms like:
- Heroku
- Railway
- Render
- DigitalOcean

### Frontend Deployment
Deploy the React app to:
- Vercel
- Netlify
- GitHub Pages

Remember to update the API base URL in `frontend/src/services/api.js` for production.

## 🤝 Contributing

Contributions are welcome! Feel free to submit issues and pull requests.

## 📄 License

This project is open source and available under the [ISC License](LICENSE).

## 🙏 Acknowledgments

- Movie data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/)
- Icons by [Lucide](https://lucide.dev/)

---

Made with ❤️ using React, Express, and Tailwind CSS
