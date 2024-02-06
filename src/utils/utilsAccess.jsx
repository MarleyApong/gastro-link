import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Account } from '../services/accountService'
import { User } from '../services/userService'
import { Status } from '../services/statusService'
import toast from 'react-hot-toast'

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
      const handleLocalStorageChange = () => {
         toast.error("Les données de connexion ont été corrompues.")
         toast.error("Déconnexion !")
         Navigate('/auth/login')

         localStorage.removeItem('lkiy-')
         localStorage.removeItem('id')
         localStorage.removeItem('status')
         localStorage.removeItem('env')
         localStorage.removeItem('lero')
      }

      window.addEventListener('storage', handleLocalStorageChange)

      return () => {
         window.removeEventListener('storage', handleLocalStorageChange)
      }
   }, [Navigate])

   useEffect(() => {
      const loadUser = async () => {
         try {
            const userData = await User.getOne(id)
            const user = userData.data.content

            const statusData = await Status.getAll()
            const status = statusData.data.content
            filterStatusData(user, status)
         } catch (err) {
            if (err.response.data.message === 'missing token') {
               Navigate('/auth/login')
               toast.error("Token manquant !")
            }
            else if (err.response.data.message === 'bad token') {
               Navigate('/auth/login')
               toast.error("Votre session a expiré !")
            }
         }
      }

      const filterStatusData = async (user, statusData) => {
         try {
            const objetActif = statusData.find((objet) => objet.name === 'actif')
            const idStatusActif = objetActif ? objetActif.id : null

            if (status !== idStatusActif || !token || !id) {
               setData(0)
               setTimeout(() => {
                  Account.logout(300)
               }, 1000)
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
                           Account.logout()
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
                           Account.logout()
                           return
                     }
                     break
                  default:
                     Account.logout()
                     return
               }
               setData(newData)
            }
         } catch (err) {
            // Gestion de l'erreur
         }
      }

      loadUser()
   }, [Navigate, id, status, token])

   return data
}

export default Access
