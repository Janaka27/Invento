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
import { User, Plus, Search, Edit, Trash2, DollarSign, TrendingUp } from "lucide-react"
import { motion } from "framer-motion"
import { Users } from "lucide-react" // Import Users icon

const SAMPLE_CUSTOMERS = [
  {
    id: "1",
    name: "Priya Perera",
    email: "priya@example.com",
    phone: "+94 77 123 4567",
    address: "123 Galle Road, Colombo 03",
    city: "Colombo",
    province: "Western",
    loyaltyTier: "Gold",
    totalOrders: 15,
    totalSpent: 150000.0,
    lastOrderDate: "2024-01-20",
    status: "active",
  },
  {
    id: "2",
    name: "Nimal Fernando",
    email: "nimal@example.com",
    phone: "+94 71 987 6543",
    address: "456 Kandy Road, Peradeniya",
    city: "Kandy",
    province: "Central",
    loyaltyTier: "Silver",
    totalOrders: 8,
    totalSpent: 75000.0,
    lastOrderDate: "2023-12-15",
    status: "active",
  },
  {
    id: "3",
    name: "Sanduni Wickramasinghe",
    email: "sanduni@example.com",
    phone: "+94 76 555 1234",
    address: "789 Matara Road, Galle",
    city: "Galle",
    province: "Southern",
    loyaltyTier: "Bronze",
    totalOrders: 3,
    totalSpent: 25000.0,
    lastOrderDate: "2023-11-01",
    status: "inactive",
  },
  {
    id: "4",
    name: "Chamara Rathnayake",
    email: "chamara@example.com",
    phone: "+94 78 999 8888",
    address: "321 Negombo Road, Wattala",
    city: "Gampaha",
    province: "Western",
    loyaltyTier: "Gold",
    totalOrders: 22,
    totalSpent: 250000.0,
    lastOrderDate: "2024-01-22",
    status: "active",
  },
]

