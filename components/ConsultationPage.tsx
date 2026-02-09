import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';
import ChatBot from './ChatBot';

const ConsultationPage: React.FC = () => {
  const location = useLocation();
  const formData = location.state?.formData;

  // Block direct access - redirect to home
  if (!formData) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Simplified header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl font-bold text-gray-800">
            Crédit-Action
            <span className="text-blue-600 ml-2 font-normal text-base">| Consultation</span>
          </h1>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm text-gray-600">Conseiller en ligne</span>
          </div>
        </div>
      </header>

      {/* Chat area */}
      <main className="flex-1 flex flex-col overflow-hidden">
        <ChatBot formData={formData} />
      </main>
    </div>
  );
};

export default ConsultationPage;
