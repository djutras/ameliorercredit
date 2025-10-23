import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon } from './icons';

const ThankYou: React.FC = () => {
  useEffect(() => {
    // Track conversion when thank you page loads
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-1055107787',
        'value': 1.0,
        'currency': 'CAD'
      });

      // Event snippet for Ameliorer credit conversion page
      (window as any).gtag('event', 'conversion', {
        'send_to': 'AW-1055107787/buvXCMfAyrIbEMvVjvcD'
      });
    }
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="max-w-2xl w-full">
        <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
          <div className="mb-8">
            <div className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckIcon className="w-12 h-12 text-green-600" />
            </div>
          </div>

          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Merci pour votre demande !
          </h1>

          <p className="text-xl text-slate-600 mb-8">
            Votre message a été envoyé avec succès.
          </p>

          <div className="bg-slate-50 rounded-lg p-6 mb-8">
            <p className="text-slate-700 leading-relaxed">
              Notre équipe d'experts en crédit examinera votre demande et vous contactera dans les plus brefs délais pour discuter de votre situation et vous proposer les meilleures solutions pour améliorer votre crédit.
            </p>
          </div>

          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-slate-800">
              Que se passe-t-il ensuite ?
            </h2>
            <div className="grid gap-4 md:grid-cols-3 text-left">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-800 mb-2">1. Examen</div>
                <p className="text-sm text-blue-700">
                  Nous analysons votre demande en détail
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-800 mb-2">2. Contact</div>
                <p className="text-sm text-blue-700">
                  Un expert vous contacte sous 24-48h
                </p>
              </div>
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="font-bold text-blue-800 mb-2">3. Solution</div>
                <p className="text-sm text-blue-700">
                  Nous créons votre plan personnalisé
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            <Link
              to="/"
              className="inline-block bg-red-600 text-white font-bold py-4 px-8 rounded-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
            >
              Retour à l'accueil
            </Link>
          </div>

          <div className="mt-8 pt-8 border-t border-slate-200">
            <p className="text-sm text-slate-500">
              Besoin d'aide immédiate ? Appelez-nous au{' '}
              <a href="tel:+15141234567" className="text-red-600 font-semibold hover:underline">
                (514) 123-4567
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
