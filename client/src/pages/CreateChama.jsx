import React, { useState } from 'react';
import { ArrowLeft, User, Calendar, CheckCircle } from 'lucide-react';
import axios from '../utils/axios';
import { useNavigate } from 'react-router-dom';

const CreateChamaPage = () => {
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        chamaName: '',
        description: '',
        maxMembers: ''
    });

    const handleNext = () => setStep(prev => prev + 1);
    const handleBack = () => setStep(prev => prev - 1);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await axios.post('/api/group', formData);
            alert('Chama created successfully!');
            navigate('/dashboard');
        } catch (err) {
            console.error(err);
            alert('Failed to create Chama. Please try again.');
        } finally {
            setIsLoading(false);
            navigate('/dashboard')
        }
        
    };

    const steps = [
        { id: 1, name: 'Basic Information', icon: User },
        { id: 2, name: 'Meeting Schedule', icon: Calendar },
        { id: 3, name: 'Review & Create', icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <main className="flex-1 p-4 sm:p-6 lg:p-8">
                <button
                    onClick={() => navigate('/dashboard')}
                    className="flex items-center text-green-600 hover:underline mb-6"
                >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                </button>

                <div className="max-w-4xl mx-auto">
                    <h1 className="text-3xl font-bold text-gray-800">Create New Chama</h1>
                    <p className="text-gray-500 mb-8">
                        Set up your chama group with custom rules and settings.
                    </p>

                    {/* Stepper */}
                    <div className="flex items-center justify-between mb-12">
                        {steps.map((s, index) => (
                            <React.Fragment key={s.id}>
                                <div className="flex flex-col items-center">
                                    <div
                                        className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                                            step >= s.id
                                                ? 'bg-green-600 border-green-600 text-white'
                                                : 'bg-white border-gray-300 text-gray-400'
                                        }`}
                                    >
                                        <s.icon className="w-6 h-6" />
                                    </div>
                                    <p
                                        className={`mt-2 text-sm text-center ${
                                            step >= s.id
                                                ? 'text-green-700 font-semibold'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {s.name}
                                    </p>
                                </div>
                                {index < steps.length - 1 && (
                                    <div
                                        className={`flex-1 h-1 mx-4 ${
                                            step > s.id ? 'bg-green-600' : 'bg-gray-300'
                                        }`}
                                    ></div>
                                )}
                            </React.Fragment>
                        ))}
                    </div>

                    {/* Form Content */}
                    <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                        {step === 1 && (
                            <BasicInfoStep formData={formData} handleChange={handleChange} />
                        )}
                        {step === 2 && <DummyStep title="Meeting Schedule" />}
                        {step === 3 && <DummyStep title="Review & Create" />}

                        {/* Navigation Buttons */}
                        <div className="flex justify-between mt-8">
                            {step > 1 ? (
                                <button
                                    onClick={handleBack}
                                    className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg"
                                >
                                    Back
                                </button>
                            ) : (
                                <div></div>
                            )}

                            {step < steps.length ? (
                                <button
                                    onClick={handleNext}
                                    className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg"
                                >
                                    Next
                                </button>
                            ) : (
                                <button
                                    onClick={handleSubmit}
                                    disabled={isLoading}
                                    className={`bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg ${
                                        isLoading ? 'opacity-50 cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isLoading ? 'Creating...' : 'Create Chama'}
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

const BasicInfoStep = ({ formData, handleChange }) => (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">Basic Information</h2>
        <div className="space-y-6">
            <FormInput
                label="Chama Name *"
                name="chamaName"
                value={formData.chamaName}
                onChange={handleChange}
                placeholder="Enter chama name"
            />
            <FormInput
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe the purpose and goals of your chama"
                isTextarea={true}
            />
            <FormInput
                label="Maximum Members"
                name="maxMembers"
                type="number"
                value={formData.maxMembers}
                onChange={handleChange}
                placeholder="Enter maximum number of members"
            />
        </div>
    </div>
);

const FormInput = ({ label, name, isTextarea = false, ...props }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        {isTextarea ? (
            <textarea
                id={name}
                name={name}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                {...props}
            ></textarea>
        ) : (
            <input
                id={name}
                name={name}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                {...props}
            />
        )}
    </div>
);

const DummyStep = ({ title }) => (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
        <p className="text-gray-500">This is a placeholder for the {title.toLowerCase()} step.</p>
    </div>
);

export default CreateChamaPage;
