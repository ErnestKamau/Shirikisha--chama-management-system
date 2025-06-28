// components/ScheduleMeetingModal.jsx
import { useState } from 'react';
import axios from '../utils/axios';

const ScheduleMeetingModal = ({ groupId, onClose }) => {
  const [agenda, setAgenda] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(
        `/api/groups/${groupId}/meetings`,
        {
          agenda,
          scheduled_at: scheduledAt,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      alert('Meeting scheduled successfully!');
      onClose();
    } catch (err) {
      console.error('Failed to schedule meeting:', err);
      alert('Error scheduling meeting.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fadeIn transition-all duration-300 ease-out">
        <h2 className="text-xl font-semibold mb-4">Schedule Meeting</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Agenda</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={agenda}
            onChange={(e) => setAgenda(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date & Time</label>
          <input
            type="datetime-local"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={scheduledAt}
            onChange={(e) => setScheduledAt(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Schedule</button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleMeetingModal;
