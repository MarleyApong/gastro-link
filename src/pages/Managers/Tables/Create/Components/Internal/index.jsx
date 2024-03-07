import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import * as Spinners from 'react-loader-spinner'
import toast from "react-hot-toast"
import { Organization } from "../../../../../../services/organizationService"
import { Company } from "../../../../../../services/companyService"
import { Table } from "../../../../../../services/tableService"
import useHandleError from "../../../../../../hooks/useHandleError"

const Internal = ({ Navigate, access, CustomSelect }) => {
   const order = 'asc'
   const filter = 'name'
   const status = 'actif'
   const search = ''
   const limit = 10000
   const page = 0

   let idOrganization = ''

   const [isSubmitting, setIsSubmitting] = useState(false)
   const [organization, setOrganization] = useState([])
   const [selectedOrganizationValue, setSelectedOrganizationValue] = useState({})
   const [selectedCompanyValue, setSelectedCompanyValue] = useState({})
   const [company, setCompany] = useState([])
   const [table, setTable] = useState({
      idCompany: "",
      tableNumber: ""
   })

   // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
   const handleOrganizationValue = useCallback((value) => {
      setSelectedOrganizationValue(value)
   }, [])

   // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
   const handleCompanyValue = useCallback((value) => {
      setSelectedCompanyValue(value)
   }, [])

   // PUSH SELECTED ID OF ORGANIZATION
   idOrganization = selectedOrganizationValue.value

   // PUSH SELECTED ID OF COMPANY
   table.idCompany = selectedCompanyValue.value

   // SET ALL VALUE
   const handleAdd = (e) => {
      const { name, value } = e.target
      setTable({
         ...table,
         [name]: value,
      })
   }

   useEffect(() => {
      Organization.getAll(order, filter, status, search, limit, page)
         .then((res) => setOrganization(res.data.content.data))
         .catch((err) => {
            useHandleError(err, Navigate)
         })
   }, [order, filter, status, search, limit, page])

   useEffect(() => {
      Company.getCompaniesByOrganization(idOrganization, status)
         .then((res) => {
            setCompany(res.data.content)
         })
         .catch((err) => {
            useHandleError(err, Navigate)
         })
   }, [idOrganization])

   // ADD table
   const handleSubmit = (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      if (
         selectedOrganizationValue === false
         || table.idCompany === ""
         || table.tableNumber === ""
      ) {
         setIsSubmitting(false)
         toast.error("Les champs marqués par une etoile sont obligations !")
      }
      else {
         Table.add(table)
            .then((res) => {
               toast.success("Table ajouté avec succès !")
               Navigate('/managers/tables')
            })
            .catch((err) => {
               useHandleError(err, Navigate)
            })
            .finally(() => {
               setIsSubmitting(false)
            })
      }
   }

   return (
      <blockquote className="blockquote mb-0">
         <form onSubmit={handleSubmit} className="row g-2 form">

            <div className="col-md-6">
               <label htmlFor="tableNumber" className="form-label">
                  Nom/numéro de la table :
                  <span className="text-danger taille_etoile">*</span>
               </label>
               <input
                  type="text"
                  className="form-control no-focus-outline"
                  id="tableNumber"
                  name="tableNumber"
                  value={table.tableNumber}
                  onChange={handleAdd}
                  autoComplete='off'
                  required
               />
            </div>
            <div className="col-md-6">
               <label htmlFor="" className="form-label">
                  Nom de l'organisation:
                  <span className="text-danger taille_etoile">*</span>
               </label>
               <CustomSelect data={organization} placeholder="Selectionnez une organisation" onSelectedValue={handleOrganizationValue} />
            </div>
            <div className="col-md-6">
               <label htmlFor="" className="form-label">
                  Nom de l'entreprise :
                  <span className="text-danger taille_etoile">*</span>
               </label>
               <CustomSelect data={company} placeholder="Selectionnez une entreprise" onSelectedValue={handleCompanyValue} />
            </div>
            <div className="col-md-12 d-flex gap-2">
               <button type="submit" className="Btn Send btn-sm" disabled={isSubmitting}>
                  {isSubmitting ? <Spinners.TailSpin height="18" width="18" ariaLabel="tail-spin-loading" radius="5" color="#fff" /> : <RemixIcons.RiSendPlaneLine />}
                  {isSubmitting ? 'Ajout en cours' : 'Ajouter'}
               </button>
            </div>
         </form>
      </blockquote>
   )
}

export default Internal