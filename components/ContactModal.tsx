
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

interface ContactModalProps {
  onClose: () => void;
}

const ContactModal: React.FC<ContactModalProps> = ({ onClose }) => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({ name: false, email: false, message: false });
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
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
      message: message.trim() === '',
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.message;
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setErrorMessage('');

    if (validate()) {
      setIsLoading(true);

      try {
        const response = await fetch('/.netlify/functions/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            email,
            phone,
            message,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          setSubmitted(true);
          setTimeout(() => {
            navigate('/merci');
          }, 1000);
        } else {
          setErrorMessage(data.error || 'Une erreur est survenue. Veuillez réessayer.');
        }
      } catch (error) {
        console.error('Error submitting form:', error);
        setErrorMessage('Impossible de se connecter au serveur. Veuillez réessayer plus tard.');
      } finally {
        setIsLoading(false);
      }
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
              Votre message a été envoyé avec succès. Nous vous contacterons sous peu. Cette fenêtre se fermera automatiquement.
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
              <div className="mb-4">
                <label htmlFor="phone" className="block text-slate-700 font-bold mb-2">Téléphone <span className="font-normal text-slate-500">(Optionnel)</span></label>
                <input
                  type="tel"
                  id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>
              <div className="mb-6">
                <label htmlFor="message" className="block text-slate-700 font-bold mb-2">Message</label>
                <textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${errors.message ? 'border-red-500' : 'border-slate-300'}`}
                  required
                  aria-required="true"
                  aria-invalid={errors.message}
                  placeholder="Décrivez brièvement votre situation..."
                />
                {errors.message && <p className="text-red-500 text-sm mt-1">Veuillez entrer un message.</p>}
              </div>
              {errorMessage && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                  {errorMessage}
                </div>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                disabled={isLoading}
                className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Envoi en cours...' : 'Envoyer ma demande'}
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
