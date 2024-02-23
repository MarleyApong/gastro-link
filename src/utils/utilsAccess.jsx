import { useEffect, useState, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Account } from '../services/accountService'
import { User } from '../services/userService'
import { Status } from '../services/statusService'
import toast from 'react-hot-toast'

const Access = () => {
   const Navigate = useNavigate()

   const [userData, setUserData] = useState({
      role: localStorage.getItem('lero') || '',
      env: localStorage.getItem('env') || '',
      status: localStorage.getItem('status') || '',
      token: localStorage.getItem('lkiy-') || '',
      id: localStorage.getItem('id') || ''
   })

   const [data, setData] = useState(0)
   useEffect(() => {
      const loadUserData = async () => {
         try {
            const userDataResponse = await User.getOne(userData.id)
            const user = userDataResponse.data.content
   
            const statusDataResponse = await Status.getAll()
            const statusData = statusDataResponse.data.content
   
            filterStatusData(user, statusData)
         } catch (err) {
         }
      }
   
      // PROCESSING OF ACCESS
      const filterStatusData = (user, statusData) => {
         try {
            const statusActif = statusData.find(obj => obj.name === 'actif')
            const idStatusActif = statusActif ? statusActif.id : null
   
            if (userData.status !== idStatusActif || !userData.token || !userData.id) {
               setData(0)
               setTimeout(() => {
                  Account.logout(300)
               }, 1000)
               return
            }
   
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
                        handleUnknownUserRole()
                        return
                  }
                  break
               case 'external':
                  switch (user.Role.name) {
                     case 'server':
                        newData = 20
                        break
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
                        handleUnknownUserRole()
                        return
                  }
                  break
               default:
                  Account.logout()
                  return
            }
            setData(newData)
         } catch (err) {
            // Gestion de l'erreur
         }
      }
   
      const handleUnknownUserRole = () => {
         Account.logout()
      }
   
      loadUserData()
   
   }, [userData])

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
   
      window.addEventListener('storage', handleLocalStorageChange, { once: true })
   
      return () => {
         window.removeEventListener('storage', handleLocalStorageChange)
      }
   }, [])
   

   return data
}

export default Access