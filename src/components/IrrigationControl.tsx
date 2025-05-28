import React, { useState } from 'react';
import { Droplets, Clock, Settings, Thermometer } from 'lucide-react';
import IrrigationScheduleManager from './IrrigationScheduleManager';
import { useIrrigationStore } from '@/lib/settings';
import { Slider } from '@/components/ui/slider';

const IrrigationControl = () => {
  const [showScheduleManager, setShowScheduleManager] = useState(false);
  const {
    temperature,
    optimalTemperature,
    fanSpeed,
    isAutoTemp,
    zones,
    setTemperature,
    setOptimalTemperature,
    setFanSpeed,
    setIsAutoTemp
  } = useIrrigationStore();

  const handleTemperatureChange = (value: number[]) => {
    setOptimalTemperature(value[0]);
  };

  const handleFanSpeedChange = (value: number[]) => {
    setFanSpeed(value[0]);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Kontrola navodnjavanja i temperature</h3>
        <button 
          onClick={() => setShowScheduleManager(true)} 
          className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
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

          {!isAutoTemp && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Brzina ventilatora
              </label>
              <Slider
                value={[fanSpeed]}
                onValueChange={handleFanSpeedChange}
                min={0}
                max={100}
                step={1}
                className="w-full"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">0%</span>
                <span className="text-xs text-gray-500">{fanSpeed}%</span>
                <span className="text-xs text-gray-500">100%</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Irrigation Zones */}
      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-gray-900">{zone.name}</h4>
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
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Automatski režim: Uključen</span>
          </div>
          <div className="text-sm text-gray-600">
            Sledeće automatsko zalivanje: 06:00
          </div>
        </div>
      </div>

      {/* Schedule Manager Modal */}
      {showScheduleManager && (
        <IrrigationScheduleManager onClose={() => setShowScheduleManager(false)} />
      )}
    </div>
  );
};

export default IrrigationControl;