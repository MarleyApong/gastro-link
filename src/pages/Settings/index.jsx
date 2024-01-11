import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import HeaderMain from "../../components/HeaderMain"
import { User } from "../../services/userService"
import { Account } from "../../services/accountService"
import PleaseNote from "../../components/PleaseNote"
import RequirePassword from "../../components/RequirePassword"
const Settings = () => {
	const Navigate = useNavigate()

	// USER OWNERSHIP
	const [lastData, setLastData] = useState({
		firstName: "",
		lastName: "",
		phone: ""
	})

	// USER OWNERSHIP
	const [user, setUser] = useState({
		firstName: "",
		lastName: "",
		phone: ""
	})

	const [newPassword, setNewPassword] = useState('')
	const [lastPassword, setLastPassword] = useState('')
	const [confirmPassword, setConfigPassword] = useState('')
	const [refresh, setRefresh] = useState(0)
	const [validator, setValidator] = useState(0)


	const id = localStorage.getItem('id')

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
		User.getOne(id)
			.then((res) => {
				setUser({
					firstName: res.data.content.firstName,
					lastName: res.data.content.lastName,
					phone: res.data.content.phone,
				})

				setLastData({
					firstName: res.data.content.firstName,
					lastName: res.data.content.lastName,
					phone: res.data.content.phone
				})

				// setLastPassword(res.data.content.password)
			})
	}, [id, refresh])

	// UPDATE INFO USER
	const handleUDP = (e) => {
		e.preventDefault()
		if (user.firstName === "") {
			toast.error("Le nom ne peut être vide !")
		}
		else if (user.phone === "") {
			toast.error("Le numéro ne peut être vide !")
		}
		else if (
			user.firstName === lastData.firstName &&
			user.lastName === lastData.lastName &&
			user.phone === lastData.phone
		) {
			toast.error("Modifiez une valeur pour continuer !")
		}
		else {
			User.update(id, user)
				.then((res) => {
					toast.success("Informations modifiées !")
					setRefresh((current) => current + 1)
				})
				.catch((err) => {
					console.log("Erreur: ", err);
					if (err.response.status === 400) {
						toast.error("Champs mal renseigné ou format inattendu !", {
							style: {
								textAlign: 'center'
							}
						})
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
					else {
						toast.error("Erreur de données l'utilisateur !")
						Account.logout()
						Navigate("/auth/login")
					}
				})
		}
	}

	// UPDATE PASSWORD USER
	const handleUP = (e) => {
		e.preventDefault()
		if (lastPassword === "") {
			toast.error("Entrez L'ancien mot de passe !")
		}
		else if (newPassword === "") {
			toast.error("Entrez le nouveau mot de passe !")
		}
		else if (newPassword !== confirmPassword) {
			toast.error("Confirmez le nouveau mot de passe!")
		}
		else if (confirmPassword === "") {
			toast.error("Les mot de passe sont différents !")
		}
		else {
			const data = {
				lastPassword: lastPassword,
				newPassword: newPassword,
				confirmPassword: confirmPassword
			}

			User.changePassword(id, data)
				.then((res) => {
					console.log("res: ", res);
					toast.success("Mot de passe modifié avec succès !")
					setRefresh((current) => current + 1)
					setValidator(0)
				})
				.catch((err) => {
					console.log("Erreur: ", err);
					if (err.response) {
						if (err.response.data.error.name === "MissingData") {
							toast.error("Erreur, données incomplètes !")
						}
						else if (err.response.data.error.name === "MissingParams") {
							toast.error("Erreur, Paramètres incomplètes !")
						}
						else if (err.response.data.error.name === "BadRequest") {
							toast.error("Erreur, mot de passe non modifié !")
						}
						else if (err.response.data.error.name === "ProcessCompareFailed") {
							setValidator(1)
							toast.error("Erreur, mot de passe incorret !")
						}
						else if (err.response.data.error.name === "NotFound") {
							toast.error("Erreur, utilisateur non trouvé !")
						}
						if (err.response.data.error.name === 'RegexPasswordValidationError') {
							setValidator(2)
							toast.error("Le nouveau mot de passe n'est pas valide !")
						}
					}
					else {

					}
				})
		}
	}

	return (
		<>
			<div>
				<HeaderMain />

				<div className="card-body CardBody card">
					<h5>Modifiez vos informations personnelles</h5>
					<PleaseNote />
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleUDP} className="row g-2 form" for>
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
									<span className="text-danger taille_etoile"></span>
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

							<div className="col-md-12 d-flex gap-2 justify-content-between">
								<button type="submit" className="Btn Send btn-sm">
									<RemixIcons.RiEditCircleLine />
									Modifier
								</button>
							</div>
						</form>

						<form onSubmit={handleUP} className="row g-2 form">
							<h5 className="mt-4">Modifiez votre mot de passe</h5>
							{validator === 2 && <RequirePassword/>}
							<div className="col-md-6">
								<label htmlFor="phone" className="form-label">
									Ancien mot de passe :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className={validator === 1 ? "form-control no-focus-outline border border-danger" : validator === 2 ? "form-control no-focus-outline border border-success" : "form-control no-focus-outline"}
									id="phone"
									name="phone"
									value={lastPassword}
									onChange={(e) => setLastPassword(e.target.value)}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="newPassword" className="form-label">
									Nouveau mot de passe :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className={validator === 2 ? "form-control no-focus-outline border border-danger" : "form-control no-focus-outline"}
									id="newPassword"
									name="newPassword"
									value={newPassword}
									onChange={(e) => setNewPassword(e.target.value)}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="confirmPassword" className="form-label">
									Confirmez mot de passe :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className={validator === 2 ? "form-control no-focus-outline border border-danger" : "form-control no-focus-outline"}
									id="confirmPassword"
									name="confirmPassword"
									value={confirmPassword}
									onChange={(e) => setConfigPassword(e.target.value)}
									autoComplete='off'
									required
								/>
							</div>

							<div className="col-md-12 d-flex gap-2 justify-content-between">
								<button type="submit" className="Btn Send btn-sm">
									<RemixIcons.RiEditCircleLine />
									Modifier
								</button>
							</div>
						</form>
					</blockquote>
				</div>
			</div>
		</>
	)
}

export default Settings