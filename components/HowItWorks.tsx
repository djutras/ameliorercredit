
import React from 'react';
import { MagnifyingGlassIcon, PencilSquareIcon, SparklesIcon } from './icons';

const HowItWorks: React.FC = () => {
  return (
    <section className="py-20 bg-slate-100">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Un Processus Simple en 3 Étapes
        </h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Nous vous guidons à chaque étape vers un meilleur avenir financier.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center md:items-start gap-8 md:gap-4">
          {/* Step 1 */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-red-600 text-white rounded-full p-4 mb-4">
              <MagnifyingGlassIcon className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">1. Consultation</h3>
            <p className="text-slate-600">
              Analyse gratuite et confidentielle de votre situation de crédit pour établir un diagnostic clair.
            </p>
          </div>

          <div className="hidden md:block border-t-2 border-dashed border-slate-300 w-24 mt-12"></div>

          {/* Step 2 */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-red-600 text-white rounded-full p-4 mb-4">
              <PencilSquareIcon className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">2. Plan d'Action</h3>
            <p className="text-slate-600">
              Nous créons une stratégie sur mesure pour corriger les erreurs, gérer les dettes et améliorer votre cote.
            </p>
          </div>

          <div className="hidden md:block border-t-2 border-dashed border-slate-300 w-24 mt-12"></div>
          
          {/* Step 3 */}
          <div className="flex flex-col items-center max-w-xs">
            <div className="bg-red-600 text-white rounded-full p-4 mb-4">
              <SparklesIcon className="h-10 w-10" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">3. Résultats</h3>
            <p className="text-slate-600">
              Suivez la progression de votre cote et atteignez le score nécessaire pour l'achat de votre maison.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
