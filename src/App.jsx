import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import RepoPage from './components/Repositories/RepoPage';
import MapPage from './pages/MapPage'; // Import the new MapPage component
import './index.css';
import LandingPage from './components/LandingPage/LandingPage';

function App() {

  return (
    <Router>
      <div>
        

      <Routes>
  <Route path="/" element={<LandingPage />} />
  <Route path="/repos" element={<RepoPage />} />
  <Route path="/map" element={<MapPage />} />
</Routes>
      </div>
    </Router>
  );
}

export default App;