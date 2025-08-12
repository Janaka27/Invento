"use client"

import { Textarea } from "@/components/ui/textarea"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Settings, User, Plus, Edit, Trash2, Key, Activity } from "lucide-react"
import { motion } from "framer-motion"

export function SystemAdministration() {
  const [activeTab, setActiveTab] = useState("users")
  const [users, setUsers] = useState([
    {
      id: "1",
      name: "John Admin",
      email: "admin@invento.com",
      role: "admin",
      status: "active",
      lastLogin: "2024-01-20",
      permissions: ["*"],
    },
    {
      id: "2",
      name: "Sarah Manager",
      email: "manager@invento.com",
      role: "manager",
      status: "active",
      lastLogin: "2024-01-20",
      permissions: ["inventory.read", "inventory.write", "sales.read", "reports.read"],
    },
    {
      id: "3",
      name: "Mike Staff",
      email: "staff@invento.com",
      role: "staff",
      status: "inactive",
      lastLogin: "2024-01-18",
      permissions: ["inventory.read", "sales.read"],
    },
  ])
  const [roles, setRoles] = useState([
    {
      id: "admin",
      name: "Administrator",
      description: "Full system access",
      permissions: ["*"],
    },
    {
      id: "manager",
      name: "Manager",
      description: "Operations and reporting",
      permissions: ["inventory.read", "inventory.write", "sales.read", "reports.read"],
    },
    {
      id: "staff",
      name: "Warehouse Staff",
      description: "Basic inventory operations",
      permissions: ["inventory.read", "sales.read"],
    },
    {
      id: "viewer",
      name: "Viewer",
      description: "Read-only access",
      permissions: ["inventory.read", "reports.read"],
    },
  ])
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [isRoleDialogOpen, setIsRoleDialogOpen] = useState(false)
  const [editingRole, setEditingRole] = useState(null)

  const allPermissions = [
    "inventory.read",
    "inventory.write",
    "products.read",
    "products.write",
    "sales.read",
    "sales.write",
    "reports.read",
    "customers.read",
    "customers.write",
    "transfers.read",
    "transfers.write",
    "warehouses.read",
    "analytics.read",
    "billing.read",
    "billing.write",
    "settings.read",
    "settings.write",
    "admin.read",
    "admin.write",
  ]

  const handleAddUser = (newUser) => {
    setUsers([...users, { ...newUser, id: Date.now().toString(), lastLogin: new Date().toISOString().split("T")[0] }])
    setIsUserDialogOpen(false)
  }

  const handleUpdateUser = (updatedUser) => {
    setUsers(users.map((user) => (user.id === updatedUser.id ? updatedUser : user)))
    setIsUserDialogOpen(false)
    setEditingUser(null)
  }

  const handleDeleteUser = (userId) => {
    setUsers(users.filter((user) => user.id !== userId))
  }

  const handleAddRole = (newRole) => {
    setRoles([...roles, { ...newRole, id: newRole.name.toLowerCase().replace(/\s/g, "-") }])
    setIsRoleDialogOpen(false)
  }

  const handleUpdateRole = (updatedRole) => {
    setRoles(roles.map((role) => (role.id === updatedRole.id ? updatedRole : role)))
    setIsRoleDialogOpen(false)
    setEditingRole(null)
  }

  const handleDeleteRole = (roleId) => {
    setRoles(roles.filter((role) => role.id !== roleId))
  }

  const UserForm = ({ user, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(
      user || {
        name: "",
        email: "",
        role: "staff",
        status: "active",
        permissions: [],
      },
    )

    const handlePermissionChange = (permission) => {
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter((p) => p !== permission)
          : [...prev.permissions, permission],
      }))
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}
        className="space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="role">Role</Label>
            <Select value={formData.role} onValueChange={(value) => setFormData({ ...formData, role: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select role" />
              </SelectTrigger>
              <SelectContent>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.id}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="status">Status</Label>
            <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <Label>Permissions</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allPermissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Switch
                  id={`perm-${permission}`}
                  checked={formData.permissions.includes(permission) || formData.permissions.includes("*")}
                  onCheckedChange={() => handlePermissionChange(permission)}
                  disabled={formData.permissions.includes("*")}
                />
                <Label htmlFor={`perm-${permission}`} className="text-sm">
                  {permission}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{user ? "Update User" : "Add User"}</Button>
        </div>
      </form>
    )
  }

  const RoleForm = ({ role, onSubmit, onClose }) => {
    const [formData, setFormData] = useState(
      role || {
        name: "",
        description: "",
        permissions: [],
      },
    )

    const handlePermissionChange = (permission) => {
      setFormData((prev) => ({
        ...prev,
        permissions: prev.permissions.includes(permission)
          ? prev.permissions.filter((p) => p !== permission)
          : [...prev.permissions, permission],
      }))
    }

    return (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit(formData)
        }}
        className="space-y-4"
      >
        <div>
          <Label htmlFor="roleName">Role Name</Label>
          <Input
            id="roleName"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>
        <div>
          <Label htmlFor="roleDescription">Description</Label>
          <Textarea
            id="roleDescription"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
          />
        </div>

        <div>
          <Label>Permissions</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {allPermissions.map((permission) => (
              <div key={permission} className="flex items-center space-x-2">
                <Switch
                  id={`role-perm-${permission}`}
                  checked={formData.permissions.includes(permission) || formData.permissions.includes("*")}
                  onCheckedChange={() => handlePermissionChange(permission)}
                  disabled={formData.permissions.includes("*")}
                />
                <Label htmlFor={`role-perm-${permission}`} className="text-sm">
                  {permission}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button type="submit">{role ? "Update Role" : "Add Role"}</Button>
        </div>
      </form>
    )
  }

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>System Administration</span>
          </CardTitle>
          <CardDescription>Manage users, roles, and system-wide settings</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            </TabsList>

            <TabsContent value="users" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <User className="h-5 w-5" />
                      <span>User Accounts</span>
                    </CardTitle>
                    <Dialog open={isUserDialogOpen} onOpenChange={setIsUserDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditingUser(null)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add User
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{editingUser ? "Edit User" : "Add New User"}</DialogTitle>
                          <DialogDescription>
                            {editingUser ? "Update user details and permissions" : "Create a new user account"}
                          </DialogDescription>
                        </DialogHeader>
                        <UserForm
                          user={editingUser}
                          onSubmit={editingUser ? handleUpdateUser : handleAddUser}
                          onClose={() => setIsUserDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Role</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Last Login</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user, index) => (
                          <motion.tr
                            key={user.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-slate-50"
                          >
                            <TableCell className="font-medium">{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{roles.find((r) => r.id === user.role)?.name || user.role}</TableCell>
                            <TableCell>{user.status}</TableCell>
                            <TableCell>{user.lastLogin}</TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingUser(user)
                                    setIsUserDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteUser(user.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="roles" className="mt-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center space-x-2">
                      <Key className="h-5 w-5" />
                      <span>Roles & Permissions</span>
                    </CardTitle>
                    <Dialog open={isRoleDialogOpen} onOpenChange={setIsRoleDialogOpen}>
                      <DialogTrigger asChild>
                        <Button onClick={() => setEditingRole(null)}>
                          <Plus className="h-4 w-4 mr-2" />
                          Add Role
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>{editingRole ? "Edit Role" : "Add New Role"}</DialogTitle>
                          <DialogDescription>
                            {editingRole
                              ? "Update role details and permissions"
                              : "Create a new role with custom permissions"}
                          </DialogDescription>
                        </DialogHeader>
                        <RoleForm
                          role={editingRole}
                          onSubmit={editingRole ? handleUpdateRole : handleAddRole}
                          onClose={() => setIsRoleDialogOpen(false)}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Role Name</TableHead>
                          <TableHead>Description</TableHead>
                          <TableHead>Permissions</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {roles.map((role, index) => (
                          <motion.tr
                            key={role.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className="hover:bg-slate-50"
                          >
                            <TableCell className="font-medium">{role.name}</TableCell>
                            <TableCell>{role.description}</TableCell>
                            <TableCell>
                              {role.permissions.includes("*") ? (
                                <span className="font-semibold text-blue-600">All Permissions</span>
                              ) : (
                                <div className="flex flex-wrap gap-1">
                                  {role.permissions.map((perm) => (
                                    <span key={perm} className="text-xs bg-slate-100 px-2 py-1 rounded-full">
                                      {perm}
                                    </span>
                                  ))}
                                </div>
                              )}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center space-x-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    setEditingRole(role)
                                    setIsRoleDialogOpen(true)
                                  }}
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleDeleteRole(role.id)}
                                  className="text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Audit Log */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Activity className="h-5 w-5" />
            <span>Audit Log</span>
          </CardTitle>
          <CardDescription>View recent system activities and user actions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Details</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {[
                  {
                    timestamp: "2024-01-20 10:45 AM",
                    user: "John Admin",
                    action: "Login",
                    details: "Successful login from IP 192.168.1.100",
                  },
                  {
                    timestamp: "2024-01-20 10:30 AM",
                    user: "Sarah Manager",
                    action: "Update Product",
                    details: "Updated 'Ceylon Black Tea' quantity to 450",
                  },
                  {
                    timestamp: "2024-01-19 03:15 PM",
                    user: "Mike Staff",
                    action: "Create Sales Order",
                    details: "Created SO-2024-003 for customer 'ABC Corp'",
                  },
                ].map((log, index) => (
                  <motion.tr
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-slate-50"
                  >
                    <TableCell className="text-sm">{log.timestamp}</TableCell>
                    <TableCell className="font-medium">{log.user}</TableCell>
                    <TableCell>{log.action}</TableCell>
                    <TableCell className="text-sm text-slate-600">{log.details}</TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
