import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Toaster } from 'react-hot-toast'
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.scss'
import '@fontsource/poppins'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import { BrowserRouter } from 'react-router-dom'

// if ('serviceWorker' in navigator) {
//    window.addEventListener('load', () => {
//       navigator.serviceWorker.register('/sw.js')
//          .then(registration => {
//             console.log('Service Worker registered with scope:', registration.scope);
//          }).catch(error => {
//             console.error('Service Worker registration failed:', error);
//          });
//    });
// }

ReactDOM.createRoot(document.getElementById('root')).render(
   <React.StrictMode>
      <BrowserRouter>
         <Toaster
            position="top-center"
            reverseOrder={false}
         />
         <App />
      </BrowserRouter>
   </React.StrictMode>,
)

