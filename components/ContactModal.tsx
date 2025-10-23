
import React, { useState, useEffect } from 'react';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [errors, setErrors] = useState({ name: false, email: false });
  const [submitted, setSubmitted] = useState(false);
  
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
       if (event.key === 'Escape') {
        onClose();
       }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);


  const validate = () => {
    const newErrors = {
      name: name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(email),
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email;
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate()) {
      const subject = encodeURIComponent("Demande de Consultation Gratuite - Crédit-Action");
      const body = encodeURIComponent(
        `Bonjour,\n\nJe souhaite obtenir une consultation gratuite.\n\nVoici mes informations :\n\nNom: ${name}\nCourriel: ${email}\nTéléphone: ${phone}\n\nMerci.`
      );
      window.location.href = `mailto:info@opportunitesparcourriel.com?subject=${subject}&body=${body}`;
      setSubmitted(true);
      setTimeout(() => {
        onClose();
      }, 4000);
    }
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center"
      onClick={onClose}
      aria-modal="true"
      role="dialog"
    >
      <div 
        className="bg-white rounded-lg p-8 shadow-2xl w-full max-w-md m-4 relative animate-fade-in-up"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-500 hover:text-slate-800 transition-colors"
          aria-label="Fermer"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        {submitted ? (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-800 mb-4">Merci !</h2>
            <p className="text-slate-600">
              Nous avons lancé votre application de messagerie. Veuillez compléter et envoyer le courriel pour finaliser votre demande. Cette fenêtre se fermera automatiquement.
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Consultation Gratuite</h2>
            <p className="text-slate-600 mb-6">Laissez-nous vos informations et nous vous contacterons rapidement.</p>
            <form noValidate>
              <div className="mb-4">
                <label htmlFor="name" className="block text-slate-700 font-bold mb-2">Nom complet</label>
                <input 
                  type="text" 
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.name ? 'border-red-500' : 'border-slate-300'}`}
                  required
                  aria-required="true"
                  aria-invalid={errors.name}
                />
                {errors.name && <p className="text-red-500 text-sm mt-1">Veuillez entrer votre nom.</p>}
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block text-slate-700 font-bold mb-2">Courriel</label>
                <input 
                  type="email" 
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.email ? 'border-red-500' : 'border-slate-300'}`}
                  required
                  aria-required="true"
                  aria-invalid={errors.email}
                />
                {errors.email && <p className="text-red-500 text-sm mt-1">Veuillez entrer une adresse courriel valide.</p>}
              </div>
              <div className="mb-6">
                <label htmlFor="phone" className="block text-slate-700 font-bold mb-2">Téléphone <span className="font-normal text-slate-500">(Optionnel)</span></label>
                <input 
                  type="tel" 
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Envoyer ma demande
              </button>
            </form>
          </>
        )}
      </div>
      <style>{`
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default ContactModal;
