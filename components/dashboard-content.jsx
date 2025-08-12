"use client"

import { useState } from "react"
import { AppNavigation } from "@/components/app-navigation"
import { ResponsiveLayout } from "@/components/responsive-layout"
import { DarkModeToggle } from "@/components/dark-mode-toggle"
import { NotificationCenter } from "@/components/notification-center"
import { QualitySettings } from "@/components/quality-settings"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"

// Import all module components
import { InventoryTable } from "@/components/inventory-table"
import { ProductManagement } from "@/components/product-management"
import { SalesModule } from "@/components/sales-module"
import { StockTransfers } from "@/components/stock-transfers"
import { SriLankaMap } from "@/components/sri-lanka-map"
import { AdvancedInventoryAnalytics } from "@/components/advanced-inventory-analytics"
import { ReportsModule } from "@/components/reports-module"
import { SettingsModule } from "@/components/settings-module"
import { SalesOrdersModule } from "@/components/sales-orders-module"
import { PurchaseOrdersModule } from "@/components/purchase-orders-module"
import { SystemAdministration } from "@/components/system-administration"
import { EnhancedInventoryManagement } from "@/components/enhanced-inventory-management"
import { EnhancedPOSSystem } from "@/components/enhanced-pos-system"
import { BillingModule } from "@/components/billing-module"
import { EnhancedNavigation } from "@/components/enhanced-navigation"
import { AnalyticsDashboard } from "@/components/analytics-dashboard"
import { CustomerManagement } from "@/components/customer-management"
import { DiagnosticHelper } from "@/components/diagnostic-helper"

export function DashboardContent() {
  const { user, logout, hasPermission } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [qualityMode, setQualityMode] = useState("high") // 'high', 'medium', 'low'

  const notifications = [
    {
      id: 1,
      type: "warning",
      message: "Low stock alert for Ceylon Black Tea",
      timestamp: new Date(Date.now() - 60 * 1000),
    },
    {
      id: 2,
      type: "info",
      message: "New stock transfer request (TRF-001)",
      timestamp: new Date(Date.now() - 5 * 60 * 1000),
    },
    {
      id: 3,
      type: "success",
      message: "Sales order SO-2024-001 delivered",
      timestamp: new Date(Date.now() - 30 * 60 * 1000),
    },
  ]

  const renderContent = () => {
    if (!user) {
      return <div className="text-center py-12">Please log in to view the dashboard.</div>
    }

    switch (activeTab) {
      case "dashboard":
        return hasPermission("dashboard.read") ? <AnalyticsDashboard /> : <NoAccessMessage />
      case "inventory":
        return hasPermission("inventory.read") ? <InventoryTable /> : <NoAccessMessage />
      case "products":
        return hasPermission("products.read") ? <ProductManagement /> : <NoAccessMessage />
      case "sales":
        return hasPermission("sales.read") ? <SalesModule qualityMode={qualityMode} /> : <NoAccessMessage />
      case "transfers":
        return hasPermission("transfers.read") ? <StockTransfers qualityMode={qualityMode} /> : <NoAccessMessage />
      case "warehouses":
        return hasPermission("warehouses.read") ? <SriLankaMap /> : <NoAccessMessage />
      case "analytics":
        return hasPermission("analytics.read") ? <AdvancedInventoryAnalytics /> : <NoAccessMessage />
      case "reports":
        return hasPermission("reports.read") ? <ReportsModule qualityMode={qualityMode} /> : <NoAccessMessage />
      case "customers":
        return hasPermission("customers.read") ? <CustomerManagement /> : <NoAccessMessage />
      case "billing":
        return hasPermission("billing.read") ? <BillingModule /> : <NoAccessMessage />
      case "settings":
        return hasPermission("settings.read") ? <SettingsModule /> : <NoAccessMessage />
      case "sales-orders":
        return hasPermission("sales.read") ? <SalesOrdersModule /> : <NoAccessMessage />
      case "purchase-orders":
        return hasPermission("purchase.read") ? <PurchaseOrdersModule /> : <NoAccessMessage />
      case "system-admin":
        return hasPermission("admin.read") ? <SystemAdministration /> : <NoAccessMessage />
      case "enhanced-inventory":
        return hasPermission("inventory.read") ? <EnhancedInventoryManagement /> : <NoAccessMessage />
      case "enhanced-pos":
        return hasPermission("sales.read") ? <EnhancedPOSSystem /> : <NoAccessMessage />
      case "enhanced-nav":
        return <EnhancedNavigation /> // This is a navigation component, not a content module
      default:
        return <div className="text-center py-12">Select a module from the sidebar.</div>
    }
  }

  const NoAccessMessage = () => (
    <div className="text-center py-12 bg-red-50 border border-red-200 rounded-lg text-red-700">
      <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
      <p>You do not have permission to view this module. Please contact your administrator.</p>
    </div>
  )

  return (
    <ResponsiveLayout navigation={<AppNavigation activeTab={activeTab} onTabChange={setActiveTab} />}>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
          {activeTab.charAt(0).toUpperCase() + activeTab.slice(1).replace(/-/g, " ")}
        </h1>
        <div className="flex items-center space-x-3">
          <QualitySettings currentMode={qualityMode} onModeChange={setQualityMode} />
          <NotificationCenter notifications={notifications} />
          <DarkModeToggle />
          <Button variant="outline" size="sm" onClick={logout}>
            <LogOut className="h-4 w-4 mr-2" />
            Logout
          </Button>
        </div>
      </div>

      {renderContent()}

      {/* Diagnostic Helper for development */}
      {process.env.NODE_ENV === "development" && <DiagnosticHelper />}
    </ResponsiveLayout>
  )
}
