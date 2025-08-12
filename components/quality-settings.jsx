"use client"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Settings, Zap, Gauge, Cpu } from "lucide-react"

export function QualitySettings({ currentMode, onModeChange }) {
  const qualityModes = [
    {
      id: "high",
      name: "High Performance",
      description: "Full animations and effects",
      icon: Zap,
      color: "text-green-600",
    },
    {
      id: "medium",
      name: "Balanced",
      description: "Reduced animations",
      icon: Gauge,
      color: "text-yellow-600",
    },
    {
      id: "low",
      name: "Performance",
      description: "Minimal effects",
      icon: Cpu,
      color: "text-blue-600",
    },
  ]

  const currentModeData = qualityModes.find((mode) => mode.id === currentMode)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="flex items-center space-x-2 bg-transparent">
          <Settings className="h-4 w-4" />
          <span>Quality</span>
          <Badge variant="secondary" className="ml-1">
            {currentModeData?.name.split(" ")[0]}
          </Badge>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64">
        <div className="p-3 border-b">
          <h3 className="font-medium">Performance Settings</h3>
          <p className="text-sm text-slate-600">Adjust based on your device capabilities</p>
        </div>

        {qualityModes.map((mode) => (
          <DropdownMenuItem key={mode.id} onClick={() => onModeChange(mode.id)} className="p-3 cursor-pointer">
            <div className="flex items-center space-x-3 w-full">
              <mode.icon className={`h-5 w-5 ${mode.color}`} />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{mode.name}</span>
                  {currentMode === mode.id && (
                    <Badge variant="secondary" className="ml-2">
                      Active
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-slate-600">{mode.description}</p>
              </div>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
