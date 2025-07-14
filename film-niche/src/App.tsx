import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Explore from './pages/Explore';
import MovieDetail from './pages/MovieDetail';
import Watched from './pages/Watched';
import Favorites from './pages/Favorites';
import './styles/global.css';

//main app component with routing
function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        {/* main app routes */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/movie/:id" element={<MovieDetail />} />
          <Route path="/watched" element={<Watched />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

//todo: add 404 page route
//maybe add loading states for route transitions
//consider adding route guards for protected pages
