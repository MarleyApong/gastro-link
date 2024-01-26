import { useState, useEffect } from 'react'
import { Status } from '../services/statusService'
import { Env } from '../services/envService'
import { Role } from '../services/roleService'

export const sortOption = [
   { value: 'asc', label: 'ordre croissant' },
   { value: 'desc', label: 'ordre décroissant' },
]

export const StatusOption = () => {
   const [options, setOptions] = useState([
      { value: '', label: '---' }
   ])

   useEffect(() => {
      const loadStatus = async () => {
         try {
            const res = await Status.getAll();
   
            if (res.data.content) {
               const dbOptions = res.data.content.map(option => ({
                  value: option.id.toString(),
                  label: option.name,
               }))
   
               setOptions([
                  { value: '', label: '---' },
                  ...dbOptions,
               ])
            }
         } catch (error) {
            console.error('Erreur lors du chargement des options de statut :', error)
         }
      }
   
      loadStatus()
   }, [])

   return options
}

export const EnvOption = () => {
   const [options, setOptions] = useState([
      { value: '', label: '---' }
   ])

   useEffect(() => {
      const loadEnvs = async () => {
         try {
            const res = await Env.getAll()
   
            if (res.data.content) {
               const dbOptions = res.data.content.map(option => ({
                  value: option.id.toString(),
                  label: option.name,
               }))
   
               setOptions([
                  { value: '', label: '---' },
                  ...dbOptions,
               ])
            }
         } catch (error) {
            console.error("Erreur lors du chargement des options de l'env :", error)
         }
      }
   
      loadEnvs()
   }, [])

   return options
}

export const RoleOption = () => {
   const [options, setOptions] = useState([
      { value: '', label: '---' }
   ])

   useEffect(() => {
      const loadRole = async () => {
         try {
            const res = await Role.getAll();
   
            if (res.data.content) {
               const dbOptions = res.data.content.map(option => ({
                  value: option.id.toString(),
                  label: option.name,
               }))
   
               setOptions([
                  { value: '', label: '---' },
                  ...dbOptions,
               ])
            }
         } catch (error) {
            console.error("Erreur lors du chargement des options du role :", error)
         }
      }
   
      loadRole()
   }, [])

   return options
}