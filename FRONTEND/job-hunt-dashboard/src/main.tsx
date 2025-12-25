import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// 1. IMPORT THE PROVIDER
// (Ensure this path matches your file name: JobsContext.tsx)
import { JobsProvider } from './context/JobsContext'; 

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* 2. WRAP THE APP SO EVERY COMPONENT CAN SEE THE DATA */}
    <JobsProvider>
      <App />
    </JobsProvider>
  </StrictMode>,
)