import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import { User } from '../../services/userService'
import { FirstGroupInternal, FirstGroupExternal } from '../../components/Dashboard/FirstGroup'
import { SecondGroupExternal, SecondGroupInternal } from '../../components/Dashboard//SecondGroup'
import { Company } from '../../services/companyService'
import { Survey } from '../../services/surveyService'
import Access from '../../utils/utilsAccess'
import './dashboard.scss'
import { Answer } from '../../services/answersService'
import useHandleError from '../../hooks/useHandleError'

const Dashboard = () => {
   const access = Access()
   const idUser = localStorage.getItem('id')

   const [companies, setCompanies] = useState([])
   const [allCount, setAllCount] = useState([])
   const [surveys, setSurveys] = useState([])
   const [answers, setAnswers] = useState([])
   const [chart, setChart] = useState([])
   const [chartAnswers, setChartAnswers] = useState([])

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
         setChart(Object.entries(companiesByDay))
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
         setChartAnswers(Object.entries(answersByDay))
      }
      secondGroupDataExterne()
   }, [answers])

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
                        /> : ""
               }
            </div>
         </IconContext.Provider>
      </>
   )
}

export default Dashboard