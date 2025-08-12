"use client"

import { Suspense } from "react"
import { MainApp } from "@/components/main-app"

function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <div className="text-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-slate-600">Loading Invento System...</p>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <MainApp />
    </Suspense>
  )
}
