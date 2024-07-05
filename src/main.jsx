import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import HouseContextProvider from './website/HouseContext.jsx'

import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <React.StrictMode>
    <HouseContextProvider>
    <App />
    </HouseContextProvider>
  </React.StrictMode>

  </Router>
  
  
  
)
