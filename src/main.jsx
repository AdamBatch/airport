import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import DataManipulation from './dataManipulation.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <DataManipulation />
  </StrictMode>,
)
