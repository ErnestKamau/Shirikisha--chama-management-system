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

  const value = {
    user,
    isAuthenticated,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}


const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return isAuthenticated ? children : <Navigate to="/login" />
}


const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth()
  return !isAuthenticated ? children : <Navigate to="/dashboard" />
}


const Dashboard = () => {
  const chamasData = [
    {
      id: 1,
      name: "Umoja Savings Group",
      members: 45,
      totalPool: 1200000,
      role: "Member",
      status: "Active",
    },
    {
      id: 2,
      name: "Harambee Investment Club",
      members: 28,
      totalPool: 800000,
      role: "Official",
      status: "Active",
    },
    {
      id: 3,
      name: "Women Empowerment Chama",
      members: 62,
      totalPool: 2100000,
      role: "Admin",
      status: "Active",
    },
  ]

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

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Navigate to="/login" />} />
            <Route
              path="/login"
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="/register"
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <Dashboard />
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/chamas"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <div className="text-center p-12">
                      <h2 className="text-2xl font-bold mb-4">My Chamas</h2>
                      <p className="text-muted-foreground">Chama management features coming soon...</p>
                    </div>
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/members"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <div className="text-center p-12">
                      <h2 className="text-2xl font-bold mb-4">Members</h2>
                      <p className="text-muted-foreground">Member management features coming soon...</p>
                    </div>
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/financial"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <div className="text-center p-12">
                      <h2 className="text-2xl font-bold mb-4">Financial</h2>
                      <p className="text-muted-foreground">Financial management features coming soon...</p>
                    </div>
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/loans"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <div className="text-center p-12">
                      <h2 className="text-2xl font-bold mb-4">Loans</h2>
                      <p className="text-muted-foreground">Loan management features coming soon...</p>
                    </div>
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/meetings"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <div className="text-center p-12">
                      <h2 className="text-2xl font-bold mb-4">Meetings</h2>
                      <p className="text-muted-foreground">Meeting management features coming soon...</p>
                    </div>
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
            <Route
              path="/settings"
              element={
                <ProtectedRoute>
                  <DashboardLayoutComponent>
                    <div className="text-center p-12">
                      <h2 className="text-2xl font-bold mb-4">Settings</h2>
                      <p className="text-muted-foreground">Settings features coming soon...</p>
                    </div>
                  </DashboardLayoutComponent>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App
