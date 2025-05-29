import React, { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScheduleList from './ScheduleList';
import { useIrrigationStore } from '@/lib/settings';

interface ScheduleItem {
  id: string;
  time: string;
  zones: string[];
  duration: number;
  active: boolean;
  days: string[];
}

interface IrrigationScheduleManagerProps {
  onClose: () => void;
}

const IrrigationScheduleManager = ({ onClose }: IrrigationScheduleManagerProps) => {
  const { schedules: storedSchedules, setSchedules } = useIrrigationStore();
  const [schedules, setLocalSchedules] = useState<ScheduleItem[]>(storedSchedules);
  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const availableZones = ['Vrt - Povrće', 'Plastenik', 'Travnjak'];
  const daysOfWeek = [
    { key: 'Mon', label: 'Pon' },
    { key: 'Tue', label: 'Uto' },
    { key: 'Wed', label: 'Sre' },
    { key: 'Thu', label: 'Čet' },
    { key: 'Fri', label: 'Pet' },
    { key: 'Sat', label: 'Sub' },
    { key: 'Sun', label: 'Ned' }
  ];

  const createNewSchedule = () => {
    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      time: '08:00',
      zones: [],
      duration: 10,
      active: true,
      days: ['Mon', 'Wed', 'Fri']
    };
    setEditingSchedule(newSchedule);
    setIsCreating(true);
  };

  const saveSchedule = (schedule: ScheduleItem) => {
    let updatedSchedules: ScheduleItem[];
    if (isCreating) {
      updatedSchedules = [...schedules, schedule];
    } else {
      updatedSchedules = schedules.map(s => s.id === schedule.id ? schedule : s);
    }
    setLocalSchedules(updatedSchedules);
    setSchedules(updatedSchedules); // Update global store
    setEditingSchedule(null);
    setIsCreating(false);
  };

  const deleteSchedule = (id: string) => {
    const updatedSchedules = schedules.filter(s => s.id !== id);
    setLocalSchedules(updatedSchedules);
    setSchedules(updatedSchedules); // Update global store
  };

  const toggleScheduleActive = (id: string) => {
    const updatedSchedules = schedules.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    );
    setLocalSchedules(updatedSchedules);
    setSchedules(updatedSchedules); // Update global store
  };

  const cancelEdit = () => {
    setEditingSchedule(null);
    setIsCreating(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Upravljanje rasporedom navodnjavanja</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Trenutni raspored</h3>
            <Button onClick={createNewSchedule} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Dodaj novi raspored</span>
            </Button>
          </div>

          <ScheduleList
            schedules={schedules}
            editingSchedule={editingSchedule}
            isCreating={isCreating}
            availableZones={availableZones}
            daysOfWeek={daysOfWeek}
            onEditSchedule={setEditingSchedule}
            onDeleteSchedule={deleteSchedule}
            onToggleScheduleActive={toggleScheduleActive}
            onSaveSchedule={saveSchedule}
            onCancelEdit={cancelEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default IrrigationScheduleManager;