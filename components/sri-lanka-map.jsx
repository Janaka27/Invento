"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Plus, Edit, Trash2, Package, Activity, Clock } from "lucide-react"
import { motion } from "framer-motion"

const sriLankanProvinces = [
  { name: "Western", districts: ["Colombo", "Gampaha", "Kalutara"] },
  { name: "Central", districts: ["Kandy", "Matale", "Nuwara Eliya"] },
  { name: "Southern", districts: ["Galle", "Matara", "Hambantota"] },
  { name: "Northern", districts: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"] },
  { name: "Eastern", districts: ["Ampara", "Batticaloa", "Trincomalee"] },
  { name: "North Western", districts: ["Kurunegala", "Puttalam"] },
  { name: "North Central", districts: ["Anuradhapura", "Polonnaruwa"] },
  { name: "Uva", districts: ["Badulla", "Monaragala"] },
  { name: "Sabaragamuwa", districts: ["Ratnapura", "Kegalle"] },
]

export function SriLankaMap() {
  const [warehouses, setWarehouses] = useState([
    {
      id: "1",
      name: "Colombo Main Hub",
      province: "Western",
      district: "Colombo",
      address: "123 Galle Road, Colombo 03",
      phone: "+94 11 234 5678",
      email: "colombo@invento.lk",
      manager: "Priya Perera",
      capacity: 10000,
      currentStock: 8500,
      status: "active",
      coordinates: { x: 45, y: 75 },
      operatingHours: "24/7",
    },
    {
      id: "2",
      name: "Kandy Distribution",
      province: "Central",
      district: "Kandy",
      address: "456 Peradeniya Road, Kandy",
      phone: "+94 81 234 5678",
      email: "kandy@invento.lk",
      manager: "Sunil Silva",
      capacity: 7500,
      currentStock: 6200,
      status: "active",
      coordinates: { x: 55, y: 60 },
      operatingHours: "6:00 AM - 10:00 PM",
    },
    {
      id: "3",
      name: "Galle Coastal Hub",
      province: "Southern",
      district: "Galle",
      address: "789 Matara Road, Galle",
      phone: "+94 91 234 5678",
      email: "galle@invento.lk",
      manager: "Kamala Jayawardena",
      capacity: 5000,
      currentStock: 4100,
      status: "active",
      coordinates: { x: 50, y: 85 },
      operatingHours: "7:00 AM - 9:00 PM",
    },
  ])

  const [selectedWarehouse, setSelectedWarehouse] = useState(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newWarehouse, setNewWarehouse] = useState({})
  const [selectedProvince, setSelectedProvince] = useState("")
  const svgRef = useRef(null)

  const handleMapClick = (event) => {
    if (isEditing) return

    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 100
    const y = ((event.clientY - rect.top) / rect.height) * 100

    setNewWarehouse({
      coordinates: { x, y },
      status: "active",
      capacity: 1000,
      currentStock: 0,
      operatingHours: "8:00 AM - 6:00 PM",
    })
    setIsDialogOpen(true)
    setIsEditing(false)
  }

  const handleWarehouseClick = (warehouse, event) => {
    event.stopPropagation()
    setSelectedWarehouse(warehouse)
  }

  const handleEditWarehouse = (warehouse) => {
    setNewWarehouse(warehouse)
    setSelectedProvince(warehouse.province)
    setIsDialogOpen(true)
    setIsEditing(true)
    setSelectedWarehouse(null)
  }

  const handleDeleteWarehouse = (warehouseId) => {
    setWarehouses(warehouses.filter((w) => w.id !== warehouseId))
    setSelectedWarehouse(null)
  }

  const handleSaveWarehouse = () => {
    if (!newWarehouse.name || !newWarehouse.province || !newWarehouse.district) return

    if (isEditing && newWarehouse.id) {
      setWarehouses(warehouses.map((w) => (w.id === newWarehouse.id ? newWarehouse : w)))
    } else {
      const warehouse = {
        ...newWarehouse,
        id: Date.now().toString(),
      }
      setWarehouses([...warehouses, warehouse])
    }

    setIsDialogOpen(false)
    setNewWarehouse({})
    setSelectedProvince("")
    setIsEditing(false)
  }

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "text-green-600 bg-green-100"
      case "inactive":
        return "text-red-600 bg-red-100"
      case "maintenance":
        return "text-yellow-600 bg-yellow-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  const getStockPercentage = (current, capacity) => {
    return Math.round((current / capacity) * 100)
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Sri Lankan Warehouse Map</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Interactive map showing all warehouse locations across Sri Lanka
          </p>
        </div>
        <Badge className="bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
          {warehouses.length} Active Warehouses
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Map */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Interactive Map
              </CardTitle>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                Click anywhere on the map to add a new warehouse
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-800 dark:to-slate-700 rounded-lg overflow-hidden">
                <svg
                  ref={svgRef}
                  viewBox="0 0 100 100"
                  className="w-full h-96 cursor-crosshair"
                  onClick={handleMapClick}
                >
                  {/* Sri Lanka outline (simplified) */}
                  <path
                    d="M30 20 L70 15 L75 25 L80 40 L75 60 L70 80 L60 90 L45 95 L35 90 L25 80 L20 60 L25 40 L30 20 Z"
                    fill="rgba(34, 197, 94, 0.1)"
                    stroke="rgba(34, 197, 94, 0.3)"
                    strokeWidth="0.5"
                  />

                  {/* Province boundaries (simplified) */}
                  <g stroke="rgba(148, 163, 184, 0.3)" strokeWidth="0.2" fill="none">
                    <path d="M30 20 L50 25 L45 40 L35 35 Z" />
                    <path d="M50 25 L70 15 L65 35 L50 40 Z" />
                    <path d="M45 40 L65 35 L60 55 L40 60 Z" />
                    <path d="M40 60 L60 55 L55 75 L35 80 Z" />
                    <path d="M35 80 L55 75 L50 90 L35 90 Z" />
                  </g>

                  {/* Connection lines between warehouses */}
                  {warehouses.map((warehouse, index) =>
                    warehouses
                      .slice(index + 1)
                      .map((otherWarehouse) => (
                        <motion.line
                          key={`${warehouse.id}-${otherWarehouse.id}`}
                          x1={warehouse.coordinates.x}
                          y1={warehouse.coordinates.y}
                          x2={otherWarehouse.coordinates.x}
                          y2={otherWarehouse.coordinates.y}
                          stroke="rgba(59, 130, 246, 0.3)"
                          strokeWidth="0.2"
                          strokeDasharray="1,1"
                          initial={{ pathLength: 0 }}
                          animate={{ pathLength: 1 }}
                          transition={{ duration: 2, delay: index * 0.2 }}
                        />
                      )),
                  )}

                  {/* Warehouses */}
                  {warehouses.map((warehouse) => (
                    <motion.g
                      key={warehouse.id}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <circle
                        cx={warehouse.coordinates.x}
                        cy={warehouse.coordinates.y}
                        r="2"
                        fill={
                          warehouse.status === "active"
                            ? "#10b981"
                            : warehouse.status === "maintenance"
                              ? "#f59e0b"
                              : "#ef4444"
                        }
                        stroke="white"
                        strokeWidth="0.5"
                        className="cursor-pointer hover:r-3 transition-all duration-200"
                        onClick={(e) => handleWarehouseClick(warehouse, e)}
                      />
                      <text
                        x={warehouse.coordinates.x}
                        y={warehouse.coordinates.y - 3}
                        textAnchor="middle"
                        fontSize="2"
                        fill="#1f2937"
                        className="pointer-events-none font-medium"
                      >
                        {warehouse.name.split(" ")[0]}
                      </text>
                    </motion.g>
                  ))}
                </svg>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Warehouse Details */}
        <div className="space-y-6">
          {selectedWarehouse ? (
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5" />
                    {selectedWarehouse.name}
                  </CardTitle>
                  <Badge className={getStatusColor(selectedWarehouse.status)}>{selectedWarehouse.status}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-slate-600 dark:text-slate-400">Province</Label>
                    <p className="font-medium">{selectedWarehouse.province}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600 dark:text-slate-400">District</Label>
                    <p className="font-medium">{selectedWarehouse.district}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-600 dark:text-slate-400">Address</Label>
                  <p className="font-medium">{selectedWarehouse.address}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-slate-600 dark:text-slate-400">Phone</Label>
                    <p className="font-medium">{selectedWarehouse.phone}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-slate-600 dark:text-slate-400">Manager</Label>
                    <p className="font-medium">{selectedWarehouse.manager}</p>
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-600 dark:text-slate-400">Stock Capacity</Label>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm">
                      {selectedWarehouse.currentStock.toLocaleString()} / {selectedWarehouse.capacity.toLocaleString()}
                    </span>
                    <span className="text-sm font-medium">
                      {getStockPercentage(selectedWarehouse.currentStock, selectedWarehouse.capacity)}%
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${getStockPercentage(selectedWarehouse.currentStock, selectedWarehouse.capacity)}%`,
                      }}
                    />
                  </div>
                </div>

                <div>
                  <Label className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    Operating Hours
                  </Label>
                  <p className="font-medium">{selectedWarehouse.operatingHours}</p>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button size="sm" onClick={() => handleEditWarehouse(selectedWarehouse)} className="flex-1">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </Button>
                  <Button size="sm" variant="destructive" onClick={() => handleDeleteWarehouse(selectedWarehouse.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="text-center py-12">
                <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">Select a Warehouse</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Click on any warehouse marker on the map to view details
                </p>
                <Button onClick={() => setIsDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New Warehouse
                </Button>
              </CardContent>
            </Card>
          )}

          {/* Warehouse List */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                All Warehouses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {warehouses.map((warehouse) => (
                  <div
                    key={warehouse.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 ${
                      selectedWarehouse?.id === warehouse.id
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
                    }`}
                    onClick={() => setSelectedWarehouse(warehouse)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-slate-900 dark:text-white">{warehouse.name}</h4>
                      <Badge className={getStatusColor(warehouse.status)} size="sm">
                        {warehouse.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">{warehouse.district}</p>
                    <div className="flex items-center justify-between mt-2 text-xs text-slate-500 dark:text-slate-400">
                      <span>{warehouse.manager}</span>
                      <span>{getStockPercentage(warehouse.currentStock, warehouse.capacity)}% full</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add/Edit Warehouse Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditing ? "Edit Warehouse" : "Add New Warehouse"}</DialogTitle>
            <DialogDescription>
              {isEditing ? "Update warehouse information" : "Enter details for the new warehouse location"}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Warehouse Name</Label>
              <Input
                id="name"
                value={newWarehouse.name || ""}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, name: e.target.value })}
                placeholder="e.g., Colombo Main Hub"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="province">Province</Label>
                <Select
                  value={selectedProvince}
                  onValueChange={(value) => {
                    setSelectedProvince(value)
                    setNewWarehouse({ ...newWarehouse, province: value, district: "" })
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select province" />
                  </SelectTrigger>
                  <SelectContent>
                    {sriLankanProvinces.map((province) => (
                      <SelectItem key={province.name} value={province.name}>
                        {province.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="district">District</Label>
                <Select
                  value={newWarehouse.district || ""}
                  onValueChange={(value) => setNewWarehouse({ ...newWarehouse, district: value })}
                  disabled={!selectedProvince}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select district" />
                  </SelectTrigger>
                  <SelectContent>
                    {selectedProvince &&
                      sriLankanProvinces
                        .find((p) => p.name === selectedProvince)
                        ?.districts.map((district) => (
                          <SelectItem key={district} value={district}>
                            {district}
                          </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Textarea
                id="address"
                value={newWarehouse.address || ""}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, address: e.target.value })}
                placeholder="Full address"
                rows={2}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  value={newWarehouse.phone || ""}
                  onChange={(e) => setNewWarehouse({ ...newWarehouse, phone: e.target.value })}
                  placeholder="+94 XX XXX XXXX"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={newWarehouse.email || ""}
                  onChange={(e) => setNewWarehouse({ ...newWarehouse, email: e.target.value })}
                  placeholder="warehouse@invento.lk"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="manager">Manager</Label>
              <Input
                id="manager"
                value={newWarehouse.manager || ""}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, manager: e.target.value })}
                placeholder="Manager name"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="capacity">Capacity</Label>
                <Input
                  id="capacity"
                  type="number"
                  value={newWarehouse.capacity || ""}
                  onChange={(e) => setNewWarehouse({ ...newWarehouse, capacity: Number.parseInt(e.target.value) || 0 })}
                  placeholder="10000"
                />
              </div>
              <div>
                <Label htmlFor="currentStock">Current Stock</Label>
                <Input
                  id="currentStock"
                  type="number"
                  value={newWarehouse.currentStock || ""}
                  onChange={(e) =>
                    setNewWarehouse({ ...newWarehouse, currentStock: Number.parseInt(e.target.value) || 0 })
                  }
                  placeholder="8500"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="operatingHours">Operating Hours</Label>
              <Input
                id="operatingHours"
                value={newWarehouse.operatingHours || ""}
                onChange={(e) => setNewWarehouse({ ...newWarehouse, operatingHours: e.target.value })}
                placeholder="8:00 AM - 6:00 PM"
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={newWarehouse.status || "active"}
                onValueChange={(value) => setNewWarehouse({ ...newWarehouse, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveWarehouse}>{isEditing ? "Update" : "Add"} Warehouse</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
