"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
// import { useAuth } from "./App"

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [loginMethod, setLoginMethod] = useState("phone")
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    phone: "",
    email: "",
    password: "",
  })

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const userData = {
      id: 1,
      name: "John Doe",
      email: formData.email || "john@example.com",
      phone: formData.phone || "+254700000000",
      role: "Member",
    }

    login(userData)
    setIsLoading(false)
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Chama Manager</h1>
          <p className="text-gray-600">Manage your chama with ease</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-2xl">Welcome Back</h2>
            <p className="card-description">Sign in to your chama account</p>
          </div>

          <div className="card-content">
            {/* Login Method Tabs */}
            <div className="flex mb-4 bg-muted rounded-lg p-1">
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === "phone"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setLoginMethod("phone")}
              >
                📱 Phone
              </button>
              <button
                type="button"
                className={`flex-1 flex items-center justify-center gap-2 py-2 px-3 rounded-md text-sm font-medium transition-colors ${
                  loginMethod === "email"
                    ? "bg-background text-foreground shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                }`}
                onClick={() => setLoginMethod("email")}
              >
                ✉️ Email
              </button>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginMethod === "phone" ? (
                <div className="space-y-2">
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="input"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="input"
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="input pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    tabIndex={-1}
                  >
                    {showPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <input
                    id="remember"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    disabled={isLoading}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <label htmlFor="remember" className="text-sm">
                    Remember me
                  </label>
                </div>
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Forgot password?
                </Link>
              </div>

              <button type="submit" disabled={isLoading} className="btn btn-primary btn-md w-full">
                {isLoading ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          <div className="card-footer flex justify-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link to="/register" className="text-blue-600 hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
