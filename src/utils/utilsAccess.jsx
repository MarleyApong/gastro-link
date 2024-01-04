import { useEffect, useState } from 'react'
import { Account } from '../services/accountService'
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
               Account.logout()
            }, 1000)
         } 
         else {
            let newData = 0
            switch (env) {
               case 'fkc76rew4-sef590kmlkm-1drds4w323-tpfz6r6':
                  switch (role) {
                     case 'zg450354b-2d9cv-4a42-904b-1700f57863d5':
                        newData = 11
                        break
                     case 'zg450354b-2d9cv-4a42-904b-2700f57863d5':
                        newData = 12
                        break
                     case 'zg450354b-2d9cv-4a42-904b-3700f57863d5':
                        newData = 13
                        break
                     default:
                        handleLogout(0)
                        return
                  }
                  break
               case 'fkc76rew4-sef590kmlkm-2drds4w323-tpfz6r6':
                  switch (role) {
                     case 'zg450354b-2d9cv-4a42-904b-1700f57863d5':
                        newData = 21
                        break
                     case 'zg450354b-2d9cv-4a42-904b-2700f57863d5':
                        newData = 22
                        break
                     case 'zg450354b-2d9cv-4a42-904b-3700f57863d5':
                        newData = 23
                        break
                     default:
                        handleLogout(300)
                        return
                  }
                  break
               default:
                  handleLogout(300)
                  return
            }
            setData(newData)
         }
      }

      const handleLogout = (code) => {
         setData(0)
         setTimeout(() => {
            Account.logout(code)
         }, 1000)
      }

      loadData()
   }, [status, role, env, data, token, id])

   return data
}

export default Access