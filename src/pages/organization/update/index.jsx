import React, { useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import HeaderMain from "../../../components/header-main"
import { Organizations } from "../../../services/organizations"
import { useNavigate, useParams } from "react-router-dom"
import { account } from "../../../services/account"

const UpdateOrganization = () => {
	const Navigate = useNavigate()
	const { id } = useParams()

	const [file, setFile] = useState('')
	const [lastData, setLastData] = useState({
		name: "",
		description: "",
		phone: "",
		city: "",
		neighborhood: ""
	})
	const [organization, setOrganization] = useState({
		name: "",
		description: "",
		phone: "",
		city: "",
		neighborhood: ""
	})

	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setOrganization({
			...organization,
			[name]: value,
		})
	}

	useEffect(() => {
		Organizations.getOne(id)
			.then((res) => {
				setOrganization({
					name: res.data.content.name,
					description: res.data.content.description,
					phone: res.data.content.phone,
					city: res.data.content.city,
					neighborhood: res.data.content.neighborhood
				})
				setLastData({
					name: res.data.content.name,
					description: res.data.content.description,
					phone: res.data.content.phone,
					city: res.data.content.city,
					neighborhood: res.data.content.neighborhood
				})
			})
	}, [id])

	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			organization.name === "" ||
			organization.description === "" ||
			organization.phone === "" ||
			organization.city === "" ||
			organization.neighborhood === "") {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else if (
			organization.name === lastData.name &&
			organization.description === lastData.description &&
			organization.phone === lastData.phone &&
			organization.city === lastData.city &&
			organization.neighborhood === lastData.neighborhood
		) {
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération  !")
		}
		else {
			Organizations.update(id, organization)
				.then((res) => {
					toast.success("organization modifiée avec succès !")
					Navigate('/organizations/')
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
						account.logout()
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
						toast.error("Erreur de données organization(e)s !")
						account_service.logout()
						Navigate("/auth/login")
					}
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
								<label htmlFor="name" className="form-label">
									Nom de l'organisation :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="name"
									name="name"
									value={organization.name}
									onChange={handleUpdate}
									autoComplete='off'
									required

								/>
							</div>
							<div className="col-md-12">
								<label htmlFor="num_imma" className="form-label">
									Description :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<textarea className="form-control no-focus-outline"
									cols="10"
									rows="5"
									id="description"
									name="description"
									value={organization.description}
									onChange={handleUpdate}
									autoComplete='off'
									required
								>

								</textarea>
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
									value={organization.phone}
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>

							<div className="col-md-6">
								<label htmlFor="city" className="form-label">
									Ville :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="city"
									name="city"
									value={organization.city}
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>

							<div className="col-md-6 ">
								<label htmlFor="neighborhood" className="form-label">
									Quartier :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="neighborhood"
									name="neighborhood"
									value={organization.neighborhood}
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
								<button className="Btn Error btn-sm" onClick={() => Navigate('/organizations')}>
									<RemixIcons.RiCloseLine />
									Annuler / Retour
								</button>
							</div>
						</form>
					</blockquote>
				</div>
			</div>
		</>
	);
};



export default UpdateOrganization
