import React from 'react';

const FeatureCard = ({ icon, title, description, colorClass }) => {
    const Icon = icon;
    return (
        <div className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col">
            <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${colorClass}`}>
                <Icon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mt-4">{title}</h3>
            <p className="text-gray-600 mt-2 flex-grow">{description}</p>
        </div>
    );
};

export default FeatureCard;
