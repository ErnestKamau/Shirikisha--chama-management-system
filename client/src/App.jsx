import React, { useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/features/Features';
import Cta from './components/CTA';
import Footer from './components/Footer';

function App() {

  useEffect(() => {
    fetch("/api/home")
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
      })
  }, [])

  return (
     <div className="bg-white font-sans">
            <Header />
            <main>
                <Hero />
                <Features />
                <Cta />
            </main>
            <Footer />
        </div>
    );
}

export default App
