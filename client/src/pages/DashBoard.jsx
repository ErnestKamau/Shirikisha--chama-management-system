// DashBoard.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';
import { Users, PlusCircle, Clock, BarChart, BadgePlus, Eye, LogOut } from 'lucide-react';
import NavBar from '../components/NavBar';

const DashBoard = () => {
  const [user, setUser] = useState(null);
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({ total_contributions: 0, next_meeting: null });


  useEffect(() => {
    const fetchUserAndGroups = async () => {
      try {
        const [userRes, groupsRes, dashboardRes] = await Promise.all([
          axios.get("/api/me"),
          axios.get("/api/user/chamagroups"),
          axios.get("/api/dashboard-data"),
        ]);


        setUser(userRes.data);
        const groupData = groupsRes.data;
        if (!Array.isArray(groupData)) throw new Error('Invalid groups response');
        setGroups(groupData);
        setDashboardData(dashboardRes.data)
      } catch (err) {
        console.error('Error fetching dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndGroups();
  }, []);

  if (loading) return <div className="p-4">Loading dashboard...</div>;

  const totalContributions = dashboardData.total_contributions || 0;
  const totalChamas = groups.length;
  const nextMeeting = dashboardData.next_meeting;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <NavBar />
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Welcome back, {user?.full_name || 'User'}!
          </h1>
          <p className="text-gray-500">Here's an overview of your chama activity</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <SummaryCard 
            icon={<BarChart className="text-green-500" />} 
            title="Total Contributions" 
            value={`KES ${totalContributions.toLocaleString()}`}
            change="(sum of your contributions across all chama groups)"
            changeColor="text-green-600"
          />
          <SummaryCard 
            icon={<Users className="text-blue-500" />} 
            title="Chamas Joined" 
            value={totalChamas}
            change="Active"
            changeColor="text-blue-600"
          />
          <SummaryCard 
            icon={<Clock className="text-purple-500" />} 
            title="Next Meeting" 
            value={nextMeeting ? new Date(nextMeeting.scheduled_at).toLocaleString() : 'N/A'}
            change={nextMeeting?.agenda || 'No upcoming agenda'}
            changeColor="text-purple-600"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <QuickActions />
          </div>
          <div className="lg:col-span-2">
            <RecentActivity groups={groups} />
          </div>
        </div>
      </div>
    </div>
  );
};

const SummaryCard = ({ icon, title, value, change, changeColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
    <div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <div className={`text-sm font-medium mt-2 flex items-center ${changeColor}`}>{change}</div>
    </div>
    <div className="bg-gray-100 rounded-full p-3">{icon}</div>
  </div>
);

const QuickActions = () => {
  const navigate = useNavigate();
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
      <div className="space-y-4">
        <ActionButton
          icon={<BadgePlus className="text-white"/>}
          text="Create New Chama"
          onClick={() => navigate('/chamas/create')}
          className="bg-green-600 hover:bg-green-700 text-white"
        />
        <ActionButton
          icon={<Eye className="text-gray-600"/>}
          text="View My Chamas"
          onClick={() => navigate('/chamas')}
          className="bg-gray-100 hover:bg-gray-200 text-gray-800"
        />
      </div>
    </div>
  );
};

const ActionButton = ({ icon, text, onClick, className }) => (
  <button
    onClick={onClick}
    className={`w-full flex items-center justify-center text-left p-4 rounded-lg font-semibold transition-colors ${className}`}
  >
    {icon && <span className="mr-3">{icon}</span>}
    {text}
  </button>
);

const RecentActivity = ({ groups }) => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Your Chamas</h2>
      <ul className="space-y-4">
        {groups.length > 0 ? groups.map((group) => (
          <li key={group.id} className="flex justify-between items-center border-b pb-2">
            <div>
              <p className="font-semibold text-gray-700">{group.name}</p>
              <p className="text-sm text-gray-500">{group.description}</p>
            </div>
            <button
              onClick={() => window.location.href = `/chamas/${group.id}`}
              className="text-blue-600 hover:underline text-sm"
            >
              View
            </button>
          </li>
        )) : <p className="text-gray-500">No chama groups found.</p>}
      </ul>
    </div>
  );
};

export default DashBoard;


