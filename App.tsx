import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ThankYou from './components/ThankYou';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/merci" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App;
