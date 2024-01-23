import { useEffect, useState } from 'react'
import { Account } from '../services/accountService'
import { useNavigate } from 'react-router-dom'
import { User } from '../services/userService'
import { Status } from '../services/statusService'

const Access = () => {
   const Navigate = useNavigate()

   const [role, setRole] = useState(localStorage.getItem('lero'))
   const [env, setEnv] = useState(localStorage.getItem('env'))
   const [status, setStatus] = useState(localStorage.getItem('status'))
   const [token, setToken] = useState(localStorage.getItem('lkiy-'))
   const [id, setId] = useState(localStorage.getItem('id'))
   const [data, setData] = useState(0)
   const [user, setUser] = useState({})
   const [statusData, setStatusData] = useState([])
   const [idStatusActif, setIdStatusActif] = useState(null)

   useEffect(() => {
      const timer = window.setInterval(() => {
         const currentRole = localStorage.getItem('lero')
         const currentEnv = localStorage.getItem('env')
         const currentStatus = localStorage.getItem('status')
         const currentToken = localStorage.getItem('lkiy-')
         const currentId = localStorage.getItem('id')

         if (currentRole !== role || currentEnv !== env || currentStatus !== status || currentToken !== token || currentId !== id) {
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
      const loadUser = async () => {
         try {
            const userData = await User.getOne(id)
            const user = userData.data.content

            const statusData = await Status.getAll()
            const status = statusData.data.content
            filterStatusData(user, status)
         } catch (error) {
            console.error("Erreur lors du chargement des données :", error)
         }
      }

      const filterStatusData = async (user, statusData) => {
         try {
            const objetActif = statusData.find((objet) => objet.name === "actif")
            const idStatusActif = objetActif ? objetActif.id : null

            console.log("idStatusActif:", idStatusActif);
            console.log("status:", status);
            console.log("user: ", user);

            if (status !== idStatusActif || !token || !id) {
               setData(0)
               setTimeout(() => {
                  Account.logout()
               }, 1000)
               console.log("user.Env.name", user.Env.name);
            } else {
               let newData = 0
               switch (user.Env.name) {
                  case 'internal':
                     switch (user.Role.name) {
                        case 'simple user':
                           newData = 11
                           break
                        case 'admin':
                           newData = 12
                           break
                        case 'super admin':
                           newData = 13
                           break
                        default:
                           handleLogout(0)
                           return
                     }
                     break
                  case 'external':
                     switch (user.Role.name) {
                        case 'simple user':
                           newData = 21
                           break
                        case 'admin':
                           newData = 22
                           break
                        case 'super admin':
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
         } catch (error) {
            console.error("Erreur lors du filtrage des données de statut :", error)
         }
      }

      loadUser()
   }, [])


   return data
}

export default Access