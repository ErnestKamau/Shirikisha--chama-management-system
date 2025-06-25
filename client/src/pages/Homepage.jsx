import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import Features from '../components/features/Features';
import Cta from '../components/CTA';
import Footer from '../components/Footer';

function Homepage() {
  return (
    <div className="homepage">
     <Header />
     <main >
       <Hero />
       <Features />
       <Cta />
     </main>
     <Footer />
    </div>
  );
};

export default Homepage;
