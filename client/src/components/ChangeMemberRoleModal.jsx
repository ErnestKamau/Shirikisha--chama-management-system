import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const ChangeMemberRoleModal = ({ groupId, onClose }) => {
  const [members, setMembers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [newRole, setNewRole] = useState('member');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(`/group/${groupId}/members`)
      .then(res => setMembers(res.data))
      .catch(err => console.error('Failed to fetch members', err));
  }, [groupId]);

  const handleSubmit = async () => {
    if (!selectedUserId) return alert('Please select a member');

    setLoading(true);
    try {
      await axios.post(`/groups/${groupId}/change-role/${selectedUserId}`, { role: newRole });
      alert('Role changed successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to change role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Change Member Role</h2>
        <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">-- Choose member --</option>
          {members.map(m => (
            <option key={m.id} value={m.id}>{m.full_name} ({m.role})</option>
          ))}
        </select>

        <select value={newRole} onChange={e => setNewRole(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="member">Member</option>
          <option value="secretary">Secretary</option>
          <option value="treasurer">Treasurer</option>
        </select>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-yellow-500 text-white rounded">
            {loading ? 'Updating...' : 'Change Role'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChangeMemberRoleModal;