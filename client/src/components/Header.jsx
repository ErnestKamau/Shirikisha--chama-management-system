import React from 'react';
import { useNavigate } from 'react-router-dom';


const Header = () => {
    const navigate = useNavigate();
    
    function handleSignIn() {
        navigate ('/login');
    }

    return (
        <header className="absolute top-0 left-0 right-0 z-10 py-6 px-4 sm:px-8 md:px-16 lg:px-24">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">Shirikisha</h1>
                <nav>
                    <button onClick={handleSignIn} className="bg-white/20 hover:bg-white/30 text-white font-semibold py-2 px-6 rounded-lg transition duration-300 backdrop-blur-sm" >
                        Sign In
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
