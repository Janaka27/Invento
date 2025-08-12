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
import {
  Search,
  Filter,
  Plus,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Package,
  TrendingUp,
  Minus,
} from "lucide-react"
import { motion } from "framer-motion"

const SAMPLE_INVENTORY = [
  {
    id: "1",
    name: "Ceylon Black Tea - Premium Grade",
    sku: "TEA-CBT-001",
    category: "Tea",
    quantity: 450,
    minStock: 100,
    maxStock: 1000,
    unitPrice: 850.0,
    totalValue: 382500.0,
    warehouse: "Colombo Main Hub",
    supplier: "Ceylon Tea Estates Ltd",
    lastUpdated: "2024-01-20T10:30:00Z",
    status: "in-stock",
    location: "A1-B2-S3",
    batch: "B20240115-001",
    expiryDate: "2025-12-31",
  },
  {
    id: "2",
    name: "Cinnamon Sticks - Organic",
    sku: "SPC-CIN-002",
    category: "Spices",
    quantity: 75,
    minStock: 100,
    maxStock: 500,
    unitPrice: 1200.0,
    totalValue: 90000.0,
    warehouse: "Galle Distribution",
    supplier: "Spice Garden Exports",
    lastUpdated: "2024-01-20T09:15:00Z",
    status: "low-stock",
    location: "C5-D1-S2",
    batch: "B20231101-005",
    expiryDate: "2024-06-30",
  },
  {
    id: "3",
    name: "Coconut Oil - Virgin",
    sku: "OIL-COC-003",
    category: "Oils",
    quantity: 0,
    minStock: 50,
    maxStock: 300,
    unitPrice: 650.0,
    totalValue: 0.0,
    warehouse: "Kandy Branch",
    supplier: "Tropical Oils Lanka",
    lastUpdated: "2024-01-19T16:45:00Z",
    status: "out-of-stock",
    location: "W2-A1-S1",
    batch: "B20231020-010",
    expiryDate: "2025-03-15",
  },
  {
    id: "4",
    name: "Cashew Nuts - Premium",
    sku: "NUT-CAS-004",
    category: "Nuts",
    quantity: 1200,
    minStock: 200,
    maxStock: 800,
    unitPrice: 2500.0,
    totalValue: 3000000.0,
    warehouse: "Colombo Main Hub",
    supplier: "Lanka Cashew Co",
    lastUpdated: "2024-01-20T08:20:00Z",
    status: "overstocked",
    location: "A1-C4-S1",
    batch: "B20240110-003",
    expiryDate: "2025-09-30",
  },
  {
    id: "5",
    name: "Turmeric Powder - Organic",
    sku: "SPC-TUR-005",
    category: "Spices",
    quantity: 180,
    minStock: 80,
    maxStock: 400,
    unitPrice: 450.0,
    totalValue: 81000.0,
    warehouse: "Matara Warehouse",
    supplier: "Organic Spice Lanka",
    lastUpdated: "2024-01-20T11:10:00Z",
    status: "in-stock",
    location: "M1-F2-S1",
    batch: "B20231201-002",
    expiryDate: "2024-08-31",
  },
]

