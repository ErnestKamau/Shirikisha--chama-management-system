import { useAuth } from '../context/AuthContext';

const SomeComponent = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  
  // Use these values/functions as needed
  return (
    <div>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <button onClick={() => login({ id: 1, name: 'John' }, 'some-token')}>
          Login
        </button>
      )}
    </div>
  );
};