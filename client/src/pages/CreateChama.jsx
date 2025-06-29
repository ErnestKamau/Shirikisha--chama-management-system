import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from '../utils/axios';

const CreateChamaPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    chamaName: '',
    description: '',
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const payload = {
        name: formData.chamaName,
        description: formData.description,
      };

      const response = await axios.post('/group', payload);
      const groupId = response.data.group_id;

      navigate(`/chamas/${groupId}`); // ✅ Redirect to ChamaDetailPage
    } catch (error) {
      console.error(error);
      alert('Failed to create Chama. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 sm:p-10 font-sans">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-green-600 hover:underline mb-6"
        >
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
        </button>

        <div className="bg-white rounded-xl shadow p-8 border border-gray-100">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Create a New Chama</h1>
          <p className="text-gray-500 mb-6">Fill in the details to start your new chama group.</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="chamaName" className="block text-sm font-medium text-gray-700 mb-1">
                Chama Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="chamaName"
                name="chamaName"
                value={formData.chamaName}
                onChange={handleChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Enter Chama Name"
              />
            </div>

            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                placeholder="Briefly describe the purpose of your chama"
              />
            </div>

            <div>
              <button
                type="submit"
                disabled={isLoading}
                className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg ${
                  isLoading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isLoading ? 'Creating...' : 'Create Chama'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateChamaPage;

