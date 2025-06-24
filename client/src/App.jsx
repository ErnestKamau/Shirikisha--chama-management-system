import { useEffect, useState } from "react"
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/features/Features';
import CTA from './components/CTA';
import Footer from './components/Footer';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        setUsers(data.users)
      })
  }, [])

  return (
     <div className="bg-white font-sans">
            <Header />
            <main>
                <Hero />
                <Features />
                <CTA />
            </main>
            <Footer />
        </div>
    );
}

export default App
