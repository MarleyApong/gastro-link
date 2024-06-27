import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import * as Spinners from 'react-loader-spinner'
import toast from "react-hot-toast"
import { User } from "../../../../../services/userService"
import { Survey } from "../../../../../services/surveyService"
import { Company } from "../../../../../services/companyService"
import useHandleError from "../../../../../hooks/useHandleError"

const External = ({ Navigate, idStatus, access, CustomSelect }) => {
   const idUser = Account.getUserId()

   const [isSubmitting, setIsSubmitting] = useState(false)
   const [idOrganization, setOrganization] = useState('')
   const [company, setCompany] = useState([])
   const [selectedCompanyValue, setSelectedCompanyValue] = useState({})
   const [survey, setSurvey] = useState({
      idCompany: "",
      idStatus: "",
      name: "",
   })

   const handleAdd = (e) => {
      const { name, value } = e.target
      setSurvey({
         ...survey,
         [name]: value,
      })
   }

   // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
   const handleCompanyValue = useCallback((value) => {
      setSelectedCompanyValue(value)
   }, [])


   useEffect(() => {
      const loadData = async () => {
         try {
            const res = await User.getOrganizationCompany(idUser)
            setOrganization(res.data.content.Company.Organization.id)
            survey.idStatus = idStatus

            if (access === 22) {
               survey.idCompany = res.data.content.Company.id
            }
            else if (access === 23) {
               // PUSH SELECTED ID OF COMPANY
               survey.idCompany = selectedCompanyValue.value
            }
         }
         catch (err) {
            useHandleError(err, Navigate)
         }
      }

      loadData()
   }, [selectedCompanyValue])

   useEffect(() => {
      const loadCompanies = async () => {
         const status = 'actif'
         try {
            const res = await Company.getCompaniesByOrganization(idOrganization, status)
            setCompany(res.data.content)
         }
         catch (err) {
            useHandleError(err, Navigate)
         }
      }

      loadCompanies()
   }, [idOrganization])

   const handleSubmit = (e) => {
      e.preventDefault()
      setIsSubmitting(true)
      if (
         survey.idCompany === ""
         || survey.name === ""
         || survey.idStatus === ""
      ) {
         setIsSubmitting(false)
         toast.error("obligatoire(s)")
         toast.error("Veuillez remplir le ou les champs,")
      }
      else {
         Survey.add(survey)
            .then((res) => {
               toast.success("Enquête ajoutée avec succès !")
               Navigate('/surveys/list')
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
            <div className="col-md-6 ">
               <label htmlFor="neighborhood" className="form-label">
                  Nom de l'enquête :
                  <span className="text-danger taille_etoile">*</span>
               </label>
               <input
                  type="text"
                  className="form-control no-focus-outline"
                  id="name"
                  name="name"
                  value={survey.name}
                  onChange={handleAdd}
                  autoComplete='off'
                  required
               />
            </div>
            {access === 23 && (
               <div className="col-md-6">
                  <label htmlFor="" className="form-label">
                     Nom de l'entreprise :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <CustomSelect data={company} placeholder="Selectionnez une entreprise" onSelectedValue={handleCompanyValue} />
               </div>
            )}

            <div className="col-md-12 d-flex gap-2 justify-content-between">
               <button type="submit" className="Btn Send btn-sm" disabled={isSubmitting}>
                  {isSubmitting ? <Spinners.TailSpin height="18" width="18" ariaLabel="tail-spin-loading" radius="5" color="#fff" /> : <RemixIcons.RiSendPlaneLine />}
                  {isSubmitting ? 'Ajout en cours' : 'Ajouter'}
               </button>
               <button onClick={() => Navigate('/surveys')} className="Btn Error">
                  Annuler / Retour
               </button>
            </div>
         </form>
      </blockquote>
   )
}

export default External