export function CustomerManagement() {
  const [customers, setCustomers] = useState(SAMPLE_CUSTOMERS)
  const [searchTerm, setSearchTerm] = useState("")
  const [loyaltyFilter, setLoyaltyFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [editingCustomer, setEditingCustomer] = useState(null)

  const filteredCustomers = useMemo(() => {
    return customers.filter((customer) => {
      const matchesSearch =
        customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        customer.phone.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesLoyalty = loyaltyFilter === "all" || customer.loyaltyTier === loyaltyFilter
      const matchesStatus = statusFilter === "all" || customer.status === statusFilter

      return matchesSearch && matchesLoyalty && matchesStatus
    })
  }, [customers, searchTerm, loyaltyFilter, statusFilter])

  const loyaltyTiers = Array.from(new Set(customers.map((customer) => customer.loyaltyTier)))

  const getLoyaltyBadge = (tier) => {
    switch (tier) {
      case "Gold":
        return <Badge className="bg-yellow-500 text-white">Gold</Badge>
      case "Silver":
        return <Badge className="bg-slate-400 text-white">Silver</Badge>
      case "Bronze":
        return <Badge className="bg-orange-500 text-white">Bronze</Badge>
      default:
        return <Badge variant="outline">{tier}</Badge>
    }
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case "active":
        return <Badge className="bg-green-500 text-white">Active</Badge>
      case "inactive":
        return <Badge className="bg-red-500 text-white">Inactive</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-LK", {
      style: "currency",
      currency: "LKR",
    }).format(amount)
  }

  const handleAddCustomer = (newCustomer) => {
    const customer = {
      ...newCustomer,
      id: Date.now().toString(),
      totalOrders: 0,
      totalSpent: 0,
      lastOrderDate: "N/A",
      status: "active",
    }
    setCustomers((prev) => [...prev, customer])
    setIsAddDialogOpen(false)
  }

  const handleEditCustomer = (updatedCustomer) => {
    setCustomers((prev) => prev.map((c) => (c.id === updatedCustomer.id ? updatedCustomer : c)))
    setEditingCustomer(null)
  }

  const handleDeleteCustomer = (id) => {
    setCustomers((prev) => prev.filter((customer) => customer.id !== id))
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Customer Management</h1>
          <p className="text-slate-600 dark:text-slate-400">Manage your customer database and track interactions</p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Add New Customer</DialogTitle>
              <DialogDescription>Enter the details for the new customer</DialogDescription>
            </DialogHeader>
            <CustomerForm onSubmit={handleAddCustomer} />
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Input
              placeholder="Search by name, email, or phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="col-span-full md:col-span-1"
            />

            <Select value={loyaltyFilter} onValueChange={setLoyaltyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Loyalty Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                {loyaltyTiers.map((tier) => (
                  <SelectItem key={tier} value={tier}>
                    {tier}
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Customer Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="h-5 w-5" />
            <span>Customer List ({filteredCustomers.length})</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Loyalty</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Last Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCustomers.map((customer) => (
                  <motion.tr
                    key={customer.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.05 }}
                  >
                    <TableCell>
                      <div>
                        <div className="font-medium">{customer.name}</div>
                        <div className="text-sm text-slate-500">{customer.email}</div>
                      </div>
                    </TableCell>
                    <TableCell className="text-sm">{customer.phone}</TableCell>
                    <TableCell>
                      <div>
                        <div className="text-sm">{customer.city}</div>
                        <div className="text-xs text-slate-500">{customer.province}</div>
                      </div>
                    </TableCell>
                    <TableCell>{getLoyaltyBadge(customer.loyaltyTier)}</TableCell>
                    <TableCell className="text-center">{customer.totalOrders}</TableCell>
                    <TableCell className="font-medium">{formatCurrency(customer.totalSpent)}</TableCell>
                    <TableCell>{customer.lastOrderDate}</TableCell>
                    <TableCell>{getStatusBadge(customer.status)}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline" onClick={() => setEditingCustomer(customer)}>
                          <Edit className="h-3 w-3" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteCustomer(customer.id)}
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

      {/* Customer Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Total Customers</p>
                <p className="text-2xl font-bold text-blue-600">{customers.length}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Avg. Order Value</p>
                <p className="text-2xl font-bold text-green-600">
                  {formatCurrency(
                    customers.reduce((sum, c) => sum + c.totalSpent, 0) /
                      customers.reduce((sum, c) => sum + c.totalOrders, 0),
                  )}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Repeat Customers</p>
                <p className="text-2xl font-bold text-purple-600">
                  {customers.filter((c) => c.totalOrders > 1).length}
                </p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit Dialog */}
      {editingCustomer && (
        <Dialog open={!!editingCustomer} onOpenChange={() => setEditingCustomer(null)}>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Edit Customer</DialogTitle>
              <DialogDescription>Update the details for this customer</DialogDescription>
            </DialogHeader>
            <CustomerForm initialData={editingCustomer} onSubmit={handleEditCustomer} isEditing />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

// Form component for adding/editing customers
function CustomerForm({ initialData, onSubmit, isEditing = false }) {
  const [formData, setFormData] = useState({
    name: initialData?.name || "",
    email: initialData?.email || "",
    phone: initialData?.phone || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    province: initialData?.province || "",
    loyaltyTier: initialData?.loyaltyTier || "Bronze",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (isEditing && initialData) {
      onSubmit({ ...initialData, ...formData })
    } else {
      onSubmit(formData)
    }
  }

  const sriLankanProvinces = [
    { name: "Western", cities: ["Colombo", "Gampaha", "Kalutara"] },
    { name: "Central", cities: ["Kandy", "Matale", "Nuwara Eliya"] },
    { name: "Southern", cities: ["Galle", "Matara", "Hambantota"] },
    { name: "Northern", cities: ["Jaffna", "Kilinochchi", "Mannar", "Mullaitivu", "Vavuniya"] },
    { name: "Eastern", cities: ["Ampara", "Batticaloa", "Trincomalee"] },
    { name: "North Western", cities: ["Kurunegala", "Puttalam"] },
    { name: "North Central", cities: ["Anuradhapura", "Polonnaruwa"] },
    { name: "Uva", cities: ["Badulla", "Monaragala"] },
    { name: "Sabaragamuwa", cities: ["Ratnapura", "Kegalle"] },
  ]

  const selectedProvinceData = sriLankanProvinces.find((p) => p.name === formData.province)
  const citiesInSelectedProvince = selectedProvinceData ? selectedProvinceData.cities : []

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
          <Label htmlFor="loyaltyTier">Loyalty Tier</Label>
          <Select
            value={formData.loyaltyTier}
            onValueChange={(value) => setFormData({ ...formData, loyaltyTier: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select tier" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Bronze">Bronze</SelectItem>
              <SelectItem value="Silver">Silver</SelectItem>
              <SelectItem value="Gold">Gold</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>
        <Textarea
          id="address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="province">Province</Label>
          <Select
            value={formData.province}
            onValueChange={(value) => setFormData({ ...formData, province: value, city: "" })}
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

        <div className="space-y-2">
          <Label htmlFor="city">City</Label>
          <Select
            value={formData.city}
            onValueChange={(value) => setFormData({ ...formData, city: value })}
            disabled={!formData.province}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select city" />
            </SelectTrigger>
            <SelectContent>
              {citiesInSelectedProvince.map((city) => (
                <SelectItem key={city} value={city}>
                  {city}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
          {isEditing ? "Update Customer" : "Add Customer"}
        </Button>
      </div>
    </form>
  )
}
