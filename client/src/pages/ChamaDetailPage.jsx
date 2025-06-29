import NavBar from '../components/NavBar';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from '../utils/axios';
import EditContributionModal from '../components/EditContributionModal';
import ScheduleMeetingModal from "../components/ScheduleMeetingModule";
import ChangeMemberRoleModal from '../components/ChangeMemberRoleModal';
import AddMemberModal from '../components/AddMemberModal';
import RemoveMemberModal from '../components/RemoveMemberModal';
import NewContributionModal from '../components/NewContributionModal';



const ChamaDetailPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState({});
  const [loading, setLoading] = useState(true);

  const [showAddMember, setShowAddMember] = useState(false);
  const [showChangeRole, setShowChangeRole] = useState(false);
  const [showRemoveMember, setShowRemoveMember] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [selectedContribution, setSelectedContribution] = useState(null);
  const [showEditContribution, setShowEditContribution] = useState(false);
  const [showNewContribution, setShowNewContribution] = useState(false);


  const triggerRefresh = () => setRefreshKey(prev => prev + 1);

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const res = await axios.get(`/chama-groups/${id}`);
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
  }, [id, refreshKey]);

  if (loading) return <div className="p-6 text-gray-600">Loading group details...</div>;
  if (!group) return <div className="p-6 text-red-600">Group not found or unauthorized.</div>;

  const isAdmin = group.user_role === 'chair' || group.user_role === 'admin';
  const isSecretary = group.user_role === 'secretary';
  const isTreasurer = group.user_role === 'treasurer';

  return (
    <div className="bg-gray-50 min-h-screen font-sans">
      <NavBar />
      <div className="p-6 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">{group.name}</h1>
        <p className="text-gray-500 mb-6">{group.description}</p>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Members</h2>
          <ul className="divide-y divide-gray-200 bg-white rounded-xl shadow-sm p-4">
            {group.members.map((member) => (
              <li
                key={member.id}
                className="py-2 flex justify-between text-gray-700"
              >
                <span>
                  {member.full_name} ({member.email})
                </span>
                <span className="font-medium text-blue-600 capitalize">
                  {member.role}
                </span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">Meetings</h2>
            {isSecretary && (
              <button
                onClick={() => setShowScheduleModal(true)}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium"
              >
                + Schedule Meeting
              </button>
            )}
          </div>
          <div className="mt-2 bg-white rounded-xl shadow-sm p-4">
            {group.meetings.length > 0 ? (
              <ul className="text-sm text-gray-700 space-y-1">
                {group.meetings.map((m) => (
                  <li key={m.id}>
                    🗓️ {new Date(m.scheduled_at).toLocaleString()} - {m.agenda}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No meetings scheduled.</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Financial Dashboard
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            {
              <button
                className="mt-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg"
                onClick={() => setShowNewContribution(true)}
              >
                ➕ Add Contribution
              </button>
            }

            {isTreasurer && (
              <p className="text-gray-600 text-sm mb-2">
                Click a contribution to edit.
              </p>
            )}
            {group.contributions.length > 0 ? (
              <ul className="text-sm text-gray-700 space-y-1">
                {group.contributions.map((c, index) => (
                  <li key={c.id || index}>
                    {isTreasurer ? (
                      <button
                        type="button"
                        className="w-full text-left hover:bg-gray-100 cursor-pointer focus:outline-none"
                        onClick={() => {
                          setSelectedContribution(c);
                          setShowEditContribution(true);
                        }}
                      >
                        💰 KES {c.amount} on{" "}
                        {new Date(c.date).toLocaleDateString()}{" "}
                        {c.member?.full_name
                          ? `(by ${c.member.full_name})`
                          : "(by Unknown)"}
                      </button>
                    ) : (
                      <>
                        💰 KES {c.amount} on{" "}
                        {new Date(c.date).toLocaleDateString()}{" "}
                        {c.member?.full_name
                          ? `(by ${c.member.full_name})`
                          : "(by Unknown)"}
                      </>
                    )}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No contributions yet.</p>
            )}
          </div>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Announcements
          </h2>
          <div className="bg-white rounded-xl shadow-sm p-4">
            {group.announcements.length > 0 ? (
              <ul className="text-sm text-gray-700 space-y-1">
                {group.announcements.map((a, index) => (
                  <li key={a.id || index}>
                    📢 <strong>{a.title}</strong>: {a.message}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No announcements available.</p>
            )}
          </div>
        </section>

        {isAdmin && (
          <section className="mb-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Admin Actions
            </h2>
            <div className="flex flex-wrap gap-4">
              <button
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg"
                onClick={() => setShowAddMember(true)}
              >
                ➕ Add Member
              </button>
              <button
                className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg"
                onClick={() => setShowChangeRole(true)}
              >
                🛠️ Change Role
              </button>
              <button
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
                onClick={() => setShowRemoveMember(true)}
              >
                ❌ Remove Member
              </button>
            </div>
          </section>
        )}

        {showAddMember && (
          <AddMemberModal
            groupId={id}
            onClose={() => {
              setShowAddMember(false);
              triggerRefresh();
            }}
          />
        )}
        {showChangeRole && (
          <ChangeMemberRoleModal
            groupId={id}
            onClose={() => {
              setShowChangeRole(false);
              triggerRefresh();
            }}
          />
        )}
        {showRemoveMember && (
          <RemoveMemberModal
            groupId={id}
            onClose={() => {
              setShowRemoveMember(false);
              triggerRefresh();
            }}
          />
        )}
        {showScheduleModal && (
          <ScheduleMeetingModal
            groupId={id}
            onClose={() => {
              setShowScheduleModal(false);
              triggerRefresh();
            }}
          />
        )}
        {showEditContribution && selectedContribution && (
          <EditContributionModal
            groupId={id}
            contribution={selectedContribution}
            onClose={() => {
              setShowEditContribution(false);
              setSelectedContribution(null);
              triggerRefresh();
            }}
          />
        )}
        {showNewContribution && (
          <NewContributionModal
            groupId={id}
            onClose={() => {
              setShowNewContribution(false);
              triggerRefresh();
            }}
          />
        )}
        
      </div>
    </div>
  );
};

export default ChamaDetailPage;




