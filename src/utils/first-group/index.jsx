import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import { Companies } from '../../services/companies'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { account } from '../../services/account'

export const FirstGroupInternal = () => {
   const Navigate = useNavigate()
   // const [companies, setCompanies] = useState()

   // useEffect(() => {
   //    const load = () => {
   //       Companies.getAll()
   //          .then((res) => {
   //             setCompanies(res.data)

   //          })
   //          .catch((err => {
   //             console.log("erreur: ", err)
   //          }))
   //    }

   //    load()
   // }, [])
   return (
      <>
         <div className="TBox">
            <div className="Element">
               <span>Total entreprise</span>
               <div className="Length">
                  10
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiBuildingLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total enquête</span>
               <div className="Length">
                  30
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiSurveyLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Enquête en cours</span>
               <div className="Length">
                  20
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiAlarmWarningLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Entreprise bloquée</span>
               <div className="Length">
                  15
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCloseCircleLine /></div>
         </div>
      </>
   )
}

export const FirstGroupExternal = () => {
   return (
      <>
         <div className="TBox">
            <div className="Element">
               <span>Total enquête</span>
               <div className="Length">
                  30
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiSurveyLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Enquête en cours</span>
               <div className="Length">
                  20
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiAlarmWarningLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Client abonné</span>
               <div className="Length">
                  10
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiBuildingLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Entreprise bloquée</span>
               <div className="Length">
                  15
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCloseCircleLine /></div>
         </div>
      </>
   )
}