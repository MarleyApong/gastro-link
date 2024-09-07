import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'
import InactivityHandler from './guard/InactivityHandlerGuard.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import '@fontsource/poppins'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import 'survey-core/defaultV2.min.css'
import "survey-core/defaultV2.min.css"
import "survey-creator-core/survey-creator-core.min.css"

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <Toaster
            position="top-center"
            reverseOrder={false}
         />
         <InactivityHandler />
         <App />
      </BrowserRouter>
   </React.StrictMode>,
)