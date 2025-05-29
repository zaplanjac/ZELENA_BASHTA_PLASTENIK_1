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
  motorSpeed: number;
  fanSpeed: number;
  isAutoTemp: boolean;
  isMotorRunning: boolean;
  setZones: (zones: Zone[]) => void;
  setSchedules: (schedules: Schedule[]) => void;
  setTemperature: (temp: number) => void;
  setOptimalTemperature: (temp: number) => void;
  setMotorSpeed: (speed: number) => void;
  setFanSpeed: (speed: number) => void;
  setIsAutoTemp: (isAuto: boolean) => void;
  setIsMotorRunning: (isRunning: boolean) => void;
  updateZoneSchedule: (zoneId: string, nextRun: string) => void;
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
      motorSpeed: 128,
      fanSpeed: 0,
      isAutoTemp: true,
      isMotorRunning: false,
      setZones: (zones) => set({ zones }),
      setSchedules: (schedules) => {
        set({ schedules });
        // Update zone schedules based on new schedules
        set((state) => {
          const updatedZones = state.zones.map(zone => {
            const zoneSchedules = schedules.filter(s => 
              s.active && s.zones.includes(zone.name)
            ).sort((a, b) => a.time.localeCompare(b.time));
            
            if (zoneSchedules.length > 0) {
              return {
                ...zone,
                status: 'scheduled',
                nextRun: zoneSchedules[0].time
              };
            }
            return {
              ...zone,
              status: 'inactive',
              nextRun: '-'
            };
          });
          return { zones: updatedZones };
        });
      },
      setTemperature: (temperature) => {
        set((state) => {
          const isMotorRunning = state.isAutoTemp ? temperature > state.optimalTemperature : state.isMotorRunning;
          return { temperature, isMotorRunning };
        });
      },
      setOptimalTemperature: (optimalTemperature) => {
        set((state) => {
          const isMotorRunning = state.isAutoTemp ? state.temperature > optimalTemperature : state.isMotorRunning;
          return { optimalTemperature, isMotorRunning };
        });
      },
      setMotorSpeed: (motorSpeed) => set({ motorSpeed }),
      setFanSpeed: (fanSpeed) => set({ fanSpeed }),
      setIsAutoTemp: (isAutoTemp) => {
        set((state) => {
          const isMotorRunning = isAutoTemp ? state.temperature > state.optimalTemperature : state.isMotorRunning;
          return { isAutoTemp, isMotorRunning };
        });
      },
      setIsMotorRunning: (isMotorRunning) => set({ isMotorRunning }),
      updateZoneSchedule: (zoneId, nextRun) => 
        set((state) => ({
          zones: state.zones.map(zone =>
            zone.id === zoneId
              ? { ...zone, nextRun }
              : zone
          )
        }))
    }),
    {
      name: 'irrigation-settings'
    }
  )
);