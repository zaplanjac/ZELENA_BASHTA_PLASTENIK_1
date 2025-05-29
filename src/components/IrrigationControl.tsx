import React, { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import IrrigationScheduleManager from './IrrigationScheduleManager';
import { useIrrigationStore } from '@/lib/settings';
import { Slider } from '@/components/ui/slider';
import { Settings, Thermometer } from 'lucide-react';

const IrrigationControl = () => {
  const [showScheduleManager, setShowScheduleManager] = useState(false);
  const {
    temperature,
    optimalTemperature,
    isAutoTemp,
    isMotorRunning,
    zones,
    motorSpeed,
    setTemperature,
    setOptimalTemperature,
    setIsAutoTemp,
    setMotorSpeed
  } = useIrrigationStore();

  const handleTemperatureChange = (value: number[]) => {
    setOptimalTemperature(value[0]);
  };

  const handleMotorSpeedChange = (value: number[]) => {
    setMotorSpeed(value[0]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Kontrola navodnjavanja i temperature - automatski režim</h3>
        <button 
          onClick={() => setShowScheduleManager(true)} 
          className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span>Podešavanja</span>
        </button>
      </div>
      
      {/* Temperature Control */}
      <div className="mb-8 p-4 border border-gray-200 rounded-lg bg-gray-50">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <Thermometer className="h-5 w-5 text-red-500" />
            <div>
              <h4 className="font-medium text-gray-900">Trenutna temperatura: {temperature}°C</h4>
              <p className="text-sm text-gray-600">Optimalna temperatura: {optimalTemperature}°C</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setIsAutoTemp(!isAutoTemp)}
              className={`px-3 py-1 rounded-lg text-sm ${
                isAutoTemp ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
              }`}
            >
              {isAutoTemp ? 'Automatski' : 'Ručno'}
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Optimalna temperatura (°C)
            </label>
            <Slider
              value={[optimalTemperature]}
              onValueChange={handleTemperatureChange}
              min={15}
              max={35}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">15°C</span>
              <span className="text-xs text-gray-500">{optimalTemperature}°C</span>
              <span className="text-xs text-gray-500">35°C</span>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Brzina motora (PWM)
            </label>
            <Slider
              value={[motorSpeed]}
              onValueChange={handleMotorSpeedChange}
              min={0}
              max={255}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between mt-1">
              <span className="text-xs text-gray-500">0</span>
              <span className="text-xs text-gray-500">{motorSpeed}</span>
              <span className="text-xs text-gray-500">255</span>
            </div>
            <p className="text-sm text-gray-600 mt-2">
              {isAutoTemp && (
                temperature > optimalTemperature
                  ? `Ventilator je uključen jer je temperatura (${temperature}°C) iznad optimalne (${optimalTemperature}°C)`
                  : `Ventilator je isključen jer je temperatura (${temperature}°C) u granicama optimalne (${optimalTemperature}°C)`
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Irrigation Zones */}
      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium text-gray-900">{zone.name}</div>
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  zone.status === 'active' ? 'bg-green-100 text-green-800' :
                  zone.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {zone.status === 'active' ? 'Aktivno' :
                   zone.status === 'scheduled' ? 'Zakazano' :
                   'Neaktivno'}
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="block font-medium">Poslednji ciklus</span>
                <span>{zone.lastRun}</span>
              </div>
              <div>
                <span className="block font-medium">Sledeći ciklus</span>
                <span>{zone.nextRun}</span>
              </div>
              <div>
                <span className="block font-medium">Trajanje</span>
                <span>{zone.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Manager Modal */}
      {showScheduleManager && (
        <IrrigationScheduleManager onClose={() => setShowScheduleManager(false)} />
      )}
    </div>
  );
};

export default IrrigationControl;