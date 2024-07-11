import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HouseContextProvider from './website/HouseContext.jsx'
import { AuthProvider } from './website/AuthContext.jsx'



ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <React.StrictMode>
    <HouseContextProvider>
    <App />
    </HouseContextProvider>
  </React.StrictMode>
  </AuthProvider>


  
  
  
)
