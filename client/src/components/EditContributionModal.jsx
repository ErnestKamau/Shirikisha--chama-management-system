// components/EditContributionModal.jsx
import { useState } from 'react';
import axios from '../utils/axios';

const EditContributionModal = ({ groupId, contribution, onClose }) => {
  const [amount, setAmount] = useState(contribution.amount);
  const [date, setDate] = useState(contribution.date);

  const handleSubmit = async () => {
    try {
      await axios.put(
        `/groups/${groupId}/contributions/${contribution.id}`,
        {
          amount,
          date,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      alert('Contribution updated successfully!');
      onClose();
    } catch (err) {
      console.error('Failed to update contribution:', err);
      alert('Error updating contribution.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md animate-fadeIn transition-all duration-300 ease-out">
        <h2 className="text-xl font-semibold mb-4">Edit Contribution</h2>
        <div className="mb-3">
          <label className="block text-sm font-medium mb-1">Amount (KES)</label>
          <input
            type="number"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Date</label>
          <input
            type="date"
            className="w-full border border-gray-300 rounded px-3 py-2"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400">Cancel</button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Save</button>
        </div>
      </div>
    </div>
  );
};

export default EditContributionModal;
