"use client"

import { AuthProvider } from "@/components/auth-provider"

export default function LoginPage({ onLogin, onNavigateToLanding }) {
  return <AuthProvider onLogin={onLogin} onNavigateToLanding={onNavigateToLanding} />
}
