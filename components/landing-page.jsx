"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, BarChart3, Shield, Globe, Zap, Users, Star, ArrowRight, Play, Menu, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { GradientButton } from "@/components/ui/gradient-button"
import { GradientCard } from "@/components/ui/gradient-card"

export function LandingPage({ onNavigateToLogin }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const features = [
    {
      icon: Package,
      title: "Smart Inventory Control",
      description: "Real-time stock tracking with automated alerts and intelligent forecasting",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description: "Comprehensive reporting and business intelligence for data-driven decisions",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      icon: Shield,
      title: "Role-Based Security",
      description: "Granular permissions and multi-level access control for your team",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      icon: Globe,
      title: "Multi-Warehouse Support",
      description: "Manage multiple locations with centralized control and coordination",
      gradient: "from-orange-500 to-red-500",
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Optimized performance with instant updates and seamless user experience",
      gradient: "from-yellow-500 to-orange-500",
    },
    {
      icon: Users,
      title: "Team Collaboration",
      description: "Built-in communication tools and workflow management for your team",
      gradient: "from-indigo-500 to-purple-500",
    },
  ]

  const testimonials = [
    {
      name: "Rajesh Patel",
      role: "Operations Manager",
      company: "Ceylon Spice Co.",
      content:
        "Invento transformed our inventory management. We reduced stock-outs by 85% and improved efficiency across all our warehouses.",
      rating: 5,
    },
    {
      name: "Priya Fernando",
      role: "CEO",
      company: "Lanka Tea Exports",
      content:
        "The Sri Lankan standards compliance and multi-warehouse features are exactly what we needed for our export business.",
      rating: 5,
    },
    {
      name: "Sunil Wickramasinghe",
      role: "Warehouse Manager",
      company: "Colombo Distribution Hub",
      content:
        "Real-time tracking and automated alerts have saved us countless hours. The ROI was immediate and substantial.",
      rating: 5,
    },
  ]

  const stats = [
    { label: "Active Users", value: "10,000+", gradient: "from-blue-500 to-cyan-500" },
    { label: "Warehouses Managed", value: "500+", gradient: "from-green-500 to-emerald-500" },
    { label: "Products Tracked", value: "1M+", gradient: "from-purple-500 to-pink-500" },
    { label: "Cost Savings", value: "30%", gradient: "from-orange-500 to-red-500" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [testimonials.length])

  const handleGetStarted = () => {
    console.log("Get Started clicked - navigating to login")
    onNavigateToLogin()
  }

  const handleSignIn = () => {
    console.log("Sign In clicked - navigating to login")
    onNavigateToLogin()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Package className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Invento
                </h1>
                <p className="text-xs text-slate-600">Sri Lankan Standards</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors">
                Features
              </a>
              <a href="#testimonials" className="text-slate-600 hover:text-slate-900 transition-colors">
                Testimonials
              </a>
              <a href="#pricing" className="text-slate-600 hover:text-slate-900 transition-colors">
                Pricing
              </a>
              <Button variant="ghost" onClick={handleSignIn}>
                Sign In
              </Button>
              <GradientButton onClick={handleGetStarted} variant="primary">
                Get Started
              </GradientButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-slate-200 bg-white"
              >
                <div className="px-4 py-4 space-y-4">
                  <a href="#features" className="block text-slate-600 hover:text-slate-900">
                    Features
                  </a>
                  <a href="#testimonials" className="block text-slate-600 hover:text-slate-900">
                    Testimonials
                  </a>
                  <a href="#pricing" className="block text-slate-600 hover:text-slate-900">
                    Pricing
                  </a>
                  <div className="space-y-2 pt-4 border-t border-slate-200">
                    <Button variant="ghost" className="w-full" onClick={handleSignIn}>
                      Sign In
                    </Button>
                    <GradientButton className="w-full" onClick={handleGetStarted} variant="primary">
                      Get Started
                    </GradientButton>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white border-0">
                🇱🇰 Built for Sri Lankan Businesses
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6">
                Modern Inventory
                <br />
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Management System
                </span>
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                Streamline your inventory operations with our comprehensive solution designed specifically for Sri
                Lankan businesses. Real-time tracking, advanced analytics, and seamless integration.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4"
            >
              <GradientButton size="lg" onClick={handleGetStarted} variant="primary">
                Get Started Free
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
              <Button size="lg" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-16"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className={`text-3xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent`}>
                    {stat.value}
                  </div>
                  <div className="text-slate-600 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Everything You Need to Manage Inventory
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Comprehensive features designed to streamline your operations and boost productivity
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <GradientCard hover className="h-full p-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${feature.gradient} w-fit mb-4`}>
                    <feature.icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2">{feature.title}</h3>
                  <p className="text-slate-600">{feature.description}</p>
                </GradientCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Trusted by Sri Lankan Businesses</h2>
            <p className="text-xl text-slate-600">See what our customers have to say about their experience</p>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={currentTestimonial}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="text-center p-8">
                <CardContent className="space-y-6">
                  <div className="flex justify-center space-x-1">
                    {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <blockquote className="text-xl text-slate-700 italic">
                    "{testimonials[currentTestimonial].content}"
                  </blockquote>
                  <div>
                    <div className="font-semibold text-slate-900">{testimonials[currentTestimonial].name}</div>
                    <div className="text-slate-600">
                      {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentTestimonial ? "bg-blue-600" : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-8"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
              Ready to Transform Your Inventory Management?
            </h2>
            <p className="text-xl text-slate-600">
              Join thousands of Sri Lankan businesses already using Invento to streamline their operations
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <GradientButton size="lg" onClick={handleGetStarted} variant="primary">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4" />
              </GradientButton>
              <Button size="lg" variant="outline" onClick={handleSignIn}>
                Sign In to Existing Account
              </Button>
            </div>
            <p className="text-sm text-slate-500">No credit card required • 14-day free trial • Cancel anytime</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                  <Package className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">Invento</h3>
                  <p className="text-sm text-slate-400">Sri Lankan Standards</p>
                </div>
              </div>
              <p className="text-slate-400">
                Modern inventory management solution built specifically for Sri Lankan businesses.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Security
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Integrations
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-slate-400">
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Documentation
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    API Reference
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition-colors">
                    Status
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-slate-400">
            <p>&copy; 2024 Invento. All rights reserved. Built with ❤️ for Sri Lankan businesses.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
