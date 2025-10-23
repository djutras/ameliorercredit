
import React, { useState } from 'react';

interface HeroProps {
  onCtaClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onCtaClick }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form data
    if (!formData.name || !formData.email || !formData.phone) {
      alert('Veuillez remplir tous les champs du formulaire.');
      return;
    }

    const subject = encodeURIComponent('Demande de consultation - Crédit-Action');
    const body = encodeURIComponent(
      `Nom: ${formData.name}\nCourriel: ${formData.email}\nTéléphone: ${formData.phone}\n\nJe souhaite obtenir une consultation gratuite pour améliorer mon crédit.`
    );
    const mailtoLink = `mailto:ameliorercredit@parcourriel.ca?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    // Show confirmation message
    setTimeout(() => {
      alert('Votre client de messagerie devrait s\'ouvrir. Si ce n\'est pas le cas, veuillez nous contacter directement à ameliorercredit@parcourriel.ca');
    }, 500);
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  placeholder="Votre nom"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  placeholder="votre@courriel.com"
                />
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent text-gray-900"
                  placeholder="(514) 555-1234"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-red-700 transition-colors duration-300"
              >
                Soumettre
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
