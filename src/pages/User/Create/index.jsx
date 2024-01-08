import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Company } from "../../../services/companyService"
import { Organization } from "../../../services/organizationService"
import { Account } from "../../../services/accountService"
import HeaderMain from "../../../components/HeaderMain"
import CustomSelect from "../../../components/CustomSelect"
import { User } from "../../../services/userService"

const CreateUser = () => {
	const Navigate = useNavigate()
	const order = 'asc'
	const filter = 'name'
	const status = 1
	const search = ''
	const limit = 10000
	const page = 0

	const [organization, setOrganization] = useState([])
	const [selectedValue, setSelectedValue] = useState({})
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		phone: "",
		email: "",
		password: "",
		idEnv: "",
		idRole: "",
		idStatus: "",
	})

	const handleSelectedValue = useCallback((value) => {
		setSelectedValue(value)
	}, [])

	user.idOrganization = selectedValue.value
	user.password = user.firstName.substring(0,3) + user.phone.substring(0,4) + user.firstName.substring(1,2).toUpperCase() + '@'

	const handleAdd = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		})
	}

	useEffect(() => {
		Organization.getAll(order, filter, status, search, limit, page)
			.then((res) => {
				setOrganization(res.data.content.data)
			})
	}, [order, filter, status, search, limit, page])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			selectedValue === false
			|| user.firstName === ""
			|| user.phone === ""
			|| user.email === ""
			|| user.password === ""
			|| user.idEnv === ""
			|| user.idRole === ""
			|| user.idStatus === ""
		) {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else {
			User.add(user)
				.then((res) => {
					toast.success("Utilisateur ajouté avec succès !")
					Navigate('/users/list')
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
					// else {
					// 	toast.error("Erreur de données company(e)s !")
					// 	account.logout()
					// 	Navigate("/auth/login")
					// }
				})
		}
	}

	return (
		<>
			<div>
				<HeaderMain />

				<div className="card-body CardBody card">
					<h5>Entrez les informations concernant l'utilisateur.</h5>
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
									type="text"
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
								<label htmlFor="idEnv" className="form-label">
									Environnement :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<select className="form-control no-focus-outline p-2 custom-select" name="idEnv" id="idEnv" value={user.idEnv} required
									onChange={handleAdd}
									autoComplete='off'>
									<option value=""></option>
									<option value="1">interne</option>
									<option value="2">externe</option>
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
									<option value=""></option>
									<option value="1">user</option>
									<option value="2">admin</option>
									<option value="3">super admin</option>
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
									<option value=""></option>
									<option value="1">actif</option>
									<option value="2">inactif</option>
								</select>
							</div>
							<div className="col-md-6 ">
								<label htmlFor="idOrganization" className="form-label">
									Organisation :
									<span className="text-danger taille_etoile"></span>
								</label>
								<CustomSelect data={organization}  placeholder="Selectionnez une organisation" onSelectedValue={handleSelectedValue} />
							</div>

							<div className="col-md-12 d-flex gap-2">
								<button type="submit" className="Btn Send btn-sm">
									<RemixIcons.RiSendPlaneLine />
									Enregistrer
								</button>
								{/* <button type="reset" className="Btn Error btn-sm">
									<RemixIcons.RiCloseLine />
									Retour
								</button> */}
							</div>
						</form>
					</blockquote>
				</div>
			</div>
		</>
	);
};



export default CreateUser
