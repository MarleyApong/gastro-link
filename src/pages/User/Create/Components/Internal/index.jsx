import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { User } from "../../../../../services/userService"
import RequirePassword from "../../../../../components/RequirePassword"
import { EnvOption, RoleOption, StatusOption } from "../../../../../data/optionFilter"
import { Company } from "../../../../../services/companyService"
import { Organization } from "../../../../../services/organizationService"
import useHandleError from "../../../../../hooks/useHandleError"

const Internal = ({ Navigate, CustomSelect, access }) => {
   const statusOption = StatusOption()
   const roleOption = RoleOption()
   const envOption = EnvOption()

   const order = 'asc'
   const filter = 'name'
   const status = 'actif'
   const search = ''
   const limit = 10000
   const page = 0

   const [validator, setValidator] = useState(0)
   const [organization, setOrganization] = useState([])
   const [company, setCompany] = useState([])
   const [selectedOrganizationValue, setSelectedOrganizationValue] = useState({})
   const [selectedCompanyValue, setSelectedCompanyValue] = useState({})
   const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      env: "",
      idRole: "",
      idStatus: "",
      idOrganization: "",
      idCompany: ""
   })

   // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
   const handleOrganizationValue = useCallback((value) => {
      setSelectedOrganizationValue(value)
   }, [])

   // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
   const handleCompanyValue = useCallback((value) => {
      setSelectedCompanyValue(value)
   }, [])

   // PUSH SELECTED ID OF ORGANIZATION, COMPANY AND PASSWORD
   let idOrganization = selectedOrganizationValue.value
   user.idOrganization = selectedOrganizationValue.value
   user.idCompany = selectedCompanyValue.value
   user.password = user.firstName.substring(0, 3) + user.phone.substring(0, 4) + user.firstName.substring(1, 2).toUpperCase() + '@'

   // SET ALL VALUE
   const handleAdd = (e) => {
      const { name, value } = e.target;
      setUser({
         ...user,
         [name]: value,
      })
   }

   // GET ALL DATA API
   useEffect(() => {
      Organization.getAll(order, filter, status, search, limit, page).then((res) => {
         setOrganization(res.data.content.data)
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }, [order, filter, status, search, limit, page])

   useEffect(() => {
      const status = 'actif'
      Company.getCompaniesByOrganization(idOrganization, status).then((res) => {
         setCompany(res.data.content)
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }, [idOrganization])

   // ADD USER
   const handleSubmit = (e) => {
      e.preventDefault()
      User.add(user).then((res) => {
         toast.success("Utilisateur ajouté avec succès !")
         Navigate('/users/list')
      }).catch((err) => {
         useHandleError(err, Navigate, setValidator)
      })
   }

   return (
      <>
         {validator === 2 && <RequirePassword />}
         <blockquote className="blockquote mb-0">
            <form onSubmit={handleSubmit} className="row g-2 form">
               <div className="col-md-6 ">
                  <label htmlFor="firstName" className="form-label">
                     Nom :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <input
                     type="text"
                     className="form-control no-focus-outline"
                     id="firstName"
                     name="firstName"
                     value={user.firstName}
                     onChange={handleAdd}
                     autoComplete='off'
                     required
                  />
               </div>
               <div className="col-md-6 ">
                  <label htmlFor="lastName" className="form-label">
                     Prénom :
                     <span className="text-danger"></span>
                  </label>
                  <input
                     type="text"
                     className="form-control no-focus-outline"
                     id="lastName"
                     name="lastName"
                     value={user.lastName}
                     onChange={handleAdd}
                     autoComplete='off'
                  />
               </div>
               <div className="col-md-6 ">
                  <label htmlFor="phone" className="form-label">
                     Téléphone :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <input
                     type="number"
                     className="form-control no-focus-outline"
                     id="phone"
                     name="phone"
                     value={user.phone}
                     onChange={handleAdd}
                     autoComplete='off'
                     required
                  />
               </div>
               <div className="col-md-6 ">
                  <label htmlFor="email" className="form-label">
                     Email :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <input
                     type="text"
                     className="form-control no-focus-outline"
                     id="email"
                     name="email"
                     value={user.email}
                     onChange={handleAdd}
                     autoComplete='off'
                     required
                  />
               </div>
               <div className="col-md-6 ">
                  <label htmlFor="password" className="form-label">
                     Mot de passe :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <input
                     type="text"
                     className="form-control no-focus-outline"
                     id="password"
                     name="password"
                     value={user.password}
                     onChange={handleAdd}
                     autoComplete='off'
                     required
                  />
               </div>

               <div className="col-md-6 ">
                  <label htmlFor="env" className="form-label">
                     Environnement :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <select className="form-control no-focus-outline p-2 custom-select" name="env" id="env" value={user.env} required
                     onChange={handleAdd}
                     autoComplete='off'>
                     {envOption.map((item) => (
                        <option key={item.value} value={item.label}>{item.label}</option>
                     ))}
                  </select>
               </div>
               <div className="col-md-6 ">
                  <label htmlFor="idRole" className="form-label">
                     Rôle :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <select className="form-control no-focus-outline p-2 custom-select" name="idRole" id="idRole" value={user.idRole} required
                     onChange={handleAdd}
                     autoComplete='off'>
                     {roleOption.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                     ))}
                  </select>
               </div>
               <div className="col-md-6 ">
                  <label htmlFor="idStatus" className="form-label">
                     Status :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <select className="form-control no-focus-outline p-2 custom-select" name="idStatus" id="idStatus" value={user.idStatus} required
                     onChange={handleAdd}
                     autoComplete='off'>
                     {statusOption.map((item) => (
                        <option key={item.value} value={item.value}>{item.label}</option>
                     ))}
                  </select>
               </div>
               {user.env === 'external' && <div className="col-md-6 ">
                  <label htmlFor="idOrganization" className="form-label">
                     Organisation :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <CustomSelect data={organization} placeholder="Selectionnez une organisation" onSelectedValue={handleOrganizationValue} />
               </div>}
               {user.env === 'external' && <div className="col-md-6 ">
                  <label htmlFor="" className="form-label">
                     Nom de l'entreprise :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <CustomSelect data={company} placeholder="Selectionnez une entreprise" onSelectedValue={handleCompanyValue} />
               </div>}
               <div className="col-md-12 d-flex gap-2">
                  <button type="submit" className="Btn Send btn-sm">
                     <RemixIcons.RiSendPlaneLine />
                     Enregistrer
                  </button>
               </div>
            </form>
         </blockquote>
      </>
   )
}

export default Internal