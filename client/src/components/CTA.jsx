import React from 'react';
import { useNavigate } from 'react-router-dom';

const CTA = () => {
    function handleSignUp() {
        window.location.href = '/register';
    }

    return (
        <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="container mx-auto text-center py-20 px-4">
                <h2 className="text-3xl sm:text-4xl font-extrabold">Ready to transform your Chama?</h2>
                <p className="mt-4 text-lg text-white/90 max-w-2xl mx-auto">
                    Join hundreds of groups already using our platform to manage their investments.
                </p>
                <div className="mt-8">

                    <button onClick={handleSignUp} className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
                        Sign Up and Start Your Free Trial
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CTA;
