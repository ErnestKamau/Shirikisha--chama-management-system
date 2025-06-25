"use client"

import React, { useState, createContext, useContext } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from "./components/login"
import Register from "./components/register"




const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}


const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const login = (userData) => {
    setUser(userData)
    setIsAuthenticated(true)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("user")
  }

 
  React.useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      setIsAuthenticated(true)
    }
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your chamas.</p>
        </div>
        <button className="btn btn-primary btn-md"> Create New Chama</button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Members</p>
                <p className="text-2xl font-bold">1,234</p>
                <p className="text-xs text-muted-foreground">+20.1% from last month</p>
              </div>
              <span className="text-2xl">👥</span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Contributions</p>
                <p className="text-2xl font-bold">KES 2.4M</p>
                <p className="text-xs text-muted-foreground">+15.2% from last month</p>
              </div>
              <span className="text-2xl"></span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Loans</p>
                <p className="text-2xl font-bold">45</p>
                <p className="text-xs text-muted-foreground">KES 890K outstanding</p>
              </div>
              <span className="text-2xl"></span>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-content pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Monthly Growth</p>
                <p className="text-2xl font-bold">+12.5%</p>
                <p className="text-xs text-muted-foreground">Compared to last month</p>
              </div>
              <span className="text-2xl">📈</span>
            </div>
          </div>
        </div>
      </div>

      {/* My Chamas */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">My Chama Groups</h3>
          <p className="card-description">Chama groups you're a member of</p>
        </div>
        <div className="card-content">
          <div className="space-y-4">
            {chamasData.map((chama) => (
              <div key={chama.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600"></span>
                  </div>
                  <div>
                    <h4 className="font-semibold">{chama.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {chama.members} members • KES {(chama.totalPool / 1000).toFixed(0)}K pool
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`badge ${
                      chama.role === "Admin"
                        ? "badge-default"
                        : chama.role === "Official"
                          ? "badge-secondary"
                          : "badge-outline"
                    }`}
                  >
                    {chama.role}
                  </span>
                  <button className="btn btn-ghost btn-sm">→</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <div className="card-header">
          <h3 className="card-title">Quick Actions</h3>
          <p className="card-description">Common tasks you can perform</p>
        </div>
        <div className="card-content">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <button className="btn btn-outline h-20 flex-col gap-2">
              <span className="text-2xl"></span>
              Add Member
            </button>
            <button className="btn btn-outline h-20 flex-col gap-2">
              <span className="text-2xl">💰</span>
              Record Contribution
            </button>
            <button className="btn btn-outline h-20 flex-col gap-2">
              <span className="text-2xl">📅</span>
              Schedule Meeting
            </button>
            <button className="btn btn-outline h-20 flex-col gap-2">
              <span className="text-2xl">💳</span>
              Process Loan
            </button>
          </div>
        </div>
      </div>
    </div>
  )
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
