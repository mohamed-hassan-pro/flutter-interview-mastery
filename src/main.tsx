console.log("main.tsx loading...");
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

console.log("Attempting to mount React app...");
const container = document.getElementById('root');
if (!container) {
  console.error("Failed to find root container!");
  alert("Root container not found!");
} else {
  console.log("Root container found, rendering...");
  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
  console.log("React render call finished.");
}
