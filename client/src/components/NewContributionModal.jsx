import { useState } from 'react';
import axios from '../utils/axios';

const NewContributionModal = ({ groupId, onClose }) => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = async () => {
    try {
      await axios.post(`/api/groups/${groupId}/contributions`, {
        amount,
        date,
      });
      onClose();
    } catch (err) {
      console.error("Failed to add contribution:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-md w-96">
        <h2 className="text-xl font-semibold mb-4">Add Contribution</h2>
        <input
          type="number"
          placeholder="Amount in KES"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full mb-3 border rounded px-3 py-2"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full mb-3 border rounded px-3 py-2"
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewContributionModal;
