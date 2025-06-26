import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../utils/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    email: '',
    full_name: '',
    phone: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);


try {
  await axios.post('/api/register', formData);
  alert('Registration successful! Please log in.');
  navigate('/login');
} catch (err) {
  console.error(err);
  alert('Registration failed. Please try again.');
} finally {
  setIsLoading(false);
}

  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="w-full max-w-md bg-white rounded-lg shadow p-6">
        <h1 className="text-2xl font-bold text-center mb-4">Create Your Account</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="full_name" className="block text-sm font-medium">Full Name</label>
            <input
              type="text"
              name="full_name"
              id="full_name"
              required
              value={formData.full_name}
              onChange={handleInputChange}
               autoComplete='name'
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>


      <div>
        <label htmlFor="phone" className="block text-sm font-medium">Phone</label>
        <input
          type="tel"
          name="phone"
          id="phone"
          required
          value={formData.phone}
          onChange={handleInputChange}
           autoComplete='tel'
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          required
          value={formData.email}
          autoComplete='email'
          onChange={handleInputChange}
           autoComplete='email'
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <div>
        <label htmlFor="password" className="block text-sm font-medium">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          required
          value={formData.password}
          onChange={handleInputChange}
           autoComplete='off'
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
      >
        {isLoading ? 'Registering...' : 'Sign Up'}
      </button>
    </form>

    <p className="text-sm text-center mt-4">
      Already have an account?{' '}
      <Link to="/login" className="text-blue-600 hover:underline">Login</Link>
    </p>
  </div>
</div>
  );
};

export default Register;

