import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import RepoPage from './components/Repositories/RepoPage';
import MapPage from './pages/MapPage'; // Import the new MapPage component
import './index.css';

function App() {

  return (
    <Router>
      <div>
        

        <Routes>
          <Route path="/" element={<RepoPage />} />
          <Route path="/map" element={<MapPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;