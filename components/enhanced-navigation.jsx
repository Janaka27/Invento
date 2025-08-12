"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Package,
  Warehouse,
  BarChart3,
  ShoppingCart,
  Settings,
  Users,
  FileText,
  CreditCard,
  Menu,
  X,
  Lock,
  TrendingUp,
  ShoppingBag,
  Factory,
  UserCircle,
  LayoutDashboard,
} from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { textGradients } from "@/lib/theme/colors"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export function EnhancedNavigation({ activeTab, onTabChange }) {
  const { user, hasPermission, logout } = useAuth()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const navigationItems = [
    {
      id: "dashboard",
      label: "Dashboard",
      icon: LayoutDashboard,
      gradient: "from-blue-500 to-purple-600",
      description: "Overview and key metrics",
      requiredPermission: "*",
    },
    {
      id: "inventory",
      label: "Inventory",
      icon: Package,
      gradient: "from-cyan-500 to-blue-600",
      description: "Stock management",
      requiredPermission: "inventory.read",
    },
    {
      id: "products",
      label: "Products",
      icon: Package,
      gradient: "from-green-500 to-teal-600",
      description: "Product catalog",
      requiredPermission: "products.read",
    },
    {
      id: "sales",
      label: "Sales & POS",
      icon: ShoppingCart,
      gradient: "from-emerald-500 to-green-600",
      description: "Point of sale",
      requiredPermission: "sales.read",
    },
    {
      id: "sales-orders",
      label: "Sales Orders",
      icon: ShoppingCart,
      gradient: "from-pink-500 to-rose-600",
      description: "Customer orders",
      requiredPermission: "sales.read",
    },
    {
      id: "purchase-orders",
      label: "Purchase Orders",
      icon: ShoppingBag,
      gradient: "from-orange-500 to-red-500",
      description: "Supplier orders",
      requiredPermission: "purchase.read",
    },
    {
      id: "transfers",
      label: "Stock Transfers",
      icon: Warehouse,
      gradient: "from-yellow-500 to-orange-600",
      description: "Internal stock movement",
      requiredPermission: "transfers.read",
    },
    {
      id: "warehouses",
      label: "Warehouses",
      icon: Factory,
      gradient: "from-indigo-500 to-blue-600",
      description: "Warehouse management",
      requiredPermission: "warehouses.read",
    },
    {
      id: "analytics",
      label: "Analytics",
      icon: BarChart3,
      gradient: "from-purple-500 to-pink-600",
      description: "Business insights",
      requiredPermission: "analytics.read",
    },
    {
      id: "reports",
      label: "Reports",
      icon: FileText,
      gradient: "from-indigo-500 to-purple-600",
      description: "Generate reports",
      requiredPermission: "reports.read",
    },
    {
      id: "customers",
      label: "Customers",
      icon: Users,
      gradient: "from-pink-500 to-rose-600",
      description: "Customer management",
      requiredPermission: "customers.read",
    },
    {
      id: "billing",
      label: "Billing",
      icon: CreditCard,
      gradient: "from-yellow-500 to-orange-600",
      description: "Invoices and payments",
      requiredPermission: "billing.read",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      gradient: "from-slate-500 to-gray-600",
      description: "System configuration",
      requiredPermission: "settings.read",
    },
    {
      id: "system-admin",
      label: "System Admin",
      icon: UserCircle,
      gradient: "from-red-500 to-pink-600",
      description: "User & role management",
      requiredPermission: "admin.read",
    },
  ]

  // Filter navigation items based on user permissions
  const availableNavItems = navigationItems.filter((item) => {
    if (!user) return false
    if (item.requiredPermission === "*") return true
    return hasPermission(item.requiredPermission)
  })

  const NavItem = ({ item }) => {
    const isActive = activeTab === item.id
    const Icon = item.icon
    const hasAccess = hasPermission(item.requiredPermission) || item.requiredPermission === "*"

    if (!hasAccess) return null

    return (
      <button
        onClick={() => {
          onTabChange(item.id)
          setIsSidebarOpen(false)
        }}
        className={cn(
          "group relative flex items-center space-x-3 w-full p-3 rounded-lg transition-all duration-200",
          "hover:scale-105 active:scale-95",
          isActive
            ? `bg-gradient-to-r ${item.gradient} text-white shadow-lg`
            : "text-slate-600 hover:text-slate-900 hover:bg-gradient-to-r hover:from-slate-50 hover:to-blue-50",
        )}
      >
        {isActive && <div className="absolute inset-0 bg-white/10 rounded-lg" />}

        <div
          className={cn(
            "relative p-2 rounded-lg transition-all duration-200",
            isActive
              ? "bg-white/20"
              : "bg-gradient-to-br from-slate-100 to-slate-200 group-hover:from-blue-100 group-hover:to-purple-100",
          )}
        >
          <Icon
            className={cn(
              "h-5 w-5 transition-colors duration-200",
              isActive ? "text-white" : "text-slate-600 group-hover:text-blue-600",
            )}
          />
        </div>

        <div className="flex-1 text-left">
          <p className={cn("font-medium transition-colors duration-200", isActive ? "text-white" : "text-slate-900")}>
            {item.label}
          </p>
          <p className={cn("text-xs transition-colors duration-200", isActive ? "text-white/80" : "text-slate-500")}>
            {item.description}
          </p>
        </div>

        {!hasPermission(item.requiredPermission) && item.requiredPermission !== "*" && (
          <Lock className="h-4 w-4 text-slate-400" />
        )}
      </button>
    )
  }

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex lg:flex-col lg:w-80 bg-white border-r border-slate-200">
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Logo */}
          <div className="flex items-center space-x-3 p-6 border-b border-slate-200">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
              <Package className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className={cn("text-2xl font-bold", textGradients.primary)}>Invento</h1>
              <p className="text-sm text-slate-600">Inventory Management</p>
            </div>
          </div>

          {/* User Info */}
          {user && (
            <div className="p-4 border-b border-slate-200">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                  {user.name?.[0] || "U"}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-slate-900">{user.name}</p>
                  <div className="flex items-center space-x-2">
                    <Badge className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                      {user.role}
                    </Badge>
                    <p className="text-xs text-slate-500">{user.department}</p>
                  </div>
                </div>
              </div>
              <Button variant="ghost" size="sm" className="w-full mt-3" onClick={logout}>
                <Lock className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          )}

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="space-y-2">
              {availableNavItems.map((item) => (
                <NavItem key={item.id} item={item} />
              ))}
            </div>

            {/* Quick Actions */}
            <div className="mt-8 p-4 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <h3 className="font-semibold text-slate-900 mb-3">Quick Actions</h3>
              <div className="space-y-2">
                {hasPermission("products.write") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => onTabChange("products")}
                  >
                    <Package className="h-4 w-4 mr-2" />
                    Add Product
                  </Button>
                )}
                {hasPermission("sales.write") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => onTabChange("sales")}
                  >
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    New Sale
                  </Button>
                )}
                {hasPermission("analytics.read") && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start bg-transparent"
                    onClick={() => onTabChange("analytics")}
                  >
                    <TrendingUp className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Button */}
      <Button variant="outline" size="icon" className="lg:hidden bg-transparent" onClick={() => setIsSidebarOpen(true)}>
        <Menu className="h-4 w-4" />
      </Button>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3 }}
              className="fixed top-0 left-0 h-full w-80 bg-white shadow-xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                      <Package className="h-6 w-6 text-white" />
                    </div>
                    <h1 className={cn("text-xl font-bold", textGradients.primary)}>Invento</h1>
                  </div>
                  <Button variant="outline" size="icon" onClick={() => setIsSidebarOpen(false)}>
                    <X className="h-4 w-4" />
                  </Button>
                </div>

                {user && (
                  <div className="p-4 border-b border-slate-200 mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-medium">
                        {user.name?.[0] || "U"}
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-slate-900">{user.name}</p>
                        <div className="flex items-center space-x-2">
                          <Badge className="text-xs bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                            {user.role}
                          </Badge>
                          <p className="text-xs text-slate-500">{user.department}</p>
                        </div>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="w-full mt-3" onClick={logout}>
                      <Lock className="h-4 w-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                )}

                <div className="space-y-2">
                  {availableNavItems.map((item) => (
                    <NavItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
