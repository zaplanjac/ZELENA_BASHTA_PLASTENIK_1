import React, { useState, useEffect } from 'react';
import { Thermometer, Droplets, Sun, Activity, ArrowUp } from 'lucide-react';
import SensorCard from '../components/SensorCard';
import IrrigationControl from '../components/IrrigationControl';
import HardwareControl from '../components/HardwareControl';
import AutomationRules from '../components/AutomationRules';
import NotificationCenter from '../components/NotificationCenter';

const Dashboard = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Kontrolna tabla</h1>
          <p className="text-gray-600">Pregled stanja vaše pametne bašte</p>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Temperatura"
            value="24.5"
            unit="°C"
            trend="up"
            trendValue="+1.2°C"
            icon={<Thermometer className="h-6 w-6 text-white" />}
            color="bg-orange-100"
            optimal={true}
          />
          <SensorCard
            title="Vlažnost zemljišta"
            value="68"
            unit="%"
            trend="down"
            trendValue="-5%"
            icon={<Droplets className="h-6 w-6 text-white" />}
            color="bg-blue-100"
            optimal={true}
          />
          <SensorCard
            title="Svetlost"
            value="850"
            unit="lux"
            trend="stable"
            trendValue="0"
            icon={<Sun className="h-6 w-6 text-white" />}
            color="bg-yellow-100"
            optimal={true}
          />
          <SensorCard
            title="pH vrednost"
            value="6.8"
            unit="pH"
            trend="up"
            trendValue="+0.2"
            icon={<Activity className="h-6 w-6 text-white" />}
            color="bg-green-100"
            optimal={false}
          />
        </div>

        {/* Combined Irrigation and Automation Controls */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="space-y-8">
            <IrrigationControl />
            <AutomationRules />
          </div>
          <div className="space-y-8">
            <HardwareControl />
            <NotificationCenter />
          </div>
        </div>

        {/* Sensors and Devices Section */}
        <div className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">Temperatura</div>
              <div className="text-xs text-green-600">Online</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">Vlažnost</div>
              <div className="text-xs text-green-600">Online</div>
            </div>
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">Svetlost</div>
              <div className="text-xs text-green-600">Online</div>
            </div>
            <div className="text-center p-3 bg-red-50 rounded-lg">
              <div className="text-sm font-medium text-gray-900">pH senzor</div>
              <div className="text-xs text-red-600">Offline</div>
            </div>
          </div>
        </div>

        {/* Back to Top Button */}
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-full shadow-lg hover:bg-green-700 transition-colors"
          >
            <ArrowUp className="h-5 w-5" />
            <span>Na vrh</span>
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;