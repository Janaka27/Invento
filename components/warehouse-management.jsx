"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Factory, Plus, Search, Edit, Trash2, Box, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"

const SAMPLE_WAREHOUSES = [
  {
    id: "1",
    name: "Colombo Main Hub",
    location: "Colombo, Western Province",
    address: "123 Galle Road, Colombo 03",
    phone: "+94 11 234 5678",
    email: "colombo@invento.lk",
    manager: "Priya Perera",
    capacity: 10000, // in cubic meters or units
    currentStock: 8500,
    status: "active",
    operatingHours: "24/7",
    lastAudit: "2024-01-10",
  },
  {
    id: "2",
    name: "Kandy Distribution Center",
    location: "Kandy, Central Province",
    address: "456 Peradeniya Road, Kandy",
    phone: "+94 81 234 5678",
    email: "kandy@invento.lk",
    manager: "Sunil Silva",
    capacity: 7500,
    currentStock: 6200,
    status: "active",
    operatingHours: "6:00 AM - 10:00 PM",
    lastAudit: "2024-01-05",
  },
  {
    id: "3",
    name: "Galle Coastal Hub",
    location: "Galle, Southern Province",
    address: "789 Matara Road, Galle",
    phone: "+94 91 234 5678",
    email: "galle@invento.lk",
    manager: "Kamala Jayawardena",
    capacity: 5000,
    currentStock: 4100,
    status: "active",
    operatingHours: "7:00 AM - 9:00 PM",
    lastAudit: "2023-12-20",
  },
  {
    id: "4",
    name: "Jaffna North Depot",
    location: "Jaffna, Northern Province",
    address: "101 Hospital Road, Jaffna",
    phone: "+94 21 567 8901",
    email: "jaffna@invento.lk",
    manager: "Arun Kumar",
    capacity: 3000,
    currentStock: 1500,
    status: "maintenance",
    operatingHours: "8:00 AM - 5:00 PM",
    lastAudit: "2024-01-18",
  },
]

export function WarehouseManagement() {
  const [warehouses, setWarehouses] = useState(SAMPLE_WAREHOUSES)
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingWarehouse, setEditingWarehouse] = useState(null)

  const filteredWarehouses = useMemo(() => {
    return warehouses.filter((warehouse) => {
      const matchesSearch =
        warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        warehouse.manager.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === "all" || warehouse.status === statusFilter

      return matchesSearch && matchesStatus
    })
  }, [warehouses, searchTerm, statusFilter])

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-500 text-white">Inactive</Badge>
      case "maintenance":
        return <Badge className="bg-yellow-500 text-white">Maintenance</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getStockPercentage = (current, capacity) => {
    if (capacity === 0) return 0
    return Math.round((current / capacity) * 100)
  }

  const handleAddWarehouse = (newWarehouse) => {
    const warehouse = {
      ...newWarehouse,
      id: Date.now().toString(),
      lastAudit: new Date().toISOString().split("T")[0],
    }
    setWarehouses((prev) => [...prev, warehouse])
    setIsAddDialogOpen(false)
  }

  const handleEditWarehouse = (updatedWarehouse) => {
    setWarehouses((prev) => prev.map((w) => (w.id === updatedWarehouse.id ? updatedWarehouse : w)))
    setEditingWarehouse(null)
  }

  const handleDeleteWarehouse = (id) => {
    setWarehouses((prev) => prev.filter((warehouse) => warehouse.id !== id))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Warehouse Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Oversee all your storage facilities and their operations</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Warehouse
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Warehouse</DialogTitle>
              <DialogDescription>Enter the details for the new warehouse</DialogDescription>
            </DialogHeader>
            <WarehouseForm onSubmit={handleAddWarehouse} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Search className="h-5 w-5" />
            <span>Search & Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              placeholder="Search by name, location, or manager..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Warehouse Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Factory className="h-5 w-5" />
            <span>Warehouse List ({filteredWarehouses.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Manager</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Capacity</TableHead>
                  <TableHead>Stock Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredWarehouses.map((warehouse) => (
                  <motion.tr
                    key={warehouse.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{warehouse.name}</div>
                        <div className="text-sm text-slate-500">{warehouse.operatingHours}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{warehouse.location}</div>
                        <div className="text-xs text-slate-500">{warehouse.address}</div>
                      </div>
                    </TableCell>
                    <TableCell>{warehouse.manager}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{warehouse.phone}</div>
                        <div className="text-xs text-slate-500">{warehouse.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-center">
                      <div className="font-medium">{warehouse.capacity.toLocaleString()}</div>
                      <div className="text-xs text-slate-500">units</div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col items-center">
                        <div className="font-medium">{warehouse.currentStock.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">
                          {getStockPercentage(warehouse.currentStock, warehouse.capacity)}% full
                        </div>
                        <div className="w-20 bg-slate-200 rounded-full h-1 mt-1">
                          <div
                            className="bg-blue-500 h-1 rounded-full"
                            style={{
                              width: `${getStockPercentage(warehouse.currentStock, warehouse.capacity)}%`,
                            }}
                          />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(warehouse.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingWarehouse(warehouse)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteWarehouse(warehouse.id)}
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

      {/* Warehouse Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Warehouses</p>
                <p className="text-2xl font-bold text-blue-600">{warehouses.length}</p>
              </div>
              <Factory className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Capacity</p>
                <p className="text-2xl font-bold text-green-600">
                  {warehouses.reduce((sum, w) => sum + w.capacity, 0).toLocaleString()}
                </p>
              </div>
              <Box className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Stock Level</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    (warehouses.reduce((sum, w) => sum + w.currentStock, 0) /
                      warehouses.reduce((sum, w) => sum + w.capacity, 0)) *
                      100,
                  )}
                  %
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {editingWarehouse && (
        <Dialog open={!!editingWarehouse} onOpenChange={() => setEditingWarehouse(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Warehouse</DialogTitle>
              <DialogDescription>Update the details for this warehouse</DialogDescription>
            </DialogHeader>
            <WarehouseForm initialData={editingWarehouse} onSubmit={handleEditWarehouse} isEditing />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Form component for adding/editing warehouses
function WarehouseForm({ initialData, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    location: initialData?.location || "",
    address: initialData?.address || "",
    phone: initialData?.phone || "",
    email: initialData?.email || "",
    manager: initialData?.manager || "",
    capacity: initialData?.capacity || 0,
    currentStock: initialData?.currentStock || 0,
    status: initialData?.status || "active",
    operatingHours: initialData?.operatingHours || "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing && initialData) {
      onSubmit({ ...initialData, ...formData })
    } else {
      onSubmit(formData)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Warehouse Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (City, Province)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <Textarea
            id="address"
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={2}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="manager">Manager</Label>
          <Input
            id="manager"
            value={formData.manager}
            onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity (units)</Label>
          <Input
            id="capacity"
            type="number"
            value={formData.capacity}
            onChange={(e) => setFormData({ ...formData, capacity: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="currentStock">Current Stock (units)</Label>
          <Input
            id="currentStock"
            type="number"
            value={formData.currentStock}
            onChange={(e) => setFormData({ ...formData, currentStock: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="operatingHours">Operating Hours</Label>
          <Input
            id="operatingHours"
            value={formData.operatingHours}
            onChange={(e) => setFormData({ ...formData, operatingHours: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="maintenance">Maintenance</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          {isEditing ? "Update Warehouse" : "Add Warehouse"}
        </Button>
      </div>
    </form>
  )
}
