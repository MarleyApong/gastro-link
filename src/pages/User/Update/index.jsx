import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import * as Spinners from 'react-loader-spinner'
import toast from "react-hot-toast"
import HeaderMain from "../../../components/HeaderMain"
import { User } from "../../../services/userService"
import { Account } from "../../../services/accountService"
import { Role } from "../../../services/roleService"
import { StatusOption } from "../../../data/optionFilter"
import useHandleError from "../../../hooks/useHandleError"
import Access from "../../../guard/AccessGuard"

const UpdateUser = () => {
	const Navigate = useNavigate()
	const statusOption = StatusOption()
	const access = Access()
	const { id } = useParams()
	const idUser = Account.getUserId()

	const [isSubmitting, setIsSubmitting] = useState(false)

	// USER OWNERSHIP
	const [lastData, setLastData] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		idRole: "",
		idStatus: ""
	})

	// USER OWNERSHIP
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		email: "",
		phone: "",
		idRole: "",
		idStatus: ""
	})

	// ROLEDATA OWNERSHIP
	const [roleData, setRoleData] = useState([])
	const [idUserData, setIdUserData] = useState('')

	// SET ALL VALUE
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setUser({
			...user,
			[name]: value,
		})
	}

	// GET ONE DATA API
	useEffect(() => {
		User.getOne(id).then((res) => {
			setUser({
				firstName: res.data.content.firstName,
				lastName: res.data.content.lastName,
				email: res.data.content.email,
				phone: res.data.content.phone,
				role: res.data.content.role,
				status: res.data.content.status
			})
			setLastData({
				firstName: res.data.content.firstName,
				lastName: res.data.content.lastName,
				email: res.data.content.email,
				phone: res.data.content.phone,
				role: res.data.content.role,
				status: res.data.content.status
			})
			setIdUserData(res.data.content.id)
		}).catch((err) => {
			useHandleError(err, Navigate)
		})
	}, [id])

	// GET ALL ROLE DATA API
	useEffect(() => {
		Role.getAll().then((res) =>
			setRoleData(res.data.content)
		).catch((err) => {
			useHandleError(err, Navigate)
		})
	}, [])

	// UPDATE USER
	const handleSubmit = (e) => {
		e.preventDefault()
		if (user.firstName === "" || user.phone === "" || user.email === "" || user.idRole === "" || user.idStatus === "") {
			setIsSubmitting(false)
			toast.error("Les champs marqués par une étoile sont obligations !")
		}
		else if (
			user.firstName === lastData.firstName &&
			user.lastName === lastData.lastName &&
			user.email === lastData.email &&
			user.phone === lastData.phone &&
			user.idRole === lastData.role &&
			user.idStatus === lastData.idStatus
		) {
			setIsSubmitting(false)
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération !")
		}
		else {
			User.update(id, user)
			.then((res) => {
				toast.success("Utilisateur modifié avec succès !")
				Navigate('/users')
			}).catch((err) => {
				useHandleError(err, Navigate)
			})
			.finally(() => {
				setIsSubmitting(false)
			})
		}
	}

	return (
		<>
			<div>
				<HeaderMain />

				<div className="card-body CardBody card">
					<h5>Modifiez les informations concernant votre organisation.</h5>
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleSubmit} className="row g-2 form" for>
							<div className="col-md-6">
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
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="lastName" className="form-label">
									Prénom :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="lastName"
									name="lastName"
									value={user.lastName}
									onChange={handleUpdate}
									autoComplete='off'
								/>
							</div>
							<div className="col-md-6">
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
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
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
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>
							{((access === 13 || access === 23) && idUser === idUserData) ? null : (
								<div className="col-md-6">
									<label htmlFor="idRole" className="form-label">
										Rôle :
										<span className="text-danger taille_etoile"></span>
									</label>

									<select name="idRole" id="idRole" onChange={handleUpdate} className="form-control no-focus-outline">
										<option value=""></option>
										{roleData.map((item) => (
											<option key={item.id} value={item.id}>{item.name}</option>
										))}
									</select>
								</div>
							)}

							{((access === 13 || access === 23) && idUser === idUserData) ? null : (
								<div className="col-md-6">
									<label htmlFor="status" className="form-label">
										Statut :
										<span className="text-danger taille_etoile"></span>
									</label>
									<select name="idStatus" id="idStatus" onChange={handleUpdate} className="form-control no-focus-outline">
										{statusOption.map((item) => (
											<option key={item.value} value={item.value}>{item.label}</option>
										))}
									</select>
								</div>
							)}

							<div className="col-md-12 d-flex gap-2 justify-content-between">
								<button type="submit" className="Btn Send btn-sm">
									{isSubmitting ? <Spinners.TailSpin height="18" width="18" ariaLabel="tail-spin-loading" radius="5" color="#fff" /> : <RemixIcons.RiEditCircleLine />}
									{isSubmitting ? 'Modif. en cours' : 'Modifier'}
								</button>
								<button className="Btn Error btn-sm" onClick={() => Navigate('/users')}>
									<RemixIcons.RiCloseLine />
									Annuler / Retour
								</button>
							</div>
						</form>
					</blockquote>
				</div>
			</div>
		</>
	)
}

export default UpdateUser