import React, { useEffect, useState } from 'react'
import * as RemixIcons from "react-icons/ri"
import * as RadixIcons from "react-icons/rx"
import { Survey } from '../../../services/surveyService'
import { Customer } from '../../../services/customerService'
import { Company } from '../../../services/companyService'

export const FirstGroupInternal = ({ organizations, companies, surveys, tables, products, answers }) => {

   return (
      <>
         <div className="TBox ">
            <div className="Element">
               <span>Total organisation</span>
               <div className="Length">
                  {organizations.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiOrganizationChart /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total restaurant</span>
               <div className="Length">
                  {companies.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiStoreLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Restaurant bloqué</span>
               <div className="Length">
                  {companies.blocked}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCloseCircleLine /></div>
         </div>
         <div className="TBox">
            <div className="TBox-x">
               <div className="Element">
                  <span>Total enquête</span>
                  <div className="Length">
                     {surveys.totalElements}
                  </div>
               </div>
               <div className='IconM'><RemixIcons.RiSurveyLine /></div>
            </div>

            <div className="TBox-x">
               <div className="Element">
                  <span>Enquête en cours</span>
                  <div className="Length">
                     {surveys.inProgress}
                  </div>
               </div>
               <div className='IconM'><RemixIcons.RiAlarmWarningLine /></div>
            </div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total réponse</span>
               <div className="Length">
                  {answers.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiQuestionAnswerLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total table</span>
               <div className="Length">
                  {tables.totalElements}
               </div>
            </div>
            <div className='IconM'><RadixIcons.RxFrame /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total Produit</span>
               <div className="Length">
                  {products.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCake3Line /></div>
         </div>
      </>
   )
}

export const FirstGroupExternal = ({ idUser }) => {
   const [count, setCount] = useState({})
   const [countCustomer, setCountCustomer] = useState(0)
   const [companiesBlocked, setCompaniesBlocked] = useState(0)

   const order = 'desc'
   const filter = 'createdAt'
   const status = ''
   const search = ''
   const limit = 5
   const page = 0

   useEffect(() => {
      const loadData = async () => {
         let res = await Survey.getSurveysByUser(idUser)
         setCount(res.data)

         res = await Customer.getCustomersByUser(idUser, order, filter, status, search, limit, page)
         setCountCustomer(res.data.content.totalCutomerByUser)

         const statusState = 'inactif'
         res = await Company.getCompanyByUser(idUser, order, filter, search, statusState, limit, page)
         setCompaniesBlocked(res.data.content.totalElements)
      }

      loadData()
   }, [idUser, order, filter, status, search, limit, page])

   return (
      <>
         <div className="TBox">
            <div className="Element">
               <span>Total enquête</span>
               <div className="Length">
                  {count.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiSurveyLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Enquête en cours</span>
               <div className="Length">
                  {count.inProgress}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiAlarmWarningLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Client abonné</span>
               <div className="Length">
                  {countCustomer}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiBuildingLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Restaurant bloqué</span>
               <div className="Length">
                  {companiesBlocked}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCloseCircleLine /></div>
         </div>
      </>
   )
}

export const FirstGroupExternalServer = ({ idUser, orderState, statistic }) => {

   return (
      <>
         <div className="TBox">
            <div className="Element">
               <span>Commande en cours</span>
               <div className="Length">
                  {orderState.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiAlarmWarningLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Commande traitée aujourd'hui</span>
               <div className="Length">
                  {statistic.ordersToday}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCheckLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total Commande traitée</span>
               <div className="Length">
                  {statistic.totalElements}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCheckDoubleLine /></div>
         </div>
         <div className="TBox">
            <div className="Element">
               <span>Total Commande traitée aujourd'hui (all severs)</span>
               <div className="Length">
                  {orderState.orderFinalizedToday}
               </div>
            </div>
            <div className='IconM'><RemixIcons.RiCheckLine /></div>
         </div>
      </>
   )
}