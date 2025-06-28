import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const RemoveMemberModal = ({ groupId, onClose }) => {
  const [members, setMembers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/api/group/${groupId}/members`)
      .then(res => setMembers(res.data))
      .catch(err => console.error('Failed to fetch members', err));
  }, [groupId]);

  const handleSubmit = async () => {
    if (!selectedUserId) return alert('Please select a member');

    setLoading(true);
    try {
      await axios.delete(`/api/group/${groupId}/members/${selectedUserId}`);
      alert('Member removed successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to remove member');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Remove Member</h2>
        <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">-- Choose member --</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>{m.full_name} ({m.role})</option>
          ))}
        </select>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-red-600 text-white rounded">
            {loading ? 'Removing...' : 'Remove Member'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RemoveMemberModal;