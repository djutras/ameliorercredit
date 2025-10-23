
import React from 'react';
import { HomeIcon } from './icons';

interface HeaderProps {
  onCtaClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCtaClick }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <HomeIcon className="h-8 w-8 text-red-600" />
          <span className="text-2xl font-bold text-slate-800">Crédit-Action</span>
        </div>
        <nav>
          <button
            onClick={onCtaClick}
            className="bg-red-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
          >
            Gratuit
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
