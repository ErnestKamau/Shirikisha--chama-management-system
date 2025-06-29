import React, { useEffect, useState } from 'react';
import axios from '../utils/axios';

const AddMemberModal = ({ groupId, onClose }) => {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [role, setRole] = useState('member');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get('/users')
      .then(res => setUsers(res.data))
      .catch(err => console.error('Failed to fetch users', err));
  }, []);

  const handleSubmit = async () => {
    if (!selectedUserId) return alert('Please select a user');

    setLoading(true);
    try {
      await axios.post(`/groups/${groupId}/add-user/${selectedUserId}`, { role });
      alert('User added successfully');
      onClose();
    } catch (err) {
      console.error(err);
      alert('Failed to add user');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-96">
        <h2 className="text-xl font-bold mb-4">Add Member</h2>
        <label className="block mb-2 text-sm font-medium">Select User</label>
        <select value={selectedUserId} onChange={e => setSelectedUserId(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="">-- Choose user --</option>
          {users.map(user => (
            <option key={user.id} value={user.id}>{user.full_name} ({user.email})</option>
          ))}
        </select>

        <label className="block mb-2 text-sm font-medium">Role</label>
        <select value={role} onChange={e => setRole(e.target.value)} className="w-full p-2 mb-4 border rounded">
          <option value="member">Member</option>
          <option value="secretary">Secretary</option>
          <option value="treasurer">Treasurer</option>
        </select>

        <div className="flex justify-end gap-4">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSubmit} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded">
            {loading ? 'Adding...' : 'Add Member'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddMemberModal;