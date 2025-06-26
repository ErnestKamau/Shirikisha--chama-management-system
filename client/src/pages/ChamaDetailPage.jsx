
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';

const AddMemberModal = ({ groupId, onClose }) => {
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState('');
  const [role, setRole] = useState('member');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(`/api/users`);
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleAdd = async () => {
    if (!userId) {
      setError('Please select a user');
      return;
    }
    try {
      await axios.post(`/api/groups/${groupId}/add-user/${userId}`, { role });
      onClose();
    } catch (err) {
      console.error('Error adding member:', err);
      setError('Failed to add member. Please ensure the selected email belongs to a registered user.');
    }
  };

  return (
    <div className="modal">
      <h3>Add Member</h3>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select User</option>
        {members.map((u) => (
          <option key={u.id} value={u.id}>{u.full_name} ({u.email})</option>
        ))}
      </select>
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="member">Member</option>
        <option value="secretary">Secretary</option>
        <option value="treasurer">Treasurer</option>
      </select>
      <button onClick={handleAdd}>Add</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

const ChangeMemberRoleModal = ({ groupId, onClose }) => {
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState('');
  const [newRole, setNewRole] = useState('member');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`/api/groups/${groupId}/members`);
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching members:', err);
      }
    };
    fetchMembers();
  }, [groupId]);

  const handleChange = async () => {
    try {
      await axios.post(`/api/groups/${groupId}/change-role/${userId}`, { role: newRole });
      onClose();
    } catch (err) {
      console.error('Error changing role:', err);
    }
  };

  return (
    <div className="modal">
      <h3>Change Role</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>{m.full_name} ({m.email})</option>
        ))}
      </select>
      <select value={newRole} onChange={(e) => setNewRole(e.target.value)}>
        <option value="member">Member</option>
        <option value="secretary">Secretary</option>
        <option value="treasurer">Treasurer</option>
      </select>
      <button onClick={handleChange}>Change</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

const RemoveMemberModal = ({ groupId, onClose }) => {
  const [members, setMembers] = useState([]);
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const res = await axios.get(`/api/groups/${groupId}/members`);
        setMembers(res.data);
      } catch (err) {
        console.error('Error fetching members:', err);
      }
    };
    fetchMembers();
  }, [groupId]);

  const handleRemove = async () => {
    try {
      await axios.delete(`/api/groups/${groupId}/remove-user/${userId}`);
      onClose();
    } catch (err) {
      console.error('Error removing member:', err);
    }
  };

  return (
    <div className="modal">
      <h3>Remove Member</h3>
      <select value={userId} onChange={(e) => setUserId(e.target.value)}>
        <option value="">Select Member</option>
        {members.map((m) => (
          <option key={m.id} value={m.id}>{m.full_name} ({m.email})</option>
        ))}
      </select>
      <button onClick={handleRemove}>Remove</button>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};



const ChamaDetailPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);

  const [showAddMember, setShowAddMember] = useState(false);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [showRemoveMember, setShowRemoveMember] = useState(false);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const res = await axios.get(`/api/chama-groups/${id}`);
        const data = res.data;

        data.members = data.members || [];
        data.meetings = data.meetings || [];
        data.announcements = data.announcements || [];
        data.contributions = data.contributions || [];

        setGroup(data);
      } catch (err) {
        console.error('Error fetching group details:', err);
        setGroup(null);
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  if (loading) return <div className="p-4">Loading...</div>;
  if (!group) return <div className="p-4">Group not found or unauthorized.</div>;

  const isAdmin = group.user_role === 'chair' || group.user_role === 'admin';
  const isSecretary = group.user_role === 'secretary';
  const isTreasurer = group.user_role === 'treasurer';

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
      <p className="text-gray-600 mb-6">{group.description}</p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Members</h2>
        <ul className="divide-y divide-gray-200">
          {group.members.map((member) => (
            <li key={member.id} className="py-2 flex justify-between">
              <span>{member.full_name} ({member.email})</span>
              <span className="font-medium text-blue-600">{member.role}</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Meetings</h2>
        {isSecretary && <button className="mb-2 px-4 py-2 bg-blue-500 text-white rounded">Schedule Meeting</button>}
        {group.meetings.length > 0 ? (
          <ul className="text-sm text-gray-700">
            {group.meetings.map((m) => (
              <li key={m.id} className="py-1">
                🗓️ {new Date(m.scheduled_at).toLocaleString()} - {m.agenda}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No meetings scheduled.</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Financial Dashboard</h2>
        {isTreasurer && <button className="mb-2 px-4 py-2 bg-green-500 text-white rounded">Track Contributions</button>}
        {group.contributions.length > 0 ? (
          <ul className="text-sm text-gray-700">
            {group.contributions.map((c) => (
              <li key={c.id} className="py-1">
                💰 KES {c.amount} on {new Date(c.date).toLocaleDateString()} (Member ID: {c.member_id})
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No contributions yet.</p>
        )}
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Announcements</h2>
        {group.announcements.length > 0 ? (
          <ul className="text-sm text-gray-700">
            {group.announcements.map((a) => (
              <li key={a.id} className="py-1">
                📢 <strong>{a.title}</strong>: {a.content}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No announcements available.</p>
        )}
      </section>

      {isAdmin && (
        <section className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Admin Actions</h2>
          <div className="flex gap-4">
            <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={() => setShowAddMember(true)}>➕ Add Member</button>
            <button className="px-4 py-2 bg-yellow-500 text-white rounded" onClick={() => setShowChangeRole(true)}>🛠️ Change Role</button>
            <button className="px-4 py-2 bg-red-600 text-white rounded" onClick={() => setShowRemoveMember(true)}>❌ Remove Member</button>
          </div>
        </section>
      )}

      {showAddMember && <AddMemberModal groupId={id} onClose={() => setShowAddMember(false)} />}
      {showChangeRole && <ChangeMemberRoleModal groupId={id} onClose={() => setShowChangeRole(false)} />}
      {showRemoveMember && <RemoveMemberModal groupId={id} onClose={() => setShowRemoveMember(false)} />}
    </div>
  );
};

export default ChamaDetailPage;



