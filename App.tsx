import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './components/HomePage';
import ThankYou from './components/ThankYou';
import ConsultationPage from './components/ConsultationPage';

// Component to update document title based on route
const TitleUpdater: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    document.title = 'Crédit-Action - Amélioration de Crédit';
  }, [location]);

  return null;
};

const App: React.FC = () => {
  return (
    <Router>
      <TitleUpdater />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/fr" element={<HomePage />} />
        <Route path="/consultation" element={<ConsultationPage />} />
        <Route path="/merci" element={<ThankYou />} />
      </Routes>
    </Router>
  );
};

export default App;
