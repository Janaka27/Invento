"use client"

import { useState, useEffect } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { LandingPage } from "@/components/landing-page"
import LoginPage from "@/components/login-page"
import { DashboardContent } from "@/components/dashboard-content"
import { AuthProvider as AuthContextProvider, useAuth } from "@/hooks/use-auth"

function AppContent() {
  const { user, login } = useAuth()
  const [appState, setAppState] = useState("landing")

  useEffect(() => {
    console.log("AppContent useEffect - user:", user)
    if (user) {
      console.log("User is authenticated, switching to dashboard")
      setAppState("dashboard")
    } else {
      // Check if we're coming from a logout or initial load
      const hasVisited = localStorage.getItem("invento-has-visited")
      if (!hasVisited) {
        console.log("First visit, showing landing page")
        setAppState("landing")
        localStorage.setItem("invento-has-visited", "true")
      } else {
        console.log("Returning visitor, showing landing page")
        setAppState("landing")
      }
    }
  }, [user])

  const handleNavigateToLogin = () => {
    console.log("Navigating to login")
    setAppState("login")
  }

  const handleNavigateToLanding = () => {
    console.log("Navigating to landing")
    setAppState("landing")
  }

  const handleLoginSuccess = (userData) => {
    console.log("Login successful, user data:", userData)
    login(userData)
    setAppState("dashboard")
  }

  console.log("Current app state:", appState)

  switch (appState) {
    case "landing":
      return <LandingPage onNavigateToLogin={handleNavigateToLogin} />
    case "login":
      return <LoginPage onLogin={handleLoginSuccess} onNavigateToLanding={handleNavigateToLanding} />
    case "dashboard":
      return <DashboardContent />
    default:
      return <LandingPage onNavigateToLogin={handleNavigateToLogin} />
  }
}

export function MainApp() {
  return (
    <ThemeProvider defaultTheme="system" storageKey="invento-ui-theme">
      <AuthContextProvider>
        <AppContent />
      </AuthContextProvider>
    </ThemeProvider>
  )
}
