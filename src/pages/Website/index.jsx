import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import './website.scss'
import { useNavigate } from 'react-router-dom'

const Website = () => {
   const Navigate = useNavigate()

   const currentPath = window.location.pathname
   const queryString = window.location.search

   const handleNavToOrder = () => {
      const urlNote = currentPath + "/order" + queryString
      Navigate(urlNote)
   }

   const handleNavToNote = () => {
      const urlNote = currentPath + "/note" + queryString
      Navigate(urlNote)
   }

   return (
      <div className='website'>
         <div className="middle">
            <h4>Bienvenue sur notre page !</h4>
            <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ex esse vero molestias accusamus provident odio, recusandae, expedita incidunt nam, inventore mollitia et excepturi. Numquam facere error consequatur dolores excepturi.</span>
            <div className="action">
               <button onClick={handleNavToOrder}><RemixIcons.RiCake3Line /> Commander </button>
               <button onClick={handleNavToNote}><RemixIcons.RiSurveyLine /> Notez-nous </button>
            </div>
         </div>
         <div className="left">
            <div className="middle-sm">
               <h4>Bienvenue sur notre page !</h4>
               <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum ex esse vero molestias accusamus provident odio, recusandae, expedita incidunt nam, inventore mollitia et excepturi. Numquam facere error consequatur dolores excepturi.</span>
            </div>
            <button onClick={handleNavToOrder}><RemixIcons.RiCake3Line /> Commander </button>
         </div>
         <div className="right">
            <button onClick={handleNavToNote}><RemixIcons.RiSurveyLine /> Notez-nous </button>
         </div>
      </div>
   )
}

export default Website