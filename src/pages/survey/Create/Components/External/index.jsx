import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { User } from "../../../../../services/userService"
import { Survey } from "../../../../../services/surveyService"
import { Company } from "../../../../../services/companyService"

const External = ({ Navigate, idStatus, access, CustomSelect }) => {
   const idUser = localStorage.getItem('id')

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
         } catch (err) {

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
         } catch (err) {
            console.error('Erreur lors de la récupération des entreprises par organisation :', err)
         }
      }

      loadCompanies()
   }, [idOrganization])

   const handleSubmit = (e) => {
      e.preventDefault()
      if (
         survey.idCompany === ""
         || survey.name === ""
         || survey.idStatus === "") {
         toast.error("obligatoire(s)")
         toast.error("Veuillez remplir le ou les champs,")
      }
      else {
         Survey.add(survey)
            .then((res) => {
               toast.success("Enquête ajoutée avec succès !")
               survey.name = ''
               Navigate('/surveys/list')
            })
            .catch((err) => {
               if (err.response) {
                  if (err.response.status === 400) {
                     console.log("erreur:", err)
                  }
                  else if (err.response.status === 401) {
                     toast.error("La session a expiré !")
                     Account.logout()
                     Navigate("/auth/login")
                  }
                  else if (err.response.status === 403) {
                     toast.error("Accès interdit !")
                  }
                  else if (err.response.status === 404) {
                     toast.error("Ressource non trouvée !")
                  }
                  else if (err.response.status === 415) {
                     toast.error("Erreur, contactez l'administrateur !")
                  }
                  else if (err.response.status === 500) {
                     toast.error("Erreur interne du serveur !")
                  }
               }
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

            <div className="col-md-12 d-flex gap-2">
               <button type="submit" className="Btn Send btn-sm">
                  <RemixIcons.RiSendPlaneLine />
                  Ajouter
               </button>
            </div>
         </form>
      </blockquote>
   )
}

export default External