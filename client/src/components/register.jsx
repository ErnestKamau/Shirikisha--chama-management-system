"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"


const Register = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const { login } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRegister = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!")
      return
    }

    setIsLoading(true)

  
    await new Promise((resolve) => setTimeout(resolve, 1000))

   
    const userData = {
      id: 1,
      name: formData.fullname,
      email: formData.email,
      phone: formData.phone,
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
          <p className="text-gray-600">Create your account to get started</p>
        </div>

        <div className="card">
          <div className="card-header">
            <h2 className="card-title text-2xl">Create Account</h2>
            <p className="card-description">Join your chama community today</p>
          </div>

          <div className="card-content">
            <form onSubmit={handleRegister} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="fullname" className="label">
                  Full Name
                </label>
                <input
                  id="fullname"
                  name="fullname"
                  type="text"
                  placeholder="John Doe"
                  value={formData.fullname}
                  onChange={handleInputChange}
                  required
                  disabled={isLoading}
                  className="input"
                />
              </div>

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

              <div className="space-y-2">
                <label htmlFor="password" className="label">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
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

              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="label">
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                    required
                    disabled={isLoading}
                    className="input pr-10"
                  />
                  <button
                    type="button"
                    className="absolute right-0 top-0 h-10 w-10 flex items-center justify-center text-muted-foreground hover:text-foreground"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    tabIndex={-1}
                  >
                    {showConfirmPassword ? "🙈" : "👁️"}
                  </button>
                </div>
              </div>

              <button type="submit" disabled={isLoading} className="btn btn-primary btn-md w-full">
                {isLoading ? "Creating Account..." : "Create Account"}
              </button>
            </form>
          </div>

          <div className="card-footer flex justify-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-600 hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
