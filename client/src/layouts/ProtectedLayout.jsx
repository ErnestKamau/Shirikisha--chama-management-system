import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
// import Sidebar from '../components/Sidebar';

const ProtectedLayout = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="flex min-h-screen">
      {/* <Sidebar /> */}
      <div className="flex-1">
        <Outlet /> {/* This renders the child routes */}
      </div>
    </div>
  );
};

export default ProtectedLayout;