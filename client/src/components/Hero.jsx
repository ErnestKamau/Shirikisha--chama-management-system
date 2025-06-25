import React from 'react';

const Hero = () => {
    function handleSignIn() {
        window.location.href = '/login';
    }

    function handleSignUp() {
        window.location.href = '/register';
    }


    return (
        <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white min-h-[60vh] sm:min-h-[70vh] flex items-center justify-center text-center py-20 px-4">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-purple-700 via-blue-600 to-indigo-800 opacity-50"></div>
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-white/10 rounded-full filter blur-2xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full filter blur-3xl"></div>

            <div className="relative z-10 max-w-3xl mx-auto">
                <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight">
                    Shirikisha<br /> Chama Management System
                </h2>
                <p className="mt-6 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
                    Streamline your investment group operations with our comprehensive platform.
                </p>
                <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                    <button onClick={handleSignUp} className="w-full sm:w-auto bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        Sign Up to Get Started Free
                    </button>
                    <button onClick={handleSignIn} className="w-full sm:w-auto bg-white/20 hover:bg-white/30 text-white font-semibold py-3 px-8 rounded-lg transition duration-300 backdrop-blur-sm">
                        Sign In
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Hero;
