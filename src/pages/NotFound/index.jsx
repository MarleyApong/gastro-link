import React from 'react'
import * as RemixIcons from "react-icons/ri"
import { useNavigate } from 'react-router-dom'
import './notFound.scss'

const NotFound = () => {
   const Navigate = useNavigate()

   const handleRedirect = () => {
      Navigate(-1)
   }

   return (
      <div className='not-found'>
         <div className="card-404">
            <div className="icon-404">404</div>
            <h3>Page non trouvée</h3>
            {/* <span>La page que vous recherchez n'existe pas ou a été déplacée.</span> */}
            <button className='Btn Error' onClick={handleRedirect}> <RemixIcons.RiArrowLeftLine/> Page d'accueil</button>
         </div>
      </div>
   )
}

export default NotFound