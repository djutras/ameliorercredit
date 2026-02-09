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
      {/* Professional header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
            Crédit-Action
            <span className="text-blue-700 ml-2 font-normal text-sm">| Consultation</span>
          </h1>
          <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-xs font-medium text-green-700">Conseiller en ligne</span>
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
