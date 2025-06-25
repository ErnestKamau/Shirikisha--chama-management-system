import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App' // Verify this path is correct
import './index.css' // Ensure this file exists and is correctly set up

// ✅ Correct way (React 18+)
const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

