
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [errors, setErrors] = useState({ name: false, email: false, phone: false });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const validate = () => {
    const newErrors = {
      name: formData.name.trim() === '',
      email: !/^\S+@\S+\.\S+$/.test(formData.email),
      phone: formData.phone.trim() === '',
    };
    setErrors(newErrors);
    return !newErrors.name && !newErrors.email && !newErrors.phone;
  };

  const handleSubmit = async (e: React.FormEvent) => {
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
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            message: 'Demande de consultation via le formulaire Hero.',
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
              Reprenez le Contrôle de Votre Crédit.
            </h1>
            <p className="text-lg md:text-2xl font-light mb-8">
              Réalisez votre rêve d'acheter une maison en améliorant vos cotes Equifax et TransUnion.
            </p>
            <button
              onClick={onCtaClick}
              className="bg-red-600 text-white font-bold py-4 px-10 rounded-lg text-lg hover:bg-red-700 transition-colors duration-300 transform hover:scale-105"
            >
              Consultation Gratuite
            </button>
          </div>

          {/* Right side - Form */}
          <div className="w-full md:w-96 bg-white/95 backdrop-blur-sm rounded-lg shadow-2xl p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Demandez une consultation</h2>
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

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300 disabled:bg-slate-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Envoi en cours...' : 'Soumettre'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
