"use client"

import { useState } from "react"
import { GradientCard } from "@/components/ui/gradient-card"
import { GradientButton } from "@/components/ui/gradient-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Package, Plus, Edit, Trash2, Upload, Download, Barcode, Tag, DollarSign, QrCode } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

export function ProductManagement() {
  const [products, setProducts] = useState([
    {
      id: "1",
      sku: "LAP-001",
      name: "Gaming Laptop Pro",
      description: "High-performance gaming laptop with RTX graphics card and 16GB RAM",
      category: "Electronics",
      brand: "TechBrand",
      unitPrice: 1299.99,
      costPrice: 999.99,
      minStock: 10,
      maxStock: 100,
      currentStock: 45,
      unit: "pieces",
      barcode: "1234567890123",
      images: ["/placeholder.svg?height=200&width=200"],
      tags: ["gaming", "laptop", "high-performance"],
      status: "active",
      supplier: "Tech Solutions Ltd",
      location: "A-1-001",
      lastUpdated: "2024-01-15",
    },
  ])

  const [selectedProduct, setSelectedProduct] = useState(null)
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [filterStatus, setFilterStatus] = useState("all")

  const categories = ["Electronics", "Furniture", "Stationery", "Clothing", "Books"]
  const units = ["pieces", "kg", "liters", "meters", "boxes", "dozens"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === "all" || product.category === filterCategory
    const matchesStatus = filterStatus === "all" || product.status === filterStatus

    return matchesSearch && matchesCategory && matchesStatus
  })

  const getStockStatus = (product) => {
    if (product.currentStock === 0) return { status: "out-of-stock", color: "error", text: "Out of Stock" }
    if (product.currentStock <= product.minStock) return { status: "low-stock", color: "warning", text: "Low Stock" }
    return { status: "in-stock", color: "success", text: "In Stock" }
  }

  const ProductForm = ({ product, onSave, onCancel }) => {
    const [formData, setFormData] = useState(
      product || {
        sku: "",
        name: "",
        description: "",
        category: "",
        brand: "",
        unitPrice: 0,
        costPrice: 0,
        minStock: 0,
        maxStock: 0,
        currentStock: 0,
        unit: "pieces",
        images: [],
        tags: [],
        status: "active",
        supplier: "",
        location: "",
      },
    )

    const handleSubmit = (e) => {
      e.preventDefault()
      const newProduct = {
        ...formData,
        id: product?.id || Date.now().toString(),
        lastUpdated: new Date().toISOString().split("T")[0],
      }

      onSave(newProduct)
    }

    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <GradientCard
            title="Basic Information"
            icon={<Package className="h-5 w-5" />}
            headerGradient
            variant="primary"
          >
            <div className="space-y-4">
              <div>
                <Label htmlFor="sku">SKU *</Label>
                <Input
                  id="sku"
                  value={formData.sku}
                  onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                  placeholder="Enter product SKU"
                  required
                />
              </div>

              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
                  required
                />
              </div>

              <div>
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter product description"
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="brand">Brand</Label>
                  <Input
                    id="brand"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="Enter brand"
                  />
                </div>
              </div>
            </div>
          </GradientCard>

          {/* Pricing & Inventory */}
          <GradientCard
            title="Pricing & Inventory"
            icon={<DollarSign className="h-5 w-5" />}
            headerGradient
            variant="success"
          >
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="unitPrice">Unit Price *</Label>
                  <Input
                    id="unitPrice"
                    type="number"
                    step="0.01"
                    value={formData.unitPrice}
                    onChange={(e) => setFormData({ ...formData, unitPrice: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="costPrice">Cost Price</Label>
                  <Input
                    id="costPrice"
                    type="number"
                    step="0.01"
                    value={formData.costPrice}
                    onChange={(e) => setFormData({ ...formData, costPrice: Number.parseFloat(e.target.value) })}
                    placeholder="0.00"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="minStock">Min Stock</Label>
                  <Input
                    id="minStock"
                    type="number"
                    value={formData.minStock}
                    onChange={(e) => setFormData({ ...formData, minStock: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="maxStock">Max Stock</Label>
                  <Input
                    id="maxStock"
                    type="number"
                    value={formData.maxStock}
                    onChange={(e) => setFormData({ ...formData, maxStock: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>

                <div>
                  <Label htmlFor="currentStock">Current Stock</Label>
                  <Input
                    id="currentStock"
                    type="number"
                    value={formData.currentStock}
                    onChange={(e) => setFormData({ ...formData, currentStock: Number.parseInt(e.target.value) })}
                    placeholder="0"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={formData.unit} onValueChange={(value) => setFormData({ ...formData, unit: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {units.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </GradientCard>
        </div>

        {/* Additional Information */}
        <GradientCard
          title="Additional Information"
          icon={<Tag className="h-5 w-5" />}
          headerGradient
          variant="warning"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label htmlFor="supplier">Supplier</Label>
                <Input
                  id="supplier"
                  value={formData.supplier}
                  onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  placeholder="Enter supplier name"
                />
              </div>

              <div>
                <Label htmlFor="location">Storage Location</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g., A-1-001"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label htmlFor="barcode">Barcode</Label>
                <div className="flex space-x-2">
                  <Input
                    id="barcode"
                    value={formData.barcode}
                    onChange={(e) => setFormData({ ...formData, barcode: e.target.value })}
                    placeholder="Enter barcode"
                  />
                  <Button type="button" variant="outline" size="icon">
                    <QrCode className="h-4 w-4" />
                  </Button>
                </div>
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
                    <SelectItem value="discontinued">Discontinued</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </GradientCard>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <GradientButton type="submit" variant="primary">
            {product ? "Update Product" : "Create Product"}
          </GradientButton>
        </div>
      </form>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <GradientCard
        title="Product Management"
        description="Manage your product catalog with advanced features"
        icon={<Package className="h-6 w-6" />}
        headerGradient
        variant="primary"
      >
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <Input
              placeholder="Search products by name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="max-w-sm"
            />

            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Categories" />
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

            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="discontinued">Discontinued</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex gap-2">
            <GradientButton variant="success" icon={<Upload className="h-4 w-4" />} size="sm">
              Import
            </GradientButton>

            <GradientButton variant="neutral" icon={<Download className="h-4 w-4" />} size="sm">
              Export
            </GradientButton>

            <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
              <DialogTrigger asChild>
                <GradientButton variant="primary" icon={<Plus className="h-4 w-4" />} size="sm">
                  Add Product
                </GradientButton>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Product</DialogTitle>
                  <DialogDescription>Create a new product in your inventory system</DialogDescription>
                </DialogHeader>
                <ProductForm
                  onSave={(product) => {
                    setProducts([...products, product])
                    setIsAddingProduct(false)
                  }}
                  onCancel={() => setIsAddingProduct(false)}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </GradientCard>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <AnimatePresence>
          {filteredProducts.map((product, index) => {
            const stockStatus = getStockStatus(product)

            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.05 }}
              >
                <GradientCard hover className="h-full">
                  <div className="space-y-4">
                    {/* Product Image */}
                    <div className="relative">
                      <div className="aspect-square bg-gradient-to-br from-slate-100 to-slate-200 rounded-lg overflow-hidden">
                        <img
                          src={product.images[0] || "/placeholder.svg?height=200&width=200&query=product"}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Status Badge */}
                      <div className="absolute top-2 right-2">
                        <Badge
                          variant={stockStatus.status === "in-stock" ? "secondary" : "destructive"}
                          className={`${
                            stockStatus.color === "success"
                              ? "bg-green-100 text-green-800"
                              : stockStatus.color === "warning"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                          }`}
                        >
                          {stockStatus.text}
                        </Badge>
                      </div>
                    </div>

                    {/* Product Info */}
                    <div className="space-y-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-slate-900 line-clamp-2">{product.name}</h3>
                          <p className="text-sm text-slate-600">{product.sku}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">${product.unitPrice}</p>
                          <p className="text-xs text-slate-500">per {product.unit}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Stock: {product.currentStock}</span>
                        <Badge variant="outline">{product.category}</Badge>
                      </div>

                      {product.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {product.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{product.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2 pt-2 border-t">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedProduct(product)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>

                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700 bg-transparent">
                        <Trash2 className="h-4 w-4" />
                      </Button>

                      <Button variant="outline" size="sm">
                        <Barcode className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </GradientCard>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {filteredProducts.length === 0 && (
        <GradientCard>
          <div className="text-center py-12">
            <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">No products found</h3>
            <p className="text-slate-600 mb-4">
              {searchTerm || filterCategory !== "all" || filterStatus !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first product"}
            </p>
            {!searchTerm && filterCategory === "all" && filterStatus === "all" && (
              <GradientButton
                variant="primary"
                icon={<Plus className="h-4 w-4" />}
                onClick={() => setIsAddingProduct(true)}
              >
                Add Your First Product
              </GradientButton>
            )}
          </div>
        </GradientCard>
      )}

      {/* Edit Product Dialog */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
            <DialogDescription>Update product information and settings</DialogDescription>
          </DialogHeader>
          {selectedProduct && (
            <ProductForm
              product={selectedProduct}
              onSave={(updatedProduct) => {
                setProducts(products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p)))
                setSelectedProduct(null)
              }}
              onCancel={() => setSelectedProduct(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
