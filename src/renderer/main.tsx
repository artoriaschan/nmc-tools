import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import './index.css'

console.log('nodejs', window.nodejs)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
