"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRightLeft, Plus, Clock, CheckCircle, XCircle, Truck, Package } from "lucide-react"
import { motion } from "framer-motion"

export function StockTransfers({ qualityMode }) {
  const [activeTab, setActiveTab] = useState("pending")

  const transferData = [
    {
      id: "TRF-001",
      product: "Gaming Laptop Pro",
      quantity: 10,
      from: "Main Warehouse",
      to: "Warehouse B",
      status: "pending",
      requestedBy: "John Doe",
      requestDate: "2024-01-15",
      priority: "high",
    },
    {
      id: "TRF-002",
      product: "Office Chair Deluxe",
      quantity: 5,
      from: "Warehouse C",
      to: "Main Warehouse",
      status: "approved",
      requestedBy: "Jane Smith",
      requestDate: "2024-01-14",
      priority: "medium",
    },
    {
      id: "TRF-003",
      product: "Wireless Mouse",
      quantity: 25,
      from: "Warehouse B",
      to: "Warehouse C",
      status: "completed",
      requestedBy: "Mike Johnson",
      requestDate: "2024-01-13",
      priority: "low",
    },
    {
      id: "TRF-004",
      product: '4K Monitor 27"',
      quantity: 8,
      from: "Main Warehouse",
      to: "Warehouse B",
      status: "rejected",
      requestedBy: "Sarah Wilson",
      requestDate: "2024-01-12",
      priority: "medium",
    },
  ]

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        )
      case "approved":
        return (
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            <Truck className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        )
      case "completed":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle className="h-3 w-3 mr-1" />
            Completed
          </Badge>
        )
      case "rejected":
        return (
          <Badge variant="destructive">
            <XCircle className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPriorityBadge = (priority) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return <Badge variant="outline">Low</Badge>
      default:
        return <Badge variant="outline">{priority}</Badge>
    }
  }

  const filteredTransfers = transferData.filter((transfer) => {
    if (activeTab === "all") return true
    return transfer.status === activeTab
  })

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <ArrowRightLeft className="h-5 w-5" />
                <span>Stock Transfers</span>
              </CardTitle>
              <CardDescription>Manage stock transfers between warehouses</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Transfer
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="rejected">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Transfer ID</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>From</TableHead>
                      <TableHead>To</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Requested By</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredTransfers.map((transfer, index) => (
                      <motion.tr
                        key={transfer.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-slate-50"
                      >
                        <TableCell className="font-medium">{transfer.id}</TableCell>
                        <TableCell>{transfer.product}</TableCell>
                        <TableCell>{transfer.quantity}</TableCell>
                        <TableCell>{transfer.from}</TableCell>
                        <TableCell>{transfer.to}</TableCell>
                        <TableCell>{getStatusBadge(transfer.status)}</TableCell>
                        <TableCell>{getPriorityBadge(transfer.priority)}</TableCell>
                        <TableCell>{transfer.requestedBy}</TableCell>
                        <TableCell>{transfer.requestDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            {transfer.status === "pending" && (
                              <>
                                <Button size="sm" variant="outline">
                                  Approve
                                </Button>
                                <Button size="sm" variant="outline">
                                  Reject
                                </Button>
                              </>
                            )}
                            {transfer.status === "approved" && (
                              <Button size="sm" variant="outline">
                                Mark Complete
                              </Button>
                            )}
                            <Button size="sm" variant="ghost">
                              View
                            </Button>
                          </div>
                        </TableCell>
                      </motion.tr>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {filteredTransfers.length === 0 && (
                <div className="text-center py-8">
                  <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                  <p className="text-slate-600">No transfers found for this status</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Transfer Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Pending</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {transferData.filter((t) => t.status === "pending").length}
                </p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Approved</p>
                <p className="text-2xl font-bold text-blue-600">
                  {transferData.filter((t) => t.status === "approved").length}
                </p>
              </div>
              <Truck className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">
                  {transferData.filter((t) => t.status === "completed").length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {transferData.filter((t) => t.status === "rejected").length}
                </p>
              </div>
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
