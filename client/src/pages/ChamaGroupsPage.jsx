import { Link } from 'react-router-dom';
import { useState, useMemo } from 'react';
import useUserChamas from '../hooks/useUserChamas';
import NavBar from '../components/NavBar';

const formatDate = (isoDate) => {
  const date = new Date(isoDate);
  return date.toLocaleDateString('en-KE', { year: 'numeric', month: 'short', day: 'numeric' });
};

const ChamaGroupsPage = () => {
  const { chamas, loading, error } = useUserChamas();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredChamas = useMemo(() => {
    if (!searchTerm.trim()) return chamas;
    return chamas.filter((chama) =>
      chama.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chama.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chama.role?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [chamas, searchTerm]);

  if (loading || !chamas) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mt-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            <p className="mt-4 text-gray-600">Loading your chamas...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="text-center mt-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600">{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (chamas.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <NavBar />
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
            <div className="flex justify-between items-center mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">My Chama Groups</h1>
                <p className="text-gray-600 mt-1">Manage your chama memberships and activities</p>
              </div>
              <Link
                to="/chamas/create"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium"
              >
                Create New Chama
              </Link>
            </div>
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">You're not part of any chama group yet.</p>
              <p className="text-gray-400 mt-2">Create your first chama or join an existing one to get started.</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-2xl font-semibold text-gray-900">My Chama Groups</h1>
              <p className="text-gray-600 mt-1">Manage your chama memberships and activities</p>
            </div>
            <Link
              to="/chamas/create"
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-lg font-medium"
            >
              Create New Chama
            </Link>
          </div>

          {/* Search Bar */}
          <div className="mb-8">
            <input
              type="text"
              placeholder="Search chama groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Grid of Chamas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredChamas.map((chama) => (
              <div
                key={chama.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{chama.name}</h3>
                      <div className="flex items-center mt-1 space-x-2">
                        {chama.role && (
                          <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                            {chama.role}
                          </span>
                        )}
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800">
                          Active
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
                      </svg>
                      {chama.memberCount} members
                    </div>
                    <div className="flex items-center">
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a4 4 0 118 0v4m-4 8a2 2 0 100-4 2 2 0 000 4zm6 2a2 2 0 100-4 2 2 0 000 4zm-6 0a2 2 0 100-4 2 2 0 000 4z" />
                      </svg>
                      Joined: {chama.joinDate ? formatDate(chama.joinDate) : 'N/A'}
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">Total Savings</span>
                      <span className="text-lg font-semibold text-teal-600">
                        KES {Number(chama.totalSavings).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-gray-700">My Contribution</span>
                      <span className="text-sm font-medium text-gray-900">
                        KES {Number(chama.myContribution).toLocaleString()}
                      </span>
                    </div>
                  </div>

                  <Link
                    to={`/chamas/${chama.id}`}
                    className="block w-full text-center bg-white border border-teal-600 text-teal-600 hover:bg-teal-50 px-4 py-2 rounded-lg font-medium"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChamaGroupsPage;

