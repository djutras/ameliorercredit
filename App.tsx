
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import HowItWorks from './components/HowItWorks';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';

const App: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="bg-slate-50 min-h-screen font-sans">
      <Header onCtaClick={handleOpenModal} />
      <main>
        <Hero onCtaClick={handleOpenModal} />
        <Services />
        <HowItWorks />
        <Testimonials />
        <FinalCTA onCtaClick={handleOpenModal} />
      </main>
      <Footer />
      {isModalOpen && <ContactModal onClose={handleCloseModal} />}
    </div>
  );
};

export default App;
