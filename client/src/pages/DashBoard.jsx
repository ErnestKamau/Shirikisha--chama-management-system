import React from 'react';
import { useNavigate } from 'react-router-dom';
import { UserIcon, UsersIcon, PlusCircleIcon, LogOutIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const DashBoard = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  function handleLogout(){
    logout()
    navigate('/')
  }

  const handleNavigation = (path) => navigate(path);

  return (
    <div className="min-h-screen bg-blue-50 p-6">
      <div className="max-w-6xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Welcome, {user?.email || 'User'}</h1>
          <button
            onClick={handleLogout}
            className="flex items-center text-red-600 hover:underline"
          >
            <LogOutIcon className="w-5 h-5 mr-1" /> Logout
          </button>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <DashboardCard
            icon={<UserIcon className="w-8 h-8 text-blue-600" />}
            title="User Profile"
            description="View and update your profile"
            onClick={() => handleNavigation('/profile')}
          />

          <DashboardCard
            icon={<UsersIcon className="w-8 h-8 text-green-600" />}
            title="My Chamas"
            description="View chamas you are a part of"
            onClick={() => handleNavigation('/chamas')}
          />

          <DashboardCard
            icon={<PlusCircleIcon className="w-8 h-8 text-purple-600" />}
            title="Create Chama"
            description="Start a new chama group"
            onClick={() => handleNavigation('/chamas/create')}
          />

          {/* Additional Cards */}
          <DashboardCard
            icon={<UsersIcon className="w-8 h-8 text-yellow-600" />}
            title="All Members"
            description="See all registered members"
            onClick={() => handleNavigation('/members')}
          />
        </div>
      </div>
    </div>
  );
};

const DashboardCard = ({ icon, title, description, onClick }) => (
  <div
    onClick={onClick}
    className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition cursor-pointer border border-gray-200"
  >
    <div className="mb-4">{icon}</div>
    <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default DashBoard;
