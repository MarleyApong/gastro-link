import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import './website.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { Company } from '../../services/companyService'
import home from '../../assets/img/home/home.jpg'

const Website = () => {
   const navigate = useNavigate()
   const { company } = useParams()

   const currentPath = window.location.pathname
   const queryString = window.location.search

   const [data, setData] = useState({})

   const handleNavToOrder = () => {
      const urlOrder = `${currentPath}/order${queryString}`
      navigate(urlOrder)
   }

   const handleNavToNote = () => {
      const urlNote = `${currentPath}/note${queryString}`
      navigate(urlNote)
   }

   useEffect(() => {
      const loadData = async () => {
         try {
            const res = await Company.getWebpage(company)
            setData(res.data.content)
         } catch (err) {
            // Handle error
         }
      }

      loadData()
   }, [company])

   return (
      <div className='website'>
         <div className='img-container'>
            <img 
              className='img' 
              src={data.picture ? data.picture : home} 
              alt="home" 
            />
            <div className='overlay'></div>
         </div>
         <div className="middle">
            <h1>Bienvenue sur notre page !</h1>
            <p>{data?.description}</p>
            <div className="action">
               <button onClick={handleNavToOrder}><RemixIcons.RiCake3Line size={18}/> Commander </button>
               <button onClick={handleNavToNote}><RemixIcons.RiSurveyLine size={18}/> Notez-nous </button>
            </div>
         </div>
      </div>
   )
}

export default Website