import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { SnackbarProvider } from './context/toasterContext.jsx'
import { AuthProvider } from './context/authContext.jsx'

createRoot(document.getElementById('root')).render(
  <SnackbarProvider>
    <AuthProvider>
      <App />
    </AuthProvider>
  </SnackbarProvider>
)
