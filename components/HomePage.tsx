import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
import HowItWorks from './HowItWorks';
import Services from './Services';
import Testimonials from './Testimonials';
import FinalCTA from './FinalCTA';
import Footer from './Footer';
import ContactModal from './ContactModal';

const HomePage: React.FC = () => {
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

export default HomePage;