export function EnhancedInventoryManagement() {
  const [inventory, setInventory] = useState(SAMPLE_INVENTORY)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [warehouseFilter, setWarehouseFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingItem, setEditingItem] = useState(null)

  const filteredInventory = useMemo(() => {
    return inventory.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.batch.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = categoryFilter === "all" || item.category === categoryFilter
      const matchesStatus = statusFilter === "all" || item.status === statusFilter
      const matchesWarehouse = warehouseFilter === "all" || item.warehouse === warehouseFilter

      return matchesSearch && matchesCategory && matchesStatus && matchesWarehouse
    })
  }, [inventory, searchTerm, categoryFilter, statusFilter, warehouseFilter])

  const categories = Array.from(new Set(inventory.map((item) => item.category)))
  const warehouses = Array.from(new Set(inventory.map((item) => item.warehouse)))

  const getStatusBadge = (status) => {
    switch (status) {
      case "in-stock":
        return (
          <Badge className="bg-green-500 text-white">
            <CheckCircle className="h-3 w-3 mr-1" />
            In Stock
          </Badge>
        )
      case "low-stock":
        return (
          <Badge className="bg-orange-500 text-white">
            <AlertTriangle className="h-3 w-3 mr-1" />
            Low Stock
          </Badge>
        )
      case "out-of-stock":
        return (
          <Badge className="bg-red-500 text-white">
            <Minus className="h-3 w-3 mr-1" />
            Out of Stock
          </Badge>
        )
      case "overstocked":
        return (
          <Badge className="bg-blue-500 text-white">
            <TrendingUp className="h-3 w-3 mr-1" />
            Overstocked
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  const handleAddItem = (newItem) => {
    const totalValue = newItem.quantity * newItem.unitPrice
    const status =
      newItem.quantity === 0
        ? "out-of-stock"
        : newItem.quantity < newItem.minStock
          ? "low-stock"
          : newItem.quantity > newItem.maxStock
            ? "overstocked"
            : "in-stock"

    const item = {
      ...newItem,
      id: Date.now().toString(),
      totalValue,
      lastUpdated: new Date().toISOString(),
      status,
    }

    setInventory((prev) => [...prev, item])
    setIsAddDialogOpen(false)
  }

  const handleEditItem = (updatedItem) => {
    const totalValue = updatedItem.quantity * updatedItem.unitPrice
    const status =
      updatedItem.quantity === 0
        ? "out-of-stock"
        : updatedItem.quantity < updatedItem.minStock
          ? "low-stock"
          : updatedItem.quantity > updatedItem.maxStock
            ? "overstocked"
            : "in-stock"

    const item = {
      ...updatedItem,
      totalValue,
      lastUpdated: new Date().toISOString(),
      status,
    }

    setInventory((prev) => prev.map((i) => (i.id === item.id ? item : i)))
    setEditingItem(null)
  }

  const handleDeleteItem = (id) => {
    setInventory((prev) => prev.filter((item) => item.id !== id))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Enhanced Inventory Management</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Comprehensive tracking with batch, expiry, and location details
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Inventory Item</DialogTitle>
              <DialogDescription>Enter the details for the new inventory item</DialogDescription>
            </DialogHeader>
            <EnhancedInventoryForm onSubmit={handleAddItem} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="h-5 w-5" />
            <span>Filters</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search items, SKU, batch..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="in-stock">In Stock</SelectItem>
                <SelectItem value="low-stock">Low Stock</SelectItem>
                <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                <SelectItem value="overstocked">Overstocked</SelectItem>
              </SelectContent>
            </Select>

            <Select value={warehouseFilter} onValueChange={setWarehouseFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Warehouse" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Warehouses</SelectItem>
                {warehouses.map((warehouse) => (
                  <SelectItem key={warehouse} value={warehouse}>
                    {warehouse}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Package className="h-5 w-5" />
            <span>Inventory Items ({filteredInventory.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item Details</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Unit Price</TableHead>
                  <TableHead>Total Value</TableHead>
                  <TableHead>Warehouse</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Batch/Expiry</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInventory.map((item) => (
                  <motion.tr
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-sm text-slate-500">{item.supplier}</div>
                      </div>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{item.sku}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      <div className="text-center">
                        <div className="font-medium">{item.quantity}</div>
                        <div className="text-xs text-slate-500">
                          Min: {item.minStock} | Max: {item.maxStock}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(item.totalValue)}</TableCell>
                    <TableCell>{item.warehouse}</TableCell>
                    <TableCell className="text-sm">{item.location}</TableCell>
                    <TableCell>
                      <div className="text-sm">Batch: {item.batch}</div>
                      <div className="text-xs text-slate-500">Exp: {item.expiryDate}</div>
                    </TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingItem(item)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteItem(item.id)}
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

      {/* Edit Dialog */}
      {editingItem && (
        <Dialog open={!!editingItem} onOpenChange={() => setEditingItem(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Inventory Item</DialogTitle>
              <DialogDescription>Update the details for this inventory item</DialogDescription>
            </DialogHeader>
            <EnhancedInventoryForm initialData={editingItem} onSubmit={handleEditItem} isEditing />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Form component for adding/editing enhanced inventory items
function EnhancedInventoryForm({ initialData, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    sku: initialData?.sku || "",
    category: initialData?.category || "",
    quantity: initialData?.quantity || 0,
    minStock: initialData?.minStock || 0,
    maxStock: initialData?.maxStock || 0,
    unitPrice: initialData?.unitPrice || 0,
    warehouse: initialData?.warehouse || "",
    supplier: initialData?.supplier || "",
    location: initialData?.location || "",
    batch: initialData?.batch || "",
    expiryDate: initialData?.expiryDate || "",
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
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="warehouse">Warehouse</Label>
          <Input
            id="warehouse"
            value={formData.warehouse}
            onChange={(e) => setFormData({ ...formData, warehouse: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="unitPrice">Unit Price (LKR)</Label>
          <Input
            id="unitPrice"
            type="number"
            step="0.01"
            value={formData.unitPrice}
            onChange={(e) => setFormData({ ...formData, unitPrice: Number.parseFloat(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minStock">Minimum Stock</Label>
          <Input
            id="minStock"
            type="number"
            value={formData.minStock}
            onChange={(e) => setFormData({ ...formData, minStock: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxStock">Maximum Stock</Label>
          <Input
            id="maxStock"
            type="number"
            value={formData.maxStock}
            onChange={(e) => setFormData({ ...formData, maxStock: Number.parseInt(e.target.value) || 0 })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            value={formData.supplier}
            onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Location (e.g., A1-B2-S3)</Label>
          <Input
            id="location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="batch">Batch Number</Label>
          <Input
            id="batch"
            value={formData.batch}
            onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          {isEditing ? "Update Item" : "Add Item"}
        </Button>
      </div>
    </form>
  )
}
