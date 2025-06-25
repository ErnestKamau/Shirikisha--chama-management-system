import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/features/Features';
import Cta from './components/CTA';
import Footer from './components/Footer';
import Login from './components/login';
import Register from './components/register';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { AppRoutes } from './routes/Routes';

function App() {

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }, [])

}

{
  return (
    <AuthProvider>
      <Router>
        <AppRoutes />
      </Router>
    </AuthProvider>
  );
}

export default App;
