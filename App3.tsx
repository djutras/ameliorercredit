import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage3 from './components/HomePage3';
import ThankYou from './components/ThankYou';

// Component to update document title based on route
const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Crédit-Action - Amélioration de Crédit';
  }, [location]);

  return null;
};

const App3: React.FC = () => {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<HomePage3 />} />
        <Route path="/index3.html" element={<HomePage3 />} />
        <Route path="/fr" element={<HomePage3 />} />
        <Route path="/merci" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App3;
