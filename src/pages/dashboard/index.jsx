import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import { useNavigate } from 'react-router-dom'
import './dashboard.scss'
import Pagination from '../../components/pagination'
import { users } from '../../services/users'
import { FirstGroupInternal, FirstGroupExternal } from '../../utils/FirstGroup'
import { SecondGroupExternal, SecondGroupInternal } from '../../utils/SecondGroup'
import Access from '../../services/access'
import { Companies } from '../../services/companies'
import { Surveys } from '../../services/surveys'

const Dashboard = () => {
   const access = Access()
   const [companies, setCompanies] = useState([])
   const [allCount, setAllCount] = useState([])
   const [surveys, setSurveys] = useState([])
   const [chart, setChart] = useState([])

   useEffect(() => {
      const firstGroupData = async () => {
         let res = await Companies.getCount()
         setAllCount(res.data.content)

         res = await Companies.getCount()
         setCompanies(res.data.content.data)

         res = await Surveys.getAll()
         setSurveys(res.data.content)
      }
      firstGroupData()
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
   // const [pageable, setPageable] = useState({

   // })
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
                     access === 21 || access === 22 ?
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
                     access === 21 || access === 22 ?
                        <SecondGroupExternal /> : ""
               }
            </div>
         </IconContext.Provider>
      </>
   )
}

export default Dashboard