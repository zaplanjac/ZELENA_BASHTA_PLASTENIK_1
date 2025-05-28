import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface Zone {
  id: string;
  name: string;
  status: 'active' | 'inactive' | 'scheduled';
  lastRun: string;
  nextRun: string;
  duration: number;
}

interface Schedule {
  id: string;
  time: string;
  zones: string[];
  duration: number;
  active: boolean;
  days: string[];
}

interface IrrigationSettings {
  zones: Zone[];
  schedules: Schedule[];
  temperature: number;
  optimalTemperature: number;
  fanSpeed: number;
  isAutoTemp: boolean;
  setZones: (zones: Zone[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setTemperature: (temp: number) => void;
  setOptimalTemperature: (temp: number) => void;
  setFanSpeed: (speed: number) => void;
  setIsAutoTemp: (isAuto: boolean) => void;
}

export const useIrrigationStore = create<IrrigationSettings>()(
  persist(
    (set) => ({
      zones: [
        { id: '1', name: 'Vrt - Povrće', status: 'active', lastRun: '08:00', nextRun: '20:00', duration: 15 },
        { id: '2', name: 'Plastenik', status: 'scheduled', lastRun: '12:00', nextRun: '18:00', duration: 5 },
        { id: '3', name: 'Travnjak', status: 'inactive', lastRun: '07:30', nextRun: '19:30', duration: 20 }
      ],
      schedules: [
        { 
          id: '1', 
          time: '06:00', 
          zones: ['Vrt - Povrće'], 
          duration: 15, 
          active: true, 
          days: ['Mon', 'Wed', 'Fri'] 
        },
        { 
          id: '2', 
          time: '12:00', 
          zones: ['Plastenik'], 
          duration: 5, 
          active: true, 
          days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] 
        }
      ],
      temperature: 24,
      optimalTemperature: 25,
      fanSpeed: 0,
      isAutoTemp: true,
      setZones: (zones) => set({ zones }),
      setSchedules: (schedules) => set({ schedules }),
      setTemperature: (temperature) => set({ temperature }),
      setOptimalTemperature: (optimalTemperature) => set({ optimalTemperature }),
      setFanSpeed: (fanSpeed) => set({ fanSpeed }),
      setIsAutoTemp: (isAutoTemp) => set({ isAutoTemp })
    }),
    {
      name: 'irrigation-settings'
    }
  )
);