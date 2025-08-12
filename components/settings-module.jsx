"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Settings, User, Building, Bell, Shield, Database, Globe } from "lucide-react"

export function SettingsModule() {
  const [notifications, setNotifications] = useState({
    lowStock: true,
    transfers: true,
    sales: false,
    email: true,
    sms: false,
  })

  const [systemSettings, setSystemSettings] = useState({
    currency: "USD",
    timezone: "UTC",
    language: "en",
    dateFormat: "MM/DD/YYYY",
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Settings</span>
          </CardTitle>
          <CardDescription>Configure system preferences and user settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Globe className="h-4 w-4" />
                    <span>System Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="currency">Default Currency</Label>
                      <Select
                        value={systemSettings.currency}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, currency: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="LKR">LKR - Sri Lankan Rupee</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="timezone">Timezone</Label>
                      <Select
                        value={systemSettings.timezone}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, timezone: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="UTC">UTC</SelectItem>
                          <SelectItem value="Asia/Colombo">Asia/Colombo</SelectItem>
                          <SelectItem value="America/New_York">America/New_York</SelectItem>
                          <SelectItem value="Europe/London">Europe/London</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="language">Language</Label>
                      <Select
                        value={systemSettings.language}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, language: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="si">Sinhala</SelectItem>
                          <SelectItem value="ta">Tamil</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="dateFormat">Date Format</Label>
                      <Select
                        value={systemSettings.dateFormat}
                        onValueChange={(value) => setSystemSettings({ ...systemSettings, dateFormat: value })}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                          <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                          <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button>Save Changes</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Database className="h-4 w-4" />
                    <span>Data Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Automatic Backups</p>
                      <p className="text-sm text-slate-600">Enable daily automatic database backups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Data Retention</p>
                      <p className="text-sm text-slate-600">Keep transaction logs for 90 days</p>
                    </div>
                    <Switch defaultChecked />
                  </div>

                  <div className="pt-4 border-t">
                    <Button variant="outline" className="mr-2 bg-transparent">
                      Export Data
                    </Button>
                    <Button variant="outline">Import Data</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <User className="h-4 w-4" />
                    <span>User Management</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Active Users</h3>
                      <Button size="sm">Add User</Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
                        { name: "Jane Smith", email: "jane@example.com", role: "Manager", status: "Active" },
                        { name: "Mike Johnson", email: "mike@example.com", role: "Staff", status: "Inactive" },
                      ].map((user, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-sm text-slate-600">{user.email}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-slate-600">{user.role}</span>
                            <Button size="sm" variant="outline">
                              Edit
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="warehouses" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Building className="h-4 w-4" />
                    <span>Warehouse Configuration</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <h3 className="font-medium">Warehouses</h3>
                      <Button size="sm">Add Warehouse</Button>
                    </div>

                    <div className="space-y-3">
                      {[
                        { name: "Main Warehouse", location: "Colombo, Sri Lanka", capacity: "10,000 sq ft" },
                        { name: "Warehouse B", location: "Kandy, Sri Lanka", capacity: "5,000 sq ft" },
                        { name: "Warehouse C", location: "Galle, Sri Lanka", capacity: "7,500 sq ft" },
                      ].map((warehouse, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                          <div>
                            <p className="font-medium">{warehouse.name}</p>
                            <p className="text-sm text-slate-600">
                              {warehouse.location} • {warehouse.capacity}
                            </p>
                          </div>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Bell className="h-4 w-4" />
                    <span>Notification Preferences</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="font-medium">Alert Types</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Low Stock Alerts</p>
                          <p className="text-sm text-slate-600">Get notified when products are below minimum stock</p>
                        </div>
                        <Switch
                          checked={notifications.lowStock}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, lowStock: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Transfer Notifications</p>
                          <p className="text-sm text-slate-600">Alerts for pending transfer approvals</p>
                        </div>
                        <Switch
                          checked={notifications.transfers}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, transfers: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Sales Notifications</p>
                          <p className="text-sm text-slate-600">Daily sales summary notifications</p>
                        </div>
                        <Switch
                          checked={notifications.sales}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, sales: checked })}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-6">
                    <h3 className="font-medium">Delivery Methods</h3>

                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-slate-600">Receive alerts via email</p>
                        </div>
                        <Switch
                          checked={notifications.email}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, email: checked })}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">SMS Notifications</p>
                          <p className="text-sm text-slate-600">Receive critical alerts via SMS</p>
                        </div>
                        <Switch
                          checked={notifications.sms}
                          onCheckedChange={(checked) => setNotifications({ ...notifications, sms: checked })}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-4 w-4" />
                    <span>Security Settings</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-600">Require 2FA for all admin users</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Session Timeout</p>
                        <p className="text-sm text-slate-600">Auto-logout after 30 minutes of inactivity</p>
                      </div>
                      <Switch defaultChecked />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Audit Logging</p>
                        <p className="text-sm text-slate-600">Log all user actions for security audits</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>

                  <div className="space-y-4 border-t pt-6">
                    <h3 className="font-medium">Password Policy</h3>

                    <div className="space-y-2">
                      <Label htmlFor="min-length">Minimum Password Length</Label>
                      <Input type="number" defaultValue="8" className="w-24" />
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require special characters</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require numbers</Label>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch defaultChecked />
                      <Label>Require uppercase letters</Label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
