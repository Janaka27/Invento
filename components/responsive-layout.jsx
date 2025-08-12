"use client"

import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

export function ResponsiveLayout({ children, navigation, className }) {
  const [isMobile, setIsMobile] = useState(false)
  const [isTablet, setIsTablet] = useState(false)

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024)
    }

    checkScreenSize()
    window.addEventListener("resize", checkScreenSize)
    return () => window.removeEventListener("resize", checkScreenSize)
  }, [])

  return (
    <div className={cn("min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100", className)}>
      <div className="flex h-screen overflow-hidden">
        {/* Navigation */}
        <div className={cn("flex-shrink-0 transition-all duration-300", isMobile ? "w-0" : isTablet ? "w-20" : "w-80")}>
          {navigation}
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-auto">
          <div className={cn("p-4", isMobile ? "pb-20" : "p-6")}>{children}</div>
        </div>
      </div>
    </div>
  )
}
