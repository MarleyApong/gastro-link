import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import { User } from '../../services/userService'
import { FirstGroupInternal, FirstGroupExternal, FirstGroupExternalServer } from '../../components/Dashboard/FirstGroup'
import { SecondGroupExternal, SecondGroupExternalServer, SecondGroupInternal } from '../../components/Dashboard//SecondGroup'
import { Company } from '../../services/companyService'
import { Survey } from '../../services/surveyService'
import Access from '../../utils/utilsAccess'
import './dashboard.scss'
import { Answer } from '../../services/answersService'
import useHandleError from '../../hooks/useHandleError'
import { Orders } from '../../services/orderService'
import { useNavigate } from 'react-router-dom'

const Dashboard = () => {
   const access = Access()
   const idUser = localStorage.getItem('id')
   const Navigate = useNavigate()

   const [companies, setCompanies] = useState([])
   const [allCount, setAllCount] = useState([])
   const [surveys, setSurveys] = useState([])
   const [answers, setAnswers] = useState([])
   const [statisticServer, setStatisticServer] = useState([])
   const [statisticServer2, setStatisticServer2] = useState([])
   const [chart, setChart] = useState([])
   const [chartAnswers, setChartAnswers] = useState([])
   const [chartStatisticServer, setChartStatisticServer] = useState([])
   const [orderInProgressData, setOrderInProgressData] = useState([])
   const [orderState, setOrderState] = useState({})

   const firstGroupDataInternal = async () => {
      try {
         let res = await Company.getCount()
         setAllCount(res.data.content)
         setCompanies(res.data.content.data)

         res = await Survey.getCount()
         setSurveys(res.data.content)
      } catch (err) {
         useHandleError(err, Navigate)
      }
   }

   const firstGroupDataExternal = async () => {
      try {
         let res = await User.getOrganizationCompany(idUser)
         const organization = res.data.content.Company.Organization.id

         res = await Answer.getAnswersByOrganization(organization)
         setAnswers(res.data.content)
      } catch (err) {
         useHandleError(err, Navigate)
      }
   }

   // GET COMPANY BY USER
   useEffect(() => {
      const loadCompany = async () => {
         try {
            const res = await User.getOrganizationCompany(idUser)
            const idCompany = res.data.content.Company.id
            loadOrder(idCompany)
         }
         catch (err) {

         }
      }

      loadCompany()
   }, [])

   const loadOrder = async (company) => {
      const order = 'desc'
      const filter = 'createdAt'
      const status = 'actif'
      const search = ''
      const limit = 5
      const page = 0
      try {
         let res = await Orders.getOrderByCompany(company, order, filter, search, status, limit, page)
         setOrderInProgressData(res.data.content.data)
         setOrderState(res.data.content)

         res = await Orders.getOrderByUser(company, idUser, status, limit, page)
         setStatisticServer(res.data.content.data)
         setStatisticServer2(res.data.content)
      }
      catch (err) {
      }
   }

   useEffect(() => {
      firstGroupDataInternal()
      firstGroupDataExternal()
   }, [])

   useEffect(() => {
      const secondGroupData = async () => {
         const companiesByDay = {
            lun: 0,
            mar: 0,
            mer: 0,
            jeu: 0,
            ven: 0,
            sam: 0,
            dim: 0,
         }

         companies.forEach(company => {
            const createdAt = new Date(company.createdAt)
            const dayOfWeek = createdAt.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, -1)

            companiesByDay[dayOfWeek] += 1
         })
         setChart(Object.entries(companiesByDay).map(([dayOfWeek, count]) => ({ day: dayOfWeek, total: count })))
      }
      secondGroupData()
   }, [companies])

   useEffect(() => {
      const secondGroupDataExterne = async () => {
         const answersByDay = {
            lun: 0,
            mar: 0,
            mer: 0,
            jeu: 0,
            ven: 0,
            sam: 0,
            dim: 0,
         }

         answers.forEach(answer => {
            const createdAt = new Date(answer.createdAt)
            const dayOfWeek = createdAt.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, -1)

            answersByDay[dayOfWeek] += 1
         })
         setChartAnswers(Object.entries(answersByDay).map(([dayOfWeek, count]) => ({ day: dayOfWeek, total: count })))
      }
      secondGroupDataExterne()
   }, [answers])

   useEffect(() => {
      const secondGroupDataExterneServer = async () => {
         const orderByDay = {
            lun: 0,
            mar: 0,
            mer: 0,
            jeu: 0,
            ven: 0,
            sam: 0,
            dim: 0,
         }

         statisticServer.forEach(order => {
            const createdAt = new Date(order.createdAt)
            const dayOfWeek = createdAt.toLocaleDateString('fr-FR', { weekday: 'short' }).slice(0, -1)

            orderByDay[dayOfWeek] += 1
         })
         setChartStatisticServer(Object.entries(orderByDay).map(([dayOfWeek, count]) => ({ day: dayOfWeek, total: count })))
      }
      secondGroupDataExterneServer()
   }, [statisticServer])

   return (
      <>
         <IconContext.Provider value={{ size: '2.5rem' }}>
            <div className="FirstGroup">
               {
                  access === 11 || access === 12 || access === 13 ?
                     <FirstGroupInternal
                        companies={allCount}
                        surveys={surveys}
                     /> :
                     access === 21 || access === 22 || access === 23 ?
                        <FirstGroupExternal
                           idUser={idUser}
                        /> :
                        access === 20 ?
                           <FirstGroupExternalServer
                              idUser={idUser}
                              orderState={orderState}
                              statistic={statisticServer2}
                           /> : ""
               }
            </div>

            <div className="SecondGroup">
               {
                  access === 11 || access === 12 || access === 13 ?
                     <SecondGroupInternal
                        companies={companies}
                        chart={chart}
                     /> :
                     access === 21 || access === 22 || access === 23 ?
                        <SecondGroupExternal
                           idUser={idUser}
                           chart={chartAnswers}
                        /> :
                        access === 20 ?
                           <SecondGroupExternalServer
                              idUser={idUser}
                              chart={chartStatisticServer}
                              orderInProgressData={orderInProgressData}
                           /> : ""
               }
            </div>
         </IconContext.Provider>
      </>
   )
}

export default Dashboard