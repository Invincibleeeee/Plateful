import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import RecipeSearch from './components/RecipeSearch';
import { Analytics } from '@vercel/analytics/react';

const App = () => {
  return (
    <>
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<RecipeSearch />} />
        </Routes>
      </div>
    </Router>
    <Analytics/>
    </>
  );
};

export default App;
