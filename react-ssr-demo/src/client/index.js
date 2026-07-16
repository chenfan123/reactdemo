import React from 'react'
import App from './App'
import { hydrateRoot } from 'react-dom/client'


hydrateRoot(document.getElementById("app"), <App />)
