import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const NavBar = () => {
  const [user, setUser] = useState(null);
  const { logout } = useAuth();
  const navigate = useNavigate()


  useEffect(() => {
  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('token'); // or use your AuthContext if available
      if (!token) return;

      const response = await fetch('/api/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');
      const userRes = await response.json();
      setUser(userRes);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  fetchUser();
}, []);


  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <span className="text-xl font-semibold text-gray-900">
                Shirikisha
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              to="/dashboard"
              className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 5a2 2 0 012-2h4a2 2 0 012 2v3H8V5z"
                />
              </svg>
              <span>Dashboard</span>
            </Link>

            <Link
              to="/chamas"
              className="flex items-center space-x-1 text-teal-600 font-medium"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span>My Chamas</span>
            </Link>

            <Link
              to="/chamas/create"
              className="flex items-center space-x-1 text-gray-600 hover:text-teal-600 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                />
              </svg>
              <span>Create Chama</span>
            </Link>
          </div>

          {/* Right side - Notifications and Profile */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-3.5-3.5a5.98 5.98 0 01-1.5-4V9a5 5 0 00-10 0v.5c0 1.5-.6 3-1.5 4L1 17h5m9 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              {/* Notification dot */}
              <span className="absolute top-1 right-1 block h-2 w-2 bg-red-500 rounded-full"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center">
                <span className="text-white text-sm font-medium">P</span>
              </div>
              <Link
                to="/profile"
                className="text-gray-700 hover:text-teal-600 transition-colors font-medium"
              >
                {user ? user.full_name : "Profile"}
              </Link>
            </div>

            <button
              onClick={() => logout(navigate)}
              className="px-3 py-2 bg-red-100 text-red-600 hover:bg-red-200 rounded-md text-sm font-medium transition-colors"
            >
              Logout
            </button>

          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
