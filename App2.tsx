import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage2 from './components/HomePage2';
import ThankYou from './components/ThankYou';

// Component to update document title based on route
const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Crédit-Action - Amélioration de Crédit';
  }, [location]);

  return null;
};

const App2: React.FC = () => {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<HomePage2 />} />
        <Route path="/index2.html" element={<HomePage2 />} />
        <Route path="/fr" element={<HomePage2 />} />
        <Route path="/merci" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App2;
