import React, { useState } from 'react';
import { 
  Power, 
  Settings, 
  RefreshCw, 
  Clock, 
  Thermometer, 
  Droplets,
  Sun,
  Moon,
  Play,
  Pause,
  Wifi,
  WifiOff,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle
} from 'lucide-react';

const HardwareControl = () => {
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
      id: 'led1',
      name: 'LED osvetljenje',
      type: 'actuator',
      status: 'online',
      value: '75',
      unit: '%',
      icon: <Sun className="h-5 w-5" />,
      controls: true
    },
    {
      id: 'fan1',
      name: 'Ventilator',
      type: 'actuator',
      status: 'online',
      value: 'OFF',
      icon: <RefreshCw className="h-5 w-5" />,
      controls: true
    },
    {
      id: 'pump1',
      name: 'Pumpa za vodu',
      type: 'actuator',
      status: 'warning',
      value: 'ON',
      icon: <Droplets className="h-5 w-5" />,
      controls: true
    }
  ]);

  const [isAutoMode, setIsAutoMode] = useState(true);

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
    if (!isAutoMode) { // Only allow manual control when in manual mode
      setDevices(devices.map(device => {
        if (device.id === deviceId && device.controls) {
          const newValue = device.value === 'ON' ? 'OFF' : 'ON';
          return { ...device, value: newValue };
        }
        return device;
      }));
    }
  };

  const hasNonOptimalValues = devices.some(device => 
    device.type === 'sensor' && device.optimal === false
  );

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
      <div className={`mb-6 p-4 rounded-lg border ${
        hasNonOptimalValues ? 'bg-red-50 border-red-200' : 'bg-gray-50 border-gray-200'
      }`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {hasNonOptimalValues && (
              <AlertTriangle className="h-5 w-5 text-red-500" />
            )}
            <div>
              <h4 className="font-medium text-gray-900">Režim rada</h4>
              <p className="text-sm text-gray-600">
                {hasNonOptimalValues 
                  ? 'Detektovane su neoptimalne vrednosti! Preporučuje se ručna kontrola.'
                  : 'Izaberite način upravljanja uređajima'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setIsAutoMode(false)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                !isAutoMode 
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Ručno
            </button>
            <button
              onClick={() => setIsAutoMode(true)}
              className={`px-6 py-2 rounded-lg transition-colors ${
                isAutoMode 
                  ? 'bg-green-600 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
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
                  disabled={isAutoMode}
                  className={`p-2 rounded-lg transition-colors ${
                    device.value === 'ON' 
                      ? 'bg-green-600 text-white hover:bg-green-700' 
                      : 'bg-gray-300 text-gray-600 hover:bg-gray-400'
                  } ${isAutoMode ? 'opacity-50 cursor-not-allowed' : ''}`}
                  title={isAutoMode ? 'Prebacite na ručni režim za kontrolu' : ''}
                >
                  <Power className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="text-lg font-semibold">
              {device.value} {device.unit}
            </div>
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