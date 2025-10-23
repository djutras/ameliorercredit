
import React from 'react';
import { ChartBarIcon, DocumentCheckIcon, ShieldCheckIcon, UsersIcon } from './icons';

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-lg text-center transform hover:-translate-y-2 transition-transform duration-300">
    <div className="flex justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600">{description}</p>
  </div>
);

const Services: React.FC = () => {
  const services = [
    {
      icon: <DocumentCheckIcon className="h-12 w-12 text-red-600" />,
      title: "Analyse de Dossier de Crédit",
      description: "Nous examinons en profondeur vos rapports Equifax et TransUnion pour identifier les problèmes."
    },
    {
      icon: <ShieldCheckIcon className="h-12 w-12 text-red-600" />,
      title: "Correction d'Erreurs",
      description: "Nous travaillons pour corriger les erreurs et informations inexactes qui nuisent à votre cote."
    },
    {
      icon: <ChartBarIcon className="h-12 w-12 text-red-600" />,
      title: "Stratégies Personnalisées",
      description: "Recevez un plan d'action sur mesure pour reconstruire et optimiser votre historique de crédit."
    },
    {
      icon: <UsersIcon className="h-12 w-12 text-red-600" />,
      title: "Négociation avec Créanciers",
      description: "Nous pouvons vous aider à négocier avec vos créanciers pour trouver des solutions avantageuses."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
          Nos Services d'Amélioration de Crédit
        </h2>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl mx-auto">
          Des solutions complètes pour vous ouvrir les portes de la propriété.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
