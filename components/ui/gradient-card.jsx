import React from "react"
import { Card, CardContent, CardHeader, CardDescription, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export function GradientCard({
  children,
  className,
  title,
  description,
  icon,
  headerGradient = false,
  variant = "primary",
  intensity = "default",
  hover = false,
  ...props
}) {
  const gradientClasses = {
    primary: "from-blue-500 to-purple-600",
    success: "from-green-500 to-emerald-600",
    warning: "from-yellow-500 to-orange-600",
    error: "from-red-500 to-pink-600",
    neutral: "from-slate-500 to-gray-600",
  }

  const bgIntensityClasses = {
    default: "bg-white/80 backdrop-blur-sm",
    light: "bg-white/50 backdrop-blur-sm",
  }

  const headerBgClass = headerGradient ? `bg-gradient-to-r ${gradientClasses[variant]} text-white` : "bg-transparent"

  const hoverClass = hover ? "hover:shadow-xl hover:scale-[1.01] transition-all duration-300" : ""

  return (
    <Card
      className={cn("overflow-hidden border-0 shadow-lg", bgIntensityClasses[intensity], hoverClass, className)}
      {...props}
    >
      {(title || description || icon) && (
        <CardHeader className={cn("p-4 sm:p-6", headerBgClass)}>
          <div className="flex items-center space-x-3">
            {icon && (
              <div
                className={cn(
                  "p-2 rounded-lg",
                  headerGradient ? "bg-white/20" : `bg-gradient-to-r ${gradientClasses[variant]}`,
                )}
              >
                {React.cloneElement(icon, {
                  className: cn("h-5 w-5", headerGradient ? "text-white" : "text-white"),
                })}
              </div>
            )}
            <div>
              {title && (
                <CardTitle
                  className={cn(
                    "text-lg font-semibold",
                    headerGradient
                      ? "text-white"
                      : "bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent",
                  )}
                >
                  {title}
                </CardTitle>
              )}
              {description && (
                <CardDescription className={cn("text-sm", headerGradient ? "text-white/90" : "text-slate-600")}>
                  {description}
                </CardDescription>
              )}
            </div>
          </div>
        </CardHeader>
      )}
      <CardContent className={cn("p-4 sm:p-6", !(title || description || icon) && "pt-6")}>{children}</CardContent>
    </Card>
  )
}
