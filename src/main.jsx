import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Shop } from './components/shop'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Shop></Shop>
  </StrictMode>,
)
