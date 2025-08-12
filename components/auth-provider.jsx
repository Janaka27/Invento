"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Package, Mail, Lock, UserIcon, Building, Shield, AlertCircle, CheckCircle, Eye, EyeOff } from "lucide-react"
import { motion } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientCard } from "@/components/ui/gradient-card"

const DEMO_USERS = [
  {
    id: "1",
    name: "John Admin",
    email: "admin@invento.com",
    role: "admin",
    permissions: ["*"], // All permissions
    warehouses: ["*"], // All warehouses
    department: "IT Administration",
    lastLogin: "2024-01-20T10:30:00Z",
  },
  {
    id: "2",
    name: "Sarah Manager",
    email: "manager@invento.com",
    role: "manager",
    permissions: [
      "inventory.read",
      "inventory.write",
      "products.read",
      "products.write",
      "sales.read",
      "sales.write",
      "reports.read",
      "customers.read",
      "customers.write",
      "transfers.read",
      "transfers.write",
      "warehouses.read",
      "analytics.read",
    ],
    warehouses: ["main", "branch-1", "branch-2"],
    department: "Operations",
    lastLogin: "2024-01-20T09:15:00Z",
  },
  {
    id: "3",
    name: "Mike Staff",
    email: "staff@invento.com",
    role: "staff",
    permissions: ["inventory.read", "inventory.write", "products.read", "sales.read", "sales.write", "transfers.read"],
    warehouses: ["main"],
    department: "Warehouse Operations",
    lastLogin: "2024-01-20T08:45:00Z",
  },
  {
    id: "4",
    name: "Lisa Viewer",
    email: "viewer@invento.com",
    role: "viewer",
    permissions: ["inventory.read", "products.read", "reports.read"],
    warehouses: ["main", "branch-1"],
    department: "Analytics",
    lastLogin: "2024-01-19T16:20:00Z",
  },
]

const ROLE_DESCRIPTIONS = {
  admin: {
    title: "System Administrator",
    description: "Full system access with all permissions",
    color: "from-red-500 to-pink-600",
    features: ["Complete system control", "User management", "System configuration", "All warehouse access"],
  },
  manager: {
    title: "Operations Manager",
    description: "Comprehensive business operations access",
    color: "from-blue-500 to-cyan-600",
    features: ["Inventory management", "Sales operations", "Customer management", "Multi-warehouse access"],
  },
  staff: {
    title: "Warehouse Staff",
    description: "Day-to-day operational tasks",
    color: "from-green-500 to-emerald-600",
    features: ["Stock management", "Order processing", "Basic reporting", "Assigned warehouse access"],
  },
  viewer: {
    title: "Read-Only Access",
    description: "View-only access for reporting and analysis",
    color: "from-purple-500 to-indigo-600",
    features: ["View inventory", "Access reports", "Product information", "Limited warehouse access"],
  },
}

