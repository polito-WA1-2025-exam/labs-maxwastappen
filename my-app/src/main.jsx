import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap CSS for styling
import './styles/index.css' // Import custom CSS styles
import App from './App.jsx' // Import the main App component

/**
 * This is the entry point of the React application.
 * It renders the App component into the DOM inside a StrictMode wrapper.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)