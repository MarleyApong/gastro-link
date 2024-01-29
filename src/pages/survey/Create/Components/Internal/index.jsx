import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { Organization } from "../../../../../services/organizationService"
import { Survey } from "../../../../../services/surveyService"
import { Company } from "../../../../../services/companyService"

const Internal = ({ Navigate, idStatus, access, CustomSelect }) => {
   const order = 'asc'
   const filter = 'name'
   const status = 'actif'
   const search = ''
   const limit = 10000
   const page = 0

   let idOrganization = ''
   const [organization, setOrganization] = useState([])
   const [selectedOrganizationValue, setSelectedOrganizationValue] = useState({})
   const [selectedCompanyValue, setSelectedCompanyValue] = useState({})
   const [company, setCompany] = useState([])
   const [survey, setSurvey] = useState({
      idCompany: "",
      idStatus: "",
      name: "",
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
   survey.idCompany = selectedCompanyValue.value
   survey.idStatus = idStatus

   // SET ALL VALUE
   const handleAdd = (e) => {
      const { name, value } = e.target
      setSurvey({
         ...survey,
         [name]: value,
      })
   }

   useEffect(() => {
      Organization.getAll(order, filter, status, search, limit, page)
         .then((res) => setOrganization(res.data.content.data))
         .catch((error) => console.error('Erreur lors de la récupération des organisations :', error))
   }, [order, filter, status, search, limit, page])

   useEffect(() => {
      Company.getCompaniesByOrganization(idOrganization, status)
         .then((res) => {
            setCompany(res.data.content)
         })
         .catch((error) => console.error('Erreur lors de la récupération des entreprises par organisation :', error))
   }, [idOrganization])

   // ADD SURVEY
   const handleSubmit = (e) => {
      e.preventDefault()
      if (
         selectedOrganizationValue === false
         || survey.idCompany === ""
         || survey.name === "") {
         toast.error("Les champs marqués par une etoile sont obligations !")
      }
      else {
         Survey.add(survey)
            .then((res) => {
               toast.success("Enquête ajoutée avec succès !")
               Navigate('/surveys/list')
            })
            .catch((err) => {
               if (err.response.status === 400) {
                  // toast.error("Champs mal renseigné ou format inattendu !", {
                  // 	style: {
                  // 		textAlign: 'center'
                  // 	}
                  // })
                  console.log("erreur:", err);
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
               <button type="submit" className="Btn Send btn-sm">
                  <RemixIcons.RiSendPlaneLine />
                  Ajouter
               </button>
            </div>
         </form>
      </blockquote>
   )
}

export default Internal