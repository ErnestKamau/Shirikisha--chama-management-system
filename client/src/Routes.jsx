import { Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
// import ProtectedLayout from './layouts/ProtectedLayout';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import DashBoard from './pages/DashBoard';
// import PrivateRoute from './components/PrivateRoute';
import ChamaGroupsPage from './pages/ChamaGroupsPage';
import ChamaDetailPage from './pages/ChamaDetailPage';


export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/chamas" element={<ChamaGroupsPage />} />
        <Route path="/chamas/:id" element={<ChamaDetailPage />} />
      </Route>


      {/* Protected Routes */}
      {/* <Route element={<ProtectedLayout />}>
        <Route
          path="/dashboard"
          element={
            <PrivateRoute allowedRoles={['chair', 'treasurer', 'member']}>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/chamas"
          element={
            <PrivateRoute allowedRoles={['chair', 'treasurer']}>
              <Chamas />
            </PrivateRoute>
          }
        />
      </Route> */}
    </Routes>
  );
};
