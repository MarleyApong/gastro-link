import React, { useState, useEffect } from 'react'
import { IconContext } from 'react-icons/lib'
import { useNavigate } from 'react-router-dom'

import './dashboard.scss'
import Pagination from '../../components/pagination'
import { users } from '../../services/users'

import { FirstGroupInternal, FirstGroupExternal } from '../../utils/first-group'
import { SecondGroupExternal, SecondGroupInternal } from '../../utils/second-group'
import Access from '../../services/access'


const Dashboard = () => {
   const access = Access()
   const Navigate = useNavigate()
   // const [pageable, setPageable] = useState({

   // })

   // const [users, setUsers] = useState([])

   // useEffect(() => {
   //   users.getAll().then((res) => {
   //     console.log(res);
   //   })
   // }, [])

   return (
      <>
         <IconContext.Provider value={{ size: '2.5rem' }}>
            <div className="FirstGroup">
               {
                  access === 11 || access === 12 || access === 13 ?
                     <FirstGroupInternal /> :
                     access === 21 || access === 22 ?
                        <FirstGroupExternal /> : Navigate('/auth/login')
               }
            </div>

            <div className="SecondGroup">
               {
                  access === 11 || access === 12 || access === 13 ?
                     <SecondGroupInternal /> :
                     access === 21 || access === 22 ?
                        <SecondGroupExternal /> : Navigate('/auth/login')
               }
            </div>
         </IconContext.Provider>
      </>
   )
}

export default Dashboard