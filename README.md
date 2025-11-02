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


```

## 📝 Getting a TMDB API Key

1. Go to [TMDB website](https://www.themoviedb.org/)
2. Create an account or log in
3. Go to Settings → API
4. Request an API key (choose "Developer" option)
5. Fill in the required information
6. Copy your API key and add it to `.env`


---

Made with ❤️ using React, Express, and Tailwind CSS
