
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onCtaClick: () => void;
}

const creditSituations = [
  { id: 'refus', label: 'Refus de crédit ou prêt' },
  { id: 'taux', label: "Taux d'intérêt plus élevé que prévu" },
  { id: 'carte', label: 'Difficulté à être approuvé pour une carte de crédit' },
  { id: 'erreurs', label: 'Erreurs sur mon dossier de crédit' },
  { id: 'retards', label: 'Retards de paiement ou compte en recouvrement' },
  { id: 'faillite', label: 'Faillite ou proposition de consommateur' },
  { id: 'collections', label: 'Appels de collections / agences de recouvrement' },
  { id: 'aucune', label: 'Aucune de ces situations' },
];

const Hero3: React.FC<HeroProps> = ({ onCtaClick }) => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [selectedSituations, setSelectedSituations] = useState<string[]>([]);
  const [errors, setErrors] = useState({ name: false, email: false, phone: false });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const showHealthyMessage = selectedSituations.includes('aucune');

  const validateStep1 = () => {
    return selectedSituations.length > 0;
  };

  const validateStep2 = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: formData.phone.trim() === '',
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleNext = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (validateStep2()) {
      setIsLoading(true);

      try {
        const response = await fetch('/.netlify/functions/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            situations: selectedSituations,
            message: `Demande de consultation via le formulaire Hero. Situations: ${selectedSituations.join(', ') || 'Non spécifié'}`,
          }),
        });

        const data = await response.json();

        if (response.ok && data.success) {
          navigate('/merci');
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSituationChange = (situationId: string) => {
    setSelectedSituations(prev => {
      if (situationId === 'aucune') {
        if (prev.includes('aucune')) {
          return [];
        }
        return ['aucune'];
      }

      const newSelection = prev.filter(id => id !== 'aucune');

      if (newSelection.includes(situationId)) {
        return newSelection.filter(id => id !== situationId);
      } else {
        return [...newSelection, situationId];
      }
    });
  };

  return (
    <section
      className="relative bg-cover bg-center text-white py-32 px-6"
      style={{ backgroundImage: "url('https://picsum.photos/seed/familyhome/1600/900')" }}
    >
      <div className="absolute inset-0 bg-black opacity-60"></div>
      <div className="relative container mx-auto z-10">
        <div className="flex flex-col-reverse md:flex-row gap-8 items-center md:items-start">
          {/* Left side - Text content */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight mb-4">
              Réalisez vos projets plus facilement.
            </h1>
            <p className="text-lg md:text-2xl font-light mb-8">
              Améliorer vos cotes Equifax et TransUnion. Pour retrouver votre liberté financière!
            </p>
            <button
              onClick={onCtaClick}
              className="bg-red-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
            >
              Consultation Gratuite
            </button>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-[420px] bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
            {/* Progress indicator */}
            <div className="flex items-center justify-center mb-6">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 1 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                1
              </div>
              <div className={`w-16 h-1 ${step >= 2 ? 'bg-red-600' : 'bg-gray-300'}`}></div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= 2 ? 'bg-red-600 text-white' : 'bg-gray-300 text-gray-600'}`}>
                2
              </div>
            </div>

            {step === 1 ? (
              /* Step 1: Questions */
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Votre situation</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Avez-vous vécu l'une de ces situations dans les 2 dernières années?
                </p>

                <div className="space-y-2 mb-4">
                  {creditSituations.map((situation) => (
                    <label
                      key={situation.id}
                      className={`flex items-start gap-3 p-2 rounded-lg cursor-pointer transition-colors ${
                        selectedSituations.includes(situation.id)
                          ? 'bg-red-50 border border-red-200'
                          : 'hover:bg-gray-50 border border-transparent'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedSituations.includes(situation.id)}
                        onChange={() => handleSituationChange(situation.id)}
                        className="mt-0.5 w-4 h-4 text-red-600 border-gray-300 rounded focus:ring-red-500"
                      />
                      <span className="text-sm text-gray-700">{situation.label}</span>
                    </label>
                  ))}
                </div>

                {showHealthyMessage && (
                  <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-700">
                      Votre dossier semble en bonne santé! Nos services s'adressent principalement aux personnes ayant des défis de crédit.
                    </p>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleNext}
                  disabled={selectedSituations.length === 0}
                  className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
                >
                  Continuer
                </button>

                {selectedSituations.length === 0 && (
                  <p className="text-gray-500 text-xs mt-2 text-center">
                    Sélectionnez au moins une option pour continuer
                  </p>
                )}
              </div>
            ) : (
              /* Step 2: Contact Info */
              <div>
                <h2 className="text-xl font-bold text-gray-800 mb-4">Vos coordonnées</h2>
                <p className="text-sm text-gray-600 mb-4">
                  Entrez vos informations pour recevoir votre consultation gratuite.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                      Nom complet
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="Votre nom"
                      aria-required="true"
                      aria-invalid={errors.name}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">Veuillez entrer votre nom.</p>}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      Courriel
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="votre@courriel.com"
                      aria-required="true"
                      aria-invalid={errors.email}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">Veuillez entrer une adresse courriel valide.</p>}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de téléphone
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                      placeholder="(514) 555-1234"
                      aria-required="true"
                      aria-invalid={errors.phone}
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">Veuillez entrer votre numéro de téléphone.</p>}
                  </div>

                  {errorMessage && (
                    <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                      {errorMessage}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={handleBack}
                      className="flex-1 bg-gray-200 text-gray-700 font-bold py-3 px-6 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                    >
                      Retour
                    </button>
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
                    >
                      {isLoading ? 'Envoi...' : 'Soumettre'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero3;
