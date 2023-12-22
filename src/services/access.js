import { useEffect, useState } from 'react'
import { account } from './account'
import { useNavigate } from 'react-router-dom'

const Access = () => {
   const Navigate = useNavigate()

   const [role, setRole] = useState(localStorage.getItem('lero'))
   const [env, setEnv] = useState(localStorage.getItem('env'))
   const [status, setStatus] = useState(localStorage.getItem('status'))
   const [token, setToken] = useState(localStorage.getItem('lkiy-'))
   const [id, setId] = useState(localStorage.getItem('id'))
   const [data, setData] = useState(0)

   useEffect(() => {
      const timer = window.setInterval(() => {
         const currentRole = localStorage.getItem('lero')
         const currentEnv = localStorage.getItem('env')
         const currentStatus = localStorage.getItem('status')
         const currentToken = localStorage.getItem('lkiy-')
         const currentId = localStorage.getItem('id')

         if (currentRole !== role || currentEnv !== env || currentStatus !== status || currentToken !== token || currentId !== id ) {
            setRole(currentRole)
            setEnv(currentEnv)
            setStatus(currentStatus)
            setToken(currentToken)
            setId(currentId)
         }
      }, 1000)

      return () => {
         clearInterval(timer)
      }
   }, [role, env, status, token, id])

   useEffect(() => {
      const loadData = () => {
         if (status !== 'gt6m06768-rq0835gdgd-bvdf56-45rds4mbvpo' || !token || !id) {
            setData(0)
            setTimeout(() => {
               const code = 300
               account.logout(code)
            }, 10000)
         } 
         else {
            let newData = 0
            if (env === 'fkc76rew4-sef590kmlkm-1drds4w323-tpfz6r6') {
               if (role === 'zg450354b-2d9cv-4a42-904b-1700f57863d5') {
                  newData = 11
               } else if (role === 'zg450354b-2d9cv-4a42-904b-2700f57863d5') {
                  newData = 12
               } else if (role === 'zg450354b-2d9cv-4a42-904b-3700f57863d5') {
                  newData = 13
               } else {
                  setData(0)
                  setTimeout(() => {
                     const code = 300
                     account.logout(code)
                  }, 10000)
                  return
               }
            } else if (env === 'fkc76rew4-sef590kmlkm-2drds4w323-tpfz6r6') {
               if (role === 'zg450354b-2d9cv-4a42-904b-1700f57863d5') {
                  newData = 21
               } else if (role === 'zg450354b-2d9cv-4a42-904b-2700f57863d5') {
                  newData = 22
               } else if (role === 'zg450354b-2d9cv-4a42-904b-3700f57863d5') {
                  newData = 23
               } else {
                  setData(0)
                  setTimeout(() => {
                     const code = 300
                     account.logout(code)
                  }, 10000)
                  return
               }
            } else {
               setData(0)
               setTimeout(() => {
                  const code = 300
                  account.logout(code)
               }, 10000)
               return
            }
            setData(newData)
         }
      }

      loadData()
   }, [status, role, env, Navigate, data, token, id])

   return data
}

export default Access
