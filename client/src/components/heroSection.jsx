import React from 'react';

// Hero Section Component
const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center px-4 md:px-8 bg-gradient-to-r from-purple-600 to-indigo-600">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-indigo-600 opacity-90"></div>
      <div className="relative z-10 text-white p-6 rounded-lg max-w-3xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Chama Sync
        </h1>
        <h2 className="text-3xl md:text-5xl font-semibold mb-6">
          Management System
        </h2>
        <p className="text-lg md:text-xl mb-8 leading-relaxed">
          Streamline your investment group operations with our comprehensive platform. Manage members, track contributions, and grow together.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75">
            Get Started Free
          </button>
          <button className="bg-white text-gray-800 font-semibold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-75">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
