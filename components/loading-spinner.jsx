import { Package } from "lucide-react"

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center space-y-4">
        <div className="relative">
          <Package className="h-12 w-12 text-blue-600 mx-auto animate-pulse" />
          <div className="absolute inset-0 animate-spin">
            <div className="h-12 w-12 border-2 border-blue-200 border-t-blue-600 rounded-full"></div>
          </div>
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">Loading Invento</h2>
          <p className="text-slate-600">Initializing your inventory management system...</p>
        </div>
      </div>
    </div>
  )
}
