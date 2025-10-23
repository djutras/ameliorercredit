
import React from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  return (
    <section 
      className="relative bg-cover bg-center text-white py-32 px-6"
      style={{ backgroundImage: "url('https://picsum.photos/seed/familyhome/1600/900')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative container mx-auto text-center z-10">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
          Reprenez le Contrôle de Votre Crédit.
        </h1>
        <p className="text-lg md:text-2xl font-light mb-8 max-w-3xl mx-auto">
          Réalisez votre rêve d'acheter une maison en améliorant vos cotes Equifax et TransUnion.
        </p>
        <button
          onClick={onCtaClick}
          className="bg-red-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
        >
          Consultation Gratuite
        </button>
      </div>
    </section>
  );
};

export default Hero;
