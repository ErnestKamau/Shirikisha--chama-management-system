import { Outlet, useLocation } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const PublicLayout = () => {
  const { pathname } = useLocation();

  // Show header ONLY on homepage
  const showHeader = pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}

      <main className="flex-grow">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default PublicLayout;

