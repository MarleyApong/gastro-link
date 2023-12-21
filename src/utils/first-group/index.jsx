import React from 'react'
import * as RemixIcons from "react-icons/ri"

export const FirstGroupInternal = () => {
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