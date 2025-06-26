import { useEffect, useState } from 'react';
import axios from '../utils/axios';

const useUserChamas = () => {
  const [chamas, setChamas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChamas = async () => {
      try {
        const res = await axios.get('/api/user/chamagroups'); // match your backend route
        setChamas(res.data);
      } catch (err) {
        console.error('Failed to fetch chama groups:', err);
        setError('Unable to load chama groups');
      } finally {
        setLoading(false);
      }
    };

    fetchChamas();
  }, []);

  return { chamas, loading, error };
};

export default useUserChamas;
