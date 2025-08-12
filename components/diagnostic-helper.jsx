"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Terminal,
  Bug,
  Wrench,
  Network,
  Code,
  CheckCircle,
  XCircle,
  Info,
  Lightbulb,
  Search,
  Play,
  StopCircle,
} from "lucide-react"
import { runComprehensiveCheck } from "@/lib/diagnostics/comprehensive-check"
import { getInteractiveElements, logInteractiveElement } from "@/lib/diagnostics/interactive-elements"
import { fixInteractiveElement } from "@/lib/diagnostics/interactive-fixer"
import { startNetworkMonitor, stopNetworkMonitor } from "@/lib/diagnostics/network-monitor"
import { applyEventHandlerFixes } from "@/lib/diagnostics/event-handler-fixes"
import { applyCssFixes } from "@/lib/diagnostics/css-fixes"

export function DiagnosticHelper() {
  const [logs, setLogs] = useState([])
  const [activeTab, setActiveTab] = useState("overview")

  const addLog = (message, type = "info") => {
    setLogs((prev) => [...prev, { message, type, timestamp: new Date().toLocaleTimeString() }])
  }

  const clearLogs = () => {
    setLogs([])
  }

  const handleRunComprehensiveCheck = () => {
    clearLogs()
    addLog("Running comprehensive check...", "info")
    try {
      runComprehensiveCheck()
      addLog("Comprehensive check completed successfully.", "success")
    } catch (error) {
      addLog(`Comprehensive check failed: ${error.message}`, "error")
    }
  }

  const handleInspectElements = () => {
    clearLogs()
    addLog("Inspecting interactive elements...", "info")
    const elements = getInteractiveElements()
    if (elements.length > 0) {
      elements.forEach((el) => logInteractiveElement(el))
      addLog(`Found ${elements.length} interactive elements.`, "success")
    } else {
      addLog("No interactive elements found.", "info")
    }
  }

  const handleApplyFixes = () => {
    clearLogs()
    addLog("Applying common fixes...", "info")
    try {
      const elements = getInteractiveElements()
      elements.forEach((el) => {
        fixInteractiveElement(el)
        applyEventHandlerFixes(el)
        applyCssFixes(el)
      })
      addLog("Common fixes applied to interactive elements and CSS.", "success")
    } catch (error) {
      addLog(`Failed to apply fixes: ${error.message}`, "error")
    }
  }

  const handleMonitorNetwork = () => {
    clearLogs()
    addLog("Starting network monitor...", "info")
    startNetworkMonitor()
    addLog("Network monitoring active. Check browser console for network logs.", "info")
  }

  const handleStopMonitorNetwork = () => {
    clearLogs()
    addLog("Stopping network monitor...", "info")
    stopNetworkMonitor()
    addLog("Network monitoring stopped.", "info")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="fixed bottom-4 right-4 z-50 shadow-lg bg-blue-600 text-white hover:bg-blue-700 hover:text-white"
        >
          <Bug className="h-4 w-4 mr-2" />
          Diagnostics
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Bug className="h-6 w-6" />
            <span>Invento Diagnostic Helper</span>
          </DialogTitle>
          <DialogDescription>Tools to help debug and optimize the Invento application.</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="elements">Elements</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="console">Console</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="flex-1 overflow-auto p-4">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Lightbulb className="h-5 w-5 text-blue-600" />
                    <span>Quick Tips</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-slate-700">
                  <p>
                    • Use the "Elements" tab to check for common UI issues like missing `alt` tags or accessibility
                    attributes.
                  </p>
                  <p>• The "Network" tab can help identify slow API calls or large asset loads.</p>
                  <p>• "Apply Common Fixes" attempts to resolve basic HTML/CSS/JS issues automatically.</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Wrench className="h-5 w-5 text-green-600" />
                    <span>Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button onClick={handleRunComprehensiveCheck} className="w-full">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Run Comprehensive Check
                  </Button>
                  <Button onClick={handleApplyFixes} className="w-full">
                    <Wrench className="h-4 w-4 mr-2" />
                    Apply Common Fixes
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="elements" className="flex-1 flex flex-col p-4">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Code className="h-5 w-5 text-purple-600" />
                  <span>Interactive Elements</span>
                </CardTitle>
                <DialogDescription>Inspect and fix issues with buttons, links, and inputs.</DialogDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex space-x-2 mb-4">
                  <Button onClick={handleInspectElements} size="sm">
                    <Search className="h-4 w-4 mr-2" />
                    Inspect Elements
                  </Button>
                  <Button onClick={handleApplyFixes} size="sm">
                    <Wrench className="h-4 w-4 mr-2" />
                    Apply Element Fixes
                  </Button>
                </div>
                <ScrollArea className="flex-1 border rounded-md p-4 bg-slate-50">
                  <div className="font-mono text-sm text-slate-800 space-y-1">
                    {logs
                      .filter((log) => log.message.includes("element"))
                      .map((log, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 ${log.type === "error" ? "text-red-600" : ""}`}
                        >
                          {log.type === "info" && <Info className="h-3 w-3" />}
                          {log.type === "success" && <CheckCircle className="h-3 w-3 text-green-600" />}
                          {log.type === "error" && <XCircle className="h-3 w-3 text-red-600" />}
                          <span>
                            [{log.timestamp}] {log.message}
                          </span>
                        </div>
                      ))}
                    {logs.filter((log) => log.message.includes("element")).length === 0 && (
                      <p className="text-slate-500">Run "Inspect Elements" to see results.</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="network" className="flex-1 flex flex-col p-4">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Network className="h-5 w-5 text-orange-600" />
                  <span>Network Monitor</span>
                </CardTitle>
                <DialogDescription>Monitor network requests and responses.</DialogDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <div className="flex space-x-2 mb-4">
                  <Button onClick={handleMonitorNetwork} size="sm">
                    <Play className="h-4 w-4 mr-2" />
                    Start Monitoring
                  </Button>
                  <Button onClick={handleStopMonitorNetwork} size="sm" variant="outline">
                    <StopCircle className="h-4 w-4 mr-2" />
                    Stop Monitoring
                  </Button>
                </div>
                <ScrollArea className="flex-1 border rounded-md p-4 bg-slate-50">
                  <div className="font-mono text-sm text-slate-800 space-y-1">
                    {logs
                      .filter(
                        (log) => log.message.includes("Network monitoring") || log.message.includes("Fetch request"),
                      )
                      .map((log, index) => (
                        <div
                          key={index}
                          className={`flex items-center space-x-2 ${log.type === "error" ? "text-red-600" : ""}`}
                        >
                          {log.type === "info" && <Info className="h-3 w-3" />}
                          {log.type === "success" && <CheckCircle className="h-3 w-3 text-green-600" />}
                          {log.type === "error" && <XCircle className="h-3 w-3 text-red-600" />}
                          <span>
                            [{log.timestamp}] {log.message}
                          </span>
                        </div>
                      ))}
                    {logs.filter(
                      (log) => log.message.includes("Network monitoring") || log.message.includes("Fetch request"),
                    ).length === 0 && <p className="text-slate-500">Start monitoring to see network activity.</p>}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="console" className="flex-1 flex flex-col p-4">
            <Card className="flex-1 flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Terminal className="h-5 w-5 text-slate-600" />
                  <span>Console Logs</span>
                </CardTitle>
                <DialogDescription>View internal diagnostic logs.</DialogDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col">
                <Button onClick={clearLogs} size="sm" className="mb-4">
                  Clear Logs
                </Button>
                <ScrollArea className="flex-1 border rounded-md p-4 bg-slate-900 text-white">
                  <div className="font-mono text-xs space-y-1">
                    {logs.map((log, index) => (
                      <div
                        key={index}
                        className={`flex items-center space-x-2 ${log.type === "error" ? "text-red-400" : log.type === "success" ? "text-green-400" : "text-slate-200"}`}
                      >
                        {log.type === "info" && <Info className="h-3 w-3" />}
                        {log.type === "success" && <CheckCircle className="h-3 w-3 text-green-400" />}
                        {log.type === "error" && <XCircle className="h-3 w-3 text-red-400" />}
                        <span>
                          [{log.timestamp}] {log.message}
                        </span>
                      </div>
                    ))}
                    {logs.length === 0 && (
                      <p className="text-slate-500">No logs yet. Run a check or action to see output.</p>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
