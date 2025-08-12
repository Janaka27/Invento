// External API Integration Script for Invento
// This script demonstrates integration with external services

const API_BASE_URL = "https://api.invento.demo"
const API_KEY = process.env.INVENTO_API_KEY || "demo-api-key"

// Currency conversion API for international suppliers
async function convertCurrency(amount, fromCurrency, toCurrency) {
  try {
    const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    const data = await response.json()

    const rate = data.rates[toCurrency]
    const convertedAmount = amount * rate

    return {
      originalAmount: amount,
      originalCurrency: fromCurrency,
      convertedAmount: Number.parseFloat(convertedAmount.toFixed(2)),
      targetCurrency: toCurrency,
      exchangeRate: rate,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Currency conversion error:", error)
    return null
  }
}

// Email notification service integration
async function sendNotificationEmail(to, subject, message, type = "info") {
  try {
    const emailData = {
      to: to,
      subject: subject,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Invento Notification</h1>
          </div>
          <div style="padding: 20px; background: #f8f9fa;">
            <div style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h2 style="color: #333; margin-top: 0;">${subject}</h2>
              <p style="color: #666; line-height: 1.6;">${message}</p>
              <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee;">
                <p style="color: #999; font-size: 12px; margin: 0;">
                  This is an automated message from your Invento Inventory Management System.
                  <br>Timestamp: ${new Date().toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      `,
      type: type,
    }

    // In a real implementation, this would use a service like SendGrid, Mailgun, or AWS SES
    console.log("Email notification sent:", emailData)

    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("Email sending error:", error)
    return { success: false, error: error.message }
  }
}

// SMS notification service integration
async function sendSMSNotification(phoneNumber, message) {
  try {
    const smsData = {
      to: phoneNumber,
      message: `[Invento] ${message}`,
      timestamp: new Date().toISOString(),
    }

    // In a real implementation, this would use a service like Twilio or AWS SNS
    console.log("SMS notification sent:", smsData)

    return {
      success: true,
      messageId: `sms_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("SMS sending error:", error)
    return { success: false, error: error.message }
  }
}

// Barcode generation service
async function generateBarcode(sku, format = "CODE128") {
  try {
    // In a real implementation, this would use a barcode generation service
    const barcodeData = {
      sku: sku,
      format: format,
      imageUrl: `https://api.barcode-generator.com/generate?text=${sku}&format=${format}`,
      timestamp: new Date().toISOString(),
    }

    console.log("Barcode generated:", barcodeData)

    return barcodeData
  } catch (error) {
    console.error("Barcode generation error:", error)
    return null
  }
}

// Shipping rate calculation API
async function calculateShippingRates(origin, destination, weight, dimensions) {
  try {
    const shippingData = {
      origin: origin,
      destination: destination,
      weight: weight, // in kg
      dimensions: dimensions, // {length, width, height} in cm
      rates: [
        {
          carrier: "Standard Delivery",
          service: "Ground",
          cost: 15.99,
          estimatedDays: "3-5",
          currency: "USD",
        },
        {
          carrier: "Express Delivery",
          service: "Express",
          cost: 29.99,
          estimatedDays: "1-2",
          currency: "USD",
        },
        {
          carrier: "Overnight",
          service: "Next Day",
          cost: 49.99,
          estimatedDays: "1",
          currency: "USD",
        },
      ],
    }

    console.log("Shipping rates calculated:", shippingData)
    return shippingData
  } catch (error) {
    console.error("Shipping calculation error:", error)
    return null
  }
}

// Inventory analytics API
async function getInventoryAnalytics(warehouseId, dateRange) {
  try {
    // Simulate analytics data
    const analytics = {
      warehouseId: warehouseId,
      dateRange: dateRange,
      metrics: {
        totalProducts: 1247,
        totalValue: 156789.45,
        turnoverRate: 4.2,
        lowStockItems: 23,
        outOfStockItems: 5,
        topSellingProducts: [
          { sku: "LAP-001", name: "Gaming Laptop Pro", unitsSold: 45 },
          { sku: "MOU-003", name: "Wireless Mouse", unitsSold: 156 },
          { sku: "NOT-007", name: "Notebook A4", unitsSold: 234 },
        ],
        categoryPerformance: [
          { category: "Electronics", revenue: 89456.78, percentage: 57.2 },
          { category: "Furniture", revenue: 34567.89, percentage: 22.1 },
          { category: "Stationery", revenue: 32764.78, percentage: 20.7 },
        ],
      },
      timestamp: new Date().toISOString(),
    }

    console.log("Analytics data retrieved:", analytics)
    return analytics
  } catch (error) {
    console.error("Analytics API error:", error)
    return null
  }
}

// ERP system integration
async function syncWithERP(data, operation) {
  try {
    const erpData = {
      operation: operation, // 'create', 'update', 'delete'
      data: data,
      timestamp: new Date().toISOString(),
      systemId: "invento-v1.0",
    }

    // In a real implementation, this would sync with systems like SAP, Oracle, etc.
    console.log("ERP sync initiated:", erpData)

    return {
      success: true,
      syncId: `sync_${Date.now()}`,
      timestamp: new Date().toISOString(),
    }
  } catch (error) {
    console.error("ERP sync error:", error)
    return { success: false, error: error.message }
  }
}

// Automated low stock alerts
async function checkLowStockAndNotify() {
  try {
    // This would typically query the database for low stock items
    const lowStockItems = [
      { sku: "CHR-002", name: "Office Chair Deluxe", currentStock: 8, minStock: 15, warehouse: "Warehouse B" },
      { sku: "MOU-003", name: "Wireless Mouse", currentStock: 0, minStock: 20, warehouse: "Warehouse B" },
      { sku: "MON-004", name: '4K Monitor 27"', currentStock: 3, minStock: 8, warehouse: "Warehouse C" },
    ]

    for (const item of lowStockItems) {
      const message = `Low stock alert: ${item.name} (${item.sku}) has ${item.currentStock} units remaining (minimum: ${item.minStock}) at ${item.warehouse}`

      // Send email notification
      await sendNotificationEmail("manager@invento.com", "Low Stock Alert", message, "warning")

      // Send SMS for critical items (out of stock)
      if (item.currentStock === 0) {
        await sendSMSNotification("+94771234567", `URGENT: ${item.name} is out of stock at ${item.warehouse}`)
      }
    }

    console.log("Low stock notifications sent for", lowStockItems.length, "items")
    return { success: true, itemsProcessed: lowStockItems.length }
  } catch (error) {
    console.error("Low stock check error:", error)
    return { success: false, error: error.message }
  }
}

// General API call function
async function callApi(endpoint, method = "GET", data = null) {
  const options = {
    method,
    headers: {
      "Content-Type": "application/json",
      // Add authorization headers if needed
    },
  }

  if (data) {
    options.body = JSON.stringify(data)
  }

  try {
    const response = await fetch(`/api/${endpoint}`, options)
    if (!response.ok) {
      throw new Error(`API call failed: ${response.statusText}`)
    }
    return await response.json()
  } catch (error) {
    console.error("API Integration Error:", error)
    throw error
  }
}

// Export functions for use in the application
module.exports = {
  convertCurrency,
  sendNotificationEmail,
  sendSMSNotification,
  generateBarcode,
  calculateShippingRates,
  getInventoryAnalytics,
  syncWithERP,
  checkLowStockAndNotify,
  callApi,
}

// Example usage and testing
async function runIntegrationTests() {
  console.log("🚀 Starting Invento API Integration Tests...\n")

  // Test currency conversion
  console.log("\n2. Testing currency conversion...")
  const conversion = await convertCurrency(1000, "USD", "LKR")
  console.log("Currency conversion:", conversion)

  // Test email notification
  console.log("\n3. Testing email notification...")
  const emailResult = await sendNotificationEmail(
    "test@invento.com",
    "Test Notification",
    "This is a test notification from the Invento system.",
  )
  console.log("Email result:", emailResult)

  // Test barcode generation
  console.log("\n4. Testing barcode generation...")
  const barcode = await generateBarcode("LAP-001")
  console.log("Barcode data:", barcode)

  // Test shipping calculation
  console.log("\n5. Testing shipping calculation...")
  const shipping = await calculateShippingRates("Colombo, Sri Lanka", "Kandy, Sri Lanka", 2.5, {
    length: 30,
    width: 20,
    height: 15,
  })
  console.log("Shipping rates:", shipping)

  // Test analytics
  console.log("\n6. Testing inventory analytics...")
  const analytics = await getInventoryAnalytics(1, "2024-01-01,2024-01-31")
  console.log("Analytics data:", analytics)

  // Test low stock alerts
  console.log("\n7. Testing low stock alerts...")
  const alertResult = await checkLowStockAndNotify()
  console.log("Alert result:", alertResult)

  console.log("\n✅ Integration tests completed!")
}

// Run tests if this script is executed directly
if (require.main === module) {
  runIntegrationTests().catch(console.error)
}
