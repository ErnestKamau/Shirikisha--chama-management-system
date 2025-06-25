import React from 'react';
import FeatureCard from './FeatureCard';
import { MemberIcon, FinancialIcon, SecureIcon, AnalyticsIcon } from './icons';

const Features = () => {
    const featuresData = [
        {
            icon: MemberIcon,
            title: "Member Management",
            description: "Add, manage, and assign roles to group members with ease.",
            colorClass: "bg-blue-500"
        },
        {
            icon: FinancialIcon,
            title: "Financial Tracking",
            description: "Track contributions, loans, and investment returns automatically.",
            colorClass: "bg-green-500"
        },
        {
            icon: SecureIcon,
            title: "Secure & Reliable",
            description: "Bank-level security with role-based access controls.",
            colorClass: "bg-purple-500"
        },
        {
            icon: AnalyticsIcon,
            title: "Analytics",
            description: "Detailed insights and reports to track group performance.",
            colorClass: "bg-orange-500"
        }
    ];

    return (
        <section className="bg-gray-50 py-20 px-4 sm:px-8">
            <div className="container mx-auto">
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900">
                        Everything you need to manage your Chama
                    </h2>
                    <p className="mt-4 text-lg text-gray-600">
                        Powerful features designed specifically for investment groups and savings circles.
                    </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {featuresData.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
