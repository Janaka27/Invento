// This is a placeholder for lib/diagnostics/interactive-elements.js
// In a real conversion, the content would be transformed from TypeScript to JavaScript.
export const logInteractiveElement = (element) => {
  console.log("Interactive element detected:", element)
}

export const getInteractiveElements = () => {
  return Array.from(document.querySelectorAll("button, a, input, select, textarea"))
}
