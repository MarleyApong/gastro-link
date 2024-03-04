import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import './website.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Company } from '../../services/companyService'

const Website = () => {
   const Navigate = useNavigate()
   const { company } = useParams()

   const currentPath = window.location.pathname
   const queryString = window.location.search

   const [description, setDescription] = useState('')

   const handleNavToOrder = () => {
      const urlNote = currentPath + "/order" + queryString
      Navigate(urlNote)
   }

   const handleNavToNote = () => {
      const urlNote = currentPath + "/note" + queryString
      Navigate(urlNote)
   }

   useEffect(() => {
      const loadData = async () => {
         try {
            const res = await Company.getWebpage(company)
            setDescription(res.data.content.description)
         }
         catch (err) {
            // console.log('err', err);
            // Navigate(-1)
         }
      }

      loadData()
   }, [company])

   return (
      <div className='website'>
         <div className="middle">
            <h4>Bienvenue sur notre page !</h4>
            <span>{description}</span>
            <div className="action">
               <button onClick={handleNavToOrder}><RemixIcons.RiCake3Line /> Commander </button>
               <button onClick={handleNavToNote}><RemixIcons.RiSurveyLine /> Notez-nous </button>
            </div>
         </div>
         <div className="left">
            <div className="middle-sm">
               <h4>Bienvenue sur notre page !</h4>
               <span>{description}</span>
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