export function AuthProvider({ onLogin }) {
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState("login")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    company: "",
    department: "",
  })

  const handleLogin = async (e) => {
    e.preventDefault()
    console.log("Login form submitted", { email: formData.email, password: formData.password })

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      // Validate form data
      if (!formData.email || !formData.password) {
        throw new Error("Please fill in all required fields")
      }

      if (formData.password.length < 3) {
        throw new Error("Password must be at least 3 characters")
      }

      // Find user by email
      const user = DEMO_USERS.find((u) => u.email.toLowerCase() === formData.email.toLowerCase())

      if (!user) {
        throw new Error("Invalid email or password")
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update last login
      const updatedUser = {
        ...user,
        lastLogin: new Date().toISOString(),
      }

      setSuccess(`Welcome back, ${user.name}!`)

      // Call onLogin after a brief delay to show success message
      setTimeout(() => {
        console.log("Calling onLogin with user:", updatedUser)
        onLogin(updatedUser)
      }, 1000)
    } catch (err) {
      console.error("Login error:", err)
      setError(err instanceof Error ? err.message : "Login failed")
    } finally {
      setIsLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    console.log("Register form submitted", formData)

    setIsLoading(true)
    setError("")
    setSuccess("")

    try {
      if (!formData.name || !formData.email || !formData.password) {
        throw new Error("Please fill in all required fields")
      }

      if (formData.password.length < 6) {
        throw new Error("Password must be at least 6 characters")
      }

      // Check if user already exists
      if (DEMO_USERS.find((u) => u.email.toLowerCase() === formData.email.toLowerCase())) {
        throw new Error("User with this email already exists")
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // Create new user with staff role by default
      const newUser = {
        id: Date.now().toString(),
        name: formData.name,
        email: formData.email,
        role: "staff",
        permissions: ["inventory.read", "inventory.write", "products.read", "sales.read"],
        warehouses: ["main"],
        department: formData.department || "General",
        lastLogin: new Date().toISOString(),
      }

      setSuccess("Account created successfully! You can now sign in.")
      setActiveTab("login")
      setFormData({ ...formData, email: newUser.email, password: "" })
    } catch (err) {
      console.error("Registration error:", err)
      setError(err instanceof Error ? err.message : "Registration failed")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - Branding & Info */}
        <div className="space-y-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Package className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Invento
                </h1>
                <p className="text-slate-600">Advanced Inventory Management</p>
              </div>
            </div>

            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-slate-900">Welcome to the Future of Inventory Management</h2>
              <p className="text-lg text-slate-600">
                Experience powerful inventory control with role-based access, multi-warehouse support, and real-time
                analytics.
              </p>

              {/* Role Information Cards */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-slate-900">Explore User Roles</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {Object.entries(ROLE_DESCRIPTIONS).map(([role, info]) => (
                    <GradientCard key={role} hover className="p-4">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <div className={`p-1 rounded bg-gradient-to-r ${info.color}`}>
                            <Shield className="h-4 w-4 text-white" />
                          </div>
                          <h4 className="font-semibold text-slate-900">{info.title}</h4>
                        </div>
                        <p className="text-sm text-slate-600">{info.description}</p>
                        <div className="space-y-1">
                          {info.features.map((feature, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <CheckCircle className="h-3 w-3 text-green-600" />
                              <span className="text-xs text-slate-600">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </GradientCard>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Right Side - Authentication Forms */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader className="text-center pb-2">
              <CardTitle className="text-2xl">Access Your Account</CardTitle>
              <CardDescription>Sign in to manage your inventory system</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <Alert className="mb-4 border-red-200 bg-red-50">
                  <AlertCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription className="text-red-700">{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="mb-4 border-green-200 bg-green-50">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <AlertDescription className="text-green-700">{success}</AlertDescription>
                </Alert>
              )}

              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="login">Sign In</TabsTrigger>
                  <TabsTrigger value="register">Sign Up</TabsTrigger>
                </TabsList>

                <TabsContent value="login" className="space-y-6">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <GradientButton
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !formData.email || !formData.password}
                      variant="primary"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Signing in...</span>
                        </div>
                      ) : (
                        "Sign In"
                      )}
                    </GradientButton>
                  </form>

                  {/* Information about roles */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h4 className="font-semibold text-blue-900 mb-2">🎯 Test Role-Based Access</h4>
                    <p className="text-sm text-blue-800 mb-2">
                      You can sign in with the following demo emails to explore different roles:
                    </p>
                    <ul className="text-xs text-blue-700 space-y-1">
                      <li>
                        • <strong>admin@invento.com:</strong> Full access to all modules and settings
                      </li>
                      <li>
                        • <strong>manager@invento.com:</strong> Operations access with multi-warehouse control
                      </li>
                      <li>
                        • <strong>staff@invento.com:</strong> Limited to daily operations and basic functions
                      </li>
                      <li>
                        • <strong>viewer@invento.com:</strong> Read-only access for reporting and analysis
                      </li>
                    </ul>
                    <p className="text-xs text-blue-700 mt-2">
                      For demo accounts, any password (3+ characters) will work.
                    </p>
                  </div>
                </TabsContent>

                <TabsContent value="register" className="space-y-6">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Enter your full name"
                          className="pl-10"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="company">Company</Label>
                      <div className="relative">
                        <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="company"
                          type="text"
                          placeholder="Enter your company name"
                          className="pl-10"
                          value={formData.company}
                          onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="department">Department</Label>
                      <Input
                        id="department"
                        type="text"
                        placeholder="e.g., Operations, IT, Sales"
                        value={formData.department}
                        onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email Address</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="register-email"
                          type="email"
                          placeholder="Enter your email"
                          className="pl-10"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Password</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                        <Input
                          id="register-password"
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a password (min 6 characters)"
                          className="pl-10 pr-10"
                          value={formData.password}
                          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          required
                          disabled={isLoading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                          disabled={isLoading}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    <GradientButton
                      type="submit"
                      className="w-full"
                      disabled={isLoading || !formData.name || !formData.email || !formData.password}
                      variant="success"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                          <span>Creating account...</span>
                        </div>
                      ) : (
                        "Create Account"
                      )}
                    </GradientButton>
                  </form>

                  <div className="text-center">
                    <p className="text-sm text-slate-600">
                      New accounts are created with Staff role by default.
                      <br />
                      Contact your administrator for role upgrades.
                    </p>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
