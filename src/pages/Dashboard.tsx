import React from 'react';
import IrrigationAndHardwareControl from '../components/IrrigationAndHardwareControl';
import NotificationCenter from '../components/NotificationCenter';
import BackToTop from '../components/BackToTop';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Header */}
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Kontrolna tabla</h1>
          <p className="text-sm sm:text-base text-gray-600">Pregled stanja vaše pametne bašte</p>
        </div>

        {/* Combined Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          <div className="space-y-6 sm:space-y-8">
            <IrrigationAndHardwareControl />
          </div>
          <div className="space-y-6 sm:space-y-8">
            <NotificationCenter />
          </div>
        </div>
      </div>
      <BackToTop />
    </div>
  );
};

export default Dashboard;