// This is a placeholder for lib/sri-lankan-standards.js
// In a real conversion, the content would be transformed from TypeScript to JavaScript.
export const getSriLankanProvinces = () => {
  return [
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
}

export const formatCurrencyLKR = (amount) => {
  return new Intl.NumberFormat("en-LK", {
    style: "currency",
    currency: "LKR",
  }).format(amount)
}

export const validateSriLankanPhoneNumber = (phone) => {
  const regex = /^(?:\+94|0)?(7\d{8})$/
  return regex.test(phone)
}
