import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { User } from "../../../../../services/userService"
import RequirePassword from "../../../../../components/RequirePassword"
import { EnvOption, RoleOption, StatusOption } from "../../../../../data/optionFilter"
import { Company } from "../../../../../services/companyService"

const External = ({Navigate, CustomSelect}) => {
   const statusOption = StatusOption()
   const roleOption = RoleOption()
   const envOption = EnvOption()
   const idUser = localStorage.getItem('id')

   const [validator, setValidator] = useState(0)
   const [idOrganization, setIdOrganization] = useState('')
   const [company, setCompany] = useState([])
   const [selectedCompanyValue, setSelectedCompanyValue] = useState({})
   const [user, setUser] = useState({
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
      env: "external",
      idRole: "",
      idStatus: "",
      idOrganization: "",
      idCompany: ""
   })

   // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
   const handleCompanyValue = useCallback((value) => {
      setSelectedCompanyValue(value)
   }, [])

   const role = roleOption.filter((item,_) => item.label !== 'super admin')

   // PUSH SELECTED ID OF ORGANIZATION, COMPANY AND PASSWORD
   user.idOrganization = idOrganization
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
      const loadOrganization = async () => {
         const res = await User.getOrganizationCompany(idUser)
         setIdOrganization(res.data.content.Company.Organization.id)
      }

      loadOrganization()
   }, [idUser])

   useEffect(() => {
      const loadCompany = async () => {
         const status = 'actif'
         const res = await Company.getCompaniesByOrganization(idOrganization, status)
         setCompany(res.data.content)
      }

      loadCompany()
   }, [idOrganization])

   console.log("user", user);

   // ADD USER
   const handleSubmit = (e) => {
      e.preventDefault()
      User.add(user)
         .then((res) => {
            toast.success("Utilisateur ajouté avec succès !")
            Navigate('/users/list')
         })
         .catch((err) => {
            console.log("err: ", err);
            if (err.response) {
               if (err.response.data.error.name === 'RegexPasswordValidationError') {
                  setValidator(2)
                  toast.error("Le mot de passe n'est pas valide !")
               }
               else if (err.response.data.error.name === 'AddLimitReached') {
                  toast.error("Le rôle super admin est limité à 2.")
                  toast.error("Opération non authorisée !")
               }
               else if (err.response.data.error.name === 'AlreadyExist') {
                  toast.error("Désolé, cet utilisateur existe déjà !")
               }
            }
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
                  <label htmlFor="idRole" className="form-label">
                     Rôle :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <select className="form-control no-focus-outline p-2 custom-select" name="idRole" id="idRole" value={user.idRole} required
                     onChange={handleAdd}
                     autoComplete='off'>
                     {role.map((item) => (
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
               <div className="col-md-6 ">
                  <label htmlFor="" className="form-label">
                     Nom de l'entreprise :
                     <span className="text-danger taille_etoile">*</span>
                  </label>
                  <CustomSelect data={company} placeholder="Selectionnez une entreprise" onSelectedValue={handleCompanyValue} />
               </div>
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

export default External