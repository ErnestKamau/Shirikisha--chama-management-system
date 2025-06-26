import React, { useState } from 'react';
import { Home, Users, PlusCircle, Bell, User, BarChart, Clock, ChevronsRight, LogOut, ArrowUpRight, CircleUserRound, BadgePlus, Eye, Wallet, Calendar, CheckCircle, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';


// Mock data - actual data from your backend/context
const user = {
  name: 'levi',
  email: 'levi.muturi@student.moringaschool.com',
};

const summaryData = {
  totalContributions: 125000,
  activeChamas: 3,
  nextMeeting: {
    days: 2,
    group: 'Savings Circle',
  },
};

const recentActivity = [
  { id: 1, type: 'Contribution received', group: 'Savings Circle', amount: 5000, time: '2 hours ago' },
  { id: 2, type: 'Meeting scheduled', group: 'Investment Group', amount: null, time: '1 day ago' },
  { id: 3, type: 'Loan approved', group: 'Business Chama', amount: 15000, time: '3 days ago' },
];


const App = () => {
  // State to manage navigation. In a real app, you'd use a router.
  const [currentPage, setCurrentPage] = useState('dashboard');

  const navigate = (page) => setCurrentPage(page);

  const handleLogout = () => {
    console.log("User logged out.");
    // In a real app, you would clear auth tokens and redirect.
    navigate('login'); 
  };
  
  // A simple router-like component
  const Router = () => {
    switch(currentPage) {
      case 'dashboard':
        return <DashBoard navigate={navigate} handleLogout={handleLogout} />;
      case 'my-chamas':
        return <DummyPage title="My Chamas" navigate={navigate} />;
      case 'create-chama':
        return <CreateChamaPage navigate={navigate} />;
      case 'profile':
        return <DummyPage title="Profile" navigate={navigate} />;
      default:
        return <DashBoard navigate={navigate} handleLogout={handleLogout} />;
    }
  }

  return <Router />;
};


const DashBoard = ({ navigate, handleLogout }) => {
  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <div className="flex">
        <Sidebar navigate={navigate} currentPage="dashboard" />
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <Header user={user} handleLogout={handleLogout} navigate={navigate} />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user?.name}!</h1>
            <p className="text-gray-500">Here's what's happening with your chamas today.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            <SummaryCard 
              icon={<BarChart className="text-green-500" />} 
              title="Total Contributions" 
              value={`KES ${summaryData.totalContributions.toLocaleString()}`}
              change="+12.5%"
              changeColor="text-green-600"
            />
            <SummaryCard 
              icon={<Users className="text-blue-500" />} 
              title="Active Chamas" 
              value={summaryData.activeChamas}
              change="+1 this month"
              changeColor="text-blue-600"
            />
            <SummaryCard 
              icon={<Clock className="text-purple-500" />} 
              title="Next Meeting" 
              value={`${summaryData.nextMeeting.days} days`}
              change={summaryData.nextMeeting.group}
              changeColor="text-purple-600"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <QuickActions navigate={navigate} />
            </div>
            <div className="lg:col-span-2">
              <RecentActivity />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

// ##### NEW: Create Chama Page #####
const CreateChamaPage = ({ navigate }) => {
    const [step, setStep] = useState(1);
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

    const steps = [
        { id: 1, name: 'Basic Information', icon: User },
        { id: 2, name: 'Meeting Schedule', icon: Calendar },
        { id: 3, name: 'Review & Create', icon: CheckCircle }
    ];

    return (
        <div className="min-h-screen bg-gray-50 font-sans">
            <div className="flex">
               
                <main className="flex-1 p-4 sm:p-6 lg:p-8">
                    <Header user={user} handleLogout={() => {}} navigate={navigate} />
                    
                    <button onClick={() => navigate('dashboard')} className="flex items-center text-green-600 hover:underline mb-6">
                        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
                    </button>
                    
                    <div className="max-w-4xl mx-auto">
                        <h1 className="text-3xl font-bold text-gray-800">Create New Chama</h1>
                        <p className="text-gray-500 mb-8">Set up your chama group with custom rules and settings.</p>

                        {/* Stepper */}
                        <div className="flex items-center justify-between mb-12">
                            {steps.map((s, index) => (
                                <React.Fragment key={s.id}>
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${step >= s.id ? 'bg-green-600 border-green-600 text-white' : 'bg-white border-gray-300 text-gray-400'}`}>
                                            <s.icon className="w-6 h-6" />
                                        </div>
                                        <p className={`mt-2 text-sm text-center ${step >= s.id ? 'text-green-700 font-semibold' : 'text-gray-500'}`}>{s.name}</p>
                                    </div>
                                    {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 ${step > s.id ? 'bg-green-600' : 'bg-gray-300'}`}></div>}
                                </React.Fragment>
                            ))}
                        </div>
                        
                        {/* Form Content */}
                        <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
                            {step === 1 && <BasicInfoStep formData={formData} handleChange={handleChange} />}
                            {step === 2 && <DummyStep title="Meeting Schedule" />}
                            {step === 3 && <DummyStep title="Review & Create" />}

                            {/* Navigation Buttons */}
                            <div className="flex justify-between mt-8">
                                {step > 1 ? (
                                    <button onClick={handleBack} className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-6 rounded-lg">
                                        Back
                                    </button>
                                ) : <div></div>}
                                
                                {step < steps.length ? (
                                    <button onClick={handleNext} className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">
                                        Next
                                    </button>
                                ) : (
                                    <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-6 rounded-lg">
                                        Create Chama
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
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
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {isTextarea ? (
             <textarea id={name} name={name} rows="4" className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" {...props}></textarea>
        ) : (
            <input id={name} name={name} className="w-full p-3 border border-gray-300 rounded-lg focus:ring-green-500 focus:border-green-500" {...props} />
        )}
    </div>
);

const DummyStep = ({ title }) => (
    <div>
        <h2 className="text-xl font-bold text-gray-800 mb-6">{title}</h2>
        <p className="text-gray-500">This is a placeholder for the {title.toLowerCase()} step.</p>
    </div>
);


// ##### Existing Components (Slightly modified) #####

const Sidebar = ({ navigate, currentPage }) => (
  <aside className="w-64 bg-white p-6 hidden lg:flex flex-col border-r">
    <div className="text-2xl font-bold text-gray-800 mb-12">ChamaFlow</div>
    <nav className="flex flex-col space-y-2">
      <SidebarLink icon={<Home />} text="Dashboard" active={currentPage === 'dashboard'} onClick={() => navigate('dashboard')} />
      <SidebarLink icon={<Users />} text="My Chamas" active={currentPage === 'my-chamas'} onClick={() => navigate('my-chamas')} />
      <SidebarLink icon={<PlusCircle />} text="Create Chama" active={currentPage === 'create-chama'} onClick={() => navigate('create-chama')} />
    </nav>
    <div className="mt-auto">
       <SidebarLink icon={<CircleUserRound />} text="Profile" active={currentPage === 'profile'} onClick={() => navigate('profile')} />
    </div>
  </aside>
);

const SidebarLink = ({ icon, text, active = false, onClick }) => (
  <a href="#" onClick={e => { e.preventDefault(); onClick(); }}
     className={`flex items-center py-3 px-4 rounded-lg transition-colors text-gray-700 hover:bg-green-50 hover:text-green-600 ${active ? 'bg-green-100 text-green-700 font-semibold' : ''}`}>
    {React.cloneElement(icon, { className: 'w-5 h-5 mr-3' })}
    <span>{text}</span>
  </a>
);

const Header = ({ user, handleLogout, navigate }) => (
  <header className="flex justify-between items-center mb-8">
    <div></div>
    <div className="flex items-center space-x-4">
      <button className="relative p-2 rounded-full hover:bg-gray-200">
        <Bell className="w-6 h-6 text-gray-600" />
        <span className="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
      </button>
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">
          {user.name.charAt(0)}
        </div>
        <span className="hidden sm:inline font-semibold text-gray-700">{user.name}</span>
      </div>
       <button onClick={handleLogout} className="flex items-center text-red-500 hover:underline">
         <LogOut className="w-5 h-5 mr-1" />
         <span className="hidden sm:inline">Logout</span>
       </button>
    </div>
  </header>
);

const SummaryCard = ({ icon, title, value, change, changeColor }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex justify-between items-start">
    <div>
      <p className="text-sm text-gray-500 mb-1">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      <div className={`text-sm font-medium mt-2 flex items-center ${changeColor}`}>
        {change}
      </div>
    </div>
    <div className="bg-gray-100 rounded-full p-3">
      {icon}
    </div>
  </div>
);

const QuickActions = ({ navigate }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 h-full">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Quick Actions</h2>
    <div className="space-y-4">
      <ActionButton
        icon={<BadgePlus className="text-white"/>}
        text="Create New Chama"
        onClick={() => navigate('create-chama')}
        className="bg-green-600 hover:bg-green-700 text-white"
      />
      <ActionButton
        icon={<Eye className="text-gray-600"/>}
        text="View My Chamas"
        onClick={() => navigate('my-chamas')}
        className="bg-gray-100 hover:bg-gray-200 text-gray-800"
      />
    </div>
  </div>
);

const ActionButton = ({ icon, text, onClick, className }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center justify-center text-left p-4 rounded-lg font-semibold transition-colors ${className}`}
    >
        {icon && <span className="mr-3">{icon}</span>}
        {text}
    </button>
);


const RecentActivity = () => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
    <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Activity</h2>
    <ul className="space-y-4">
      {recentActivity.map(activity => (
        <li key={activity.id} className="flex items-center justify-between">
          <div>
            <p className="font-semibold text-gray-700">{activity.type}</p>
            <p className="text-sm text-gray-500">{activity.group}</p>
          </div>
          <div className="text-right">
            {activity.amount && <p className="font-bold text-green-600">KES {activity.amount.toLocaleString()}</p>}
            <p className="text-sm text-gray-400">{activity.time}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
);

const DummyPage = ({ title, navigate }) => (
  <div className="min-h-screen bg-gray-50 p-8">
     <button onClick={() => navigate('dashboard')} className="flex items-center text-green-600 hover:underline mb-4">
        <ArrowLeft className="w-4 h-4 mr-2" /> Back to Dashboard
      </button>
    <h1 className="text-4xl font-bold">{title}</h1>
    <p className="mt-2 text-gray-600">This is a placeholder page for {title}.</p>
  </div>
);

export default App;
