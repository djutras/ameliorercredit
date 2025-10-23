
import React from 'react';

interface TestimonialCardProps {
  quote: string;
  author: string;
  imageUrl: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({ quote, author, imageUrl }) => (
  <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col items-center text-center">
    <img src={imageUrl} alt={author} className="w-24 h-24 rounded-full mb-6 object-cover" />
    <p className="text-slate-600 italic mb-4">"{quote}"</p>
    <span className="font-bold text-red-600">- {author}</span>
  </div>
);

const Testimonials: React.FC = () => {
  const testimonials = [
    {
      quote: "Nous pensions que l'achat d'une maison était impossible. Crédit-Action a transformé notre rêve en réalité en quelques mois seulement!",
      author: "Sophie et Marc L.",
      imageUrl: "https://picsum.photos/seed/couple1/200/200"
    },
    {
      quote: "Un service professionnel et efficace. Ma cote de crédit a augmenté de plus de 120 points et j'ai obtenu mon prêt hypothécaire sans problème.",
      author: "David G.",
      imageUrl: "https://picsum.photos/seed/person1/200/200"
    },
    {
      quote: "L'équipe a été incroyable, toujours disponible pour répondre à nos questions. Nous sommes maintenant propriétaires de notre première maison!",
      author: "Amina et Karim B.",
      imageUrl: "https://picsum.photos/seed/couple2/200/200"
    }
  ];
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-800 mb-12">
          Ils nous ont fait confiance
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
