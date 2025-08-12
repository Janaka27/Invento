import React from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function GradientButton({ children, className, variant = "primary", icon, loading = false, ...props }) {
  const gradientClasses = {
    primary: "from-blue-500 to-purple-600",
    success: "from-green-500 to-emerald-600",
    warning: "from-yellow-500 to-orange-600",
    error: "from-red-500 to-pink-600",
    neutral: "from-slate-500 to-gray-600",
  }

  const baseClasses = `bg-gradient-to-r ${gradientClasses[variant]} text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]`
  const disabledClasses = "opacity-50 cursor-not-allowed"

  return (
    <Button
      className={cn(baseClasses, loading && disabledClasses, className)}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center space-x-2">
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          <span>Loading...</span>
        </div>
      ) : (
        <>
          {icon && React.cloneElement(icon, { className: cn("h-4 w-4", children && "mr-2") })}
          {children}
        </>
      )}
    </Button>
  )
}
