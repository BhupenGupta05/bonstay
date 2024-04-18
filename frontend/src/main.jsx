import React from 'react'
import ReactDOM from 'react-dom/client'
import {HashRouter as Router} from 'react-router-dom'
import App from './App.jsx'
import './index.css'
// import { UserContextProvider } from './UserContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <UserContextProvider> */}
    <Router>
    <App />
    </Router>
    {/* </UserContextProvider> */}
    
    
  </React.StrictMode>
)