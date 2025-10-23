
import React from 'react';

interface FinalCTAProps {
  onCtaClick: () => void;
}

const FinalCTA: React.FC<FinalCTAProps> = ({ onCtaClick }) => {
  return (
    <section id="contact" className="bg-red-700">
      <div 
        className="container mx-auto px-6 py-20 text-center text-white bg-cover bg-center"
        style={{ backgroundImage: "url('/img/cta-bg.svg')" }} // Optional decorative background
      >
        <h2 className="text-3xl md:text-4xl font-extrabold mb-4">
          Prêt à Devenir Propriétaire ?
        </h2>
        <p className="text-lg md:text-xl font-light mb-8 max-w-2xl mx-auto">
          Ne laissez pas un mauvais crédit vous retenir. Contactez-nous dès aujourd'hui pour votre consultation gratuite et sans engagement.
        </p>
        <button
          onClick={onCtaClick}
          className="bg-white text-red-600 font-bold py-4 px-10 rounded-lg text-lg hover:bg-slate-100 transition-colors duration-300 transform hover:scale-105"
        >
          Commencez Maintenant
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
