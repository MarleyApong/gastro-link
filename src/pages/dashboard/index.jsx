import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import { useNavigate } from 'react-router-dom'
import { User } from '../../services/userService'
import { FirstGroupInternal, FirstGroupExternal } from '../../components/Dashboard/FirstGroup'
import { SecondGroupExternal, SecondGroupInternal } from '../../components/Dashboard//SecondGroup'
import { Company } from '../../services/companyService'
import { Survey } from '../../services/surveyService'
import Access from '../../utils/utilsAccess'
import './dashboard.scss'

const Dashboard = () => {
   const access = Access()
   const [companies, setCompanies] = useState([])
   const [allCount, setAllCount] = useState([])
   const [surveys, setSurveys] = useState([])
   const [chart, setChart] = useState([])

   const firstGroupDataInternal = async () => {
      let res = await Company.getCount()
      setAllCount(res.data.content)
      setCompanies(res.data.content.data)

      res = await Survey.getCount()
      setSurveys(res.data.content)
   }

   const firstGroupDataExternal = async () => {
      let res = await Company.getCount()
      setAllCount(res.data.content)
      setCompanies(res.data.content.data)

      res = await Survey.getAll()
      setSurveys(res.data.content)
   }

   useEffect(() => {
      firstGroupDataInternal()
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
                        <FirstGroupExternal /> : ""
               }
            </div>

            <div className="SecondGroup">
               {
                  access === 11 || access === 12 || access === 13 ?
                     <SecondGroupInternal
                        companies={companies}
                        chart={chart}
                     /> :
                     access === 21 || access === 22 || access === 23?
                        <SecondGroupExternal /> : ""
               }
            </div>
         </IconContext.Provider>
      </>
   )
}

export default Dashboard