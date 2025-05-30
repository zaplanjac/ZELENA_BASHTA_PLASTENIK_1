import React, { useState } from 'react';
import { 
  Power, Settings, RefreshCw, Clock, Thermometer, Droplets,
  Sun, Moon, Play, Pause, Wifi, WifiOff, Lock, Eye, EyeOff,
  AlertTriangle, CheckCircle
} from 'lucide-react';
import { useIrrigationStore } from '@/lib/settings';

const HardwareControl = () => {
  const { 
    isMotorRunning,
    temperature,
    optimalTemperature,
    isAutoTemp,
    setIsMotorRunning,
    setIsAutoTemp
  } = useIrrigationStore();

  const [devices, setDevices] = useState([
    {
      id: 'temp1',
      name: 'Temperaturni senzor',
      type: 'sensor',
      status: 'online',
      value: '24.5',
      unit: '°C',
      icon: <Thermometer className="h-5 w-5" />,
      optimal: false
    },
    {
      id: 'fan1',
      name: 'Ventilator',
      type: 'actuator',
      status: 'online',
      value: isMotorRunning ? 'ON' : 'OFF',
      icon: <RefreshCw className="h-5 w-5" />,
      controls: true
    },
    {
      id: 'pump1',
      name: 'Elektroventil za vodu',
      type: 'actuator',
      status: 'warning',
      value: 'ON',
      icon: <Droplets className="h-5 w-5" />,
      controls: true
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-100 text-green-800 border-green-200';
      case 'warning': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'offline': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'online': return <Wifi className="h-4 w-4 text-green-600" />;
      case 'offline': return <WifiOff className="h-4 w-4 text-red-600" />;
      default: return <Wifi className="h-4 w-4 text-yellow-600" />;
    }
  };

  const toggleDevice = (deviceId: string) => {
    if (!isAutoTemp || deviceId !== 'fan1') {
      if (deviceId === 'fan1') {
        setIsMotorRunning(!isMotorRunning);
      }
      setDevices(devices.map(device => {
        if (device.id === deviceId) {
          const newValue = device.value === 'ON' ? 'OFF' : 'ON';
          return { ...device, value: newValue };
        }
        return device;
      }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Ručna hardverska kontrola</h3>
        <div className="flex space-x-2">
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <RefreshCw className="h-4 w-4" />
          </button>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Mode Selection Banner */}
      <div className="mb-6 p-4 rounded-lg border bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h4 className="font-medium text-gray-900">Režim rada</h4>
            <p className="text-sm text-gray-600">
              {isAutoTemp 
                ? 'Automatska kontrola na osnovu temperature'
                : 'Ručna kontrola ventilatora'}
            </p>
          </div>
          <div className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-4">
            <button
              onClick={() => setIsAutoTemp(false)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                !isAutoTemp 
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Ručno
            </button>
            <button
              onClick={() => setIsAutoTemp(true)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                isAutoTemp 
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              Automatski
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {devices.map((device) => (
          <div key={device.id} className={`border rounded-lg p-4 ${getStatusColor(device.status)}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-white rounded-lg">
                  {device.icon}
                </div>
                <div>
                  <h4 className="font-medium">{device.name}</h4>
                  <div className="flex items-center space-x-1 text-sm">
                    {getStatusIcon(device.status)}
                    <span className="capitalize">{device.status}</span>
                  </div>
                </div>
              </div>
              
              {device.controls && (
                <button
                  onClick={() => toggleDevice(device.id)}
                  disabled={isAutoTemp && device.id === 'fan1'}
                  className={`p-2 rounded-lg transition-colors ${
                    device.value === 'ON' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                  } ${isAutoTemp && device.id === 'fan1' ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={isAutoTemp && device.id === 'fan1' ? 'Prebacite na ručni režim za kontrolu' : ''}
                >
                  <Power className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="text-lg font-semibold">
              {device.value} {device.unit}
            </div>

            {device.id === 'fan1' && isAutoTemp && (
              <div className="mt-2 text-sm text-gray-600">
                {temperature > optimalTemperature 
                  ? `Ventilator je uključen jer je temperatura (${temperature}°C) iznad optimalne (${optimalTemperature}°C)`
                  : `Ventilator je isključen jer je temperatura (${temperature}°C) u granicama optimalne (${optimalTemperature}°C)`
                }
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Ukupno uređaja: {devices.length}</span>
          <span>Online: {devices.filter(d => d.status === 'online').length}</span>
          <span>Upozorenja: {devices.filter(d => d.status === 'warning').length}</span>
        </div>
      </div>
    </div>
  );
};

export default HardwareControl;