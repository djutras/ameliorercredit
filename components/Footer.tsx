import React from 'react';
import { HomeIcon } from './icons';

const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 py-8">
      <div className="container mx-auto px-6 text-center">
        <div className="flex justify-center items-center mb-4">
          <HomeIcon className="h-7 w-7 text-red-500" />
          <span className="ml-2 text-xl font-bold text-white">Crédit-Action</span>
        </div>
        <p className="text-sm">
          Solutions d'amélioration de crédit pour un avenir financier plus sûr.
        </p>
        <div className="mt-4 text-sm space-y-1">
          <p>
            <a href="tel:514-573-1267" className="hover:text-white transition-colors duration-300">514-573-1267</a>
          </p>
          <p>
            <a href="mailto:ameliorercredit@parcourriel.ca" className="hover:text-white transition-colors duration-300">ameliorercredit@parcourriel.ca</a>
          </p>
        </div>
        <p className="text-sm text-slate-400 mt-4">
          © {new Date().getFullYear()} Crédit-Action. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
};

export default Footer;