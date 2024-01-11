import React, { useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import HeaderMain from "../../../components/HeaderMain"
import { Organization } from "../../../services/organizationService"
import { useNavigate } from "react-router-dom"
import { Account } from "../../../services/accountService"
import PleaseNote from "../../../components/PleaseNote"

const CreateOrganization = () => {
	const Navigate = useNavigate()
	const [file, setFile] = useState('')

	// ORGANIZATION OWNERSHIP
	const [organization, setOrganization] = useState({
		name: "",
		description: "",
		phone: "",
		city: "",
		neighborhood: "",
		idStatus: ""
	})

	// SET ALL VALUE
	const handleAdd = (e) => {
		const { name, value } = e.target;
		setOrganization({
			...organization,
			[name]: value,
		})
	}

	// CHOISE PICTURE
	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile);
	}

	// ADD ORGANIZATION
	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			organization.name === "" ||
			organization.description === "" ||
			organization.phone === "" ||
			organization.city === "" ||
			organization.neighborhood === "" ||
			organization.idStatus === "") {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else {
			const formData = new FormData();
			Object.keys(organization).forEach((key) => {
				formData.append(key, organization[key]);
			});
			if (file) {
				formData.append('picture', file);
			}

			Organization.add(formData)
				.then((res) => {
					toast.success("organization ajoutée avec succès !")
					Navigate('/organizations/')
				})
				.catch((err) => {
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
						toast.error("Erreur de données organization(e)s !")
						Account.logout()
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
					<h5>Entrez les informations concernant votre organisation.</h5>
					<PleaseNote/>
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
									onChange={handleAdd}
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
									value={organization.phone}
									onChange={handleAdd}
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
									onChange={handleAdd}
									autoComplete='off'
									required
								>
								</textarea>
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
									onChange={handleAdd}
									autoComplete='off'
									required
								/>
							</div>

							<div className="col-md-6 ">
								<label htmlFor="idStatus" className="form-label">
									Status :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<select className="form-control no-focus-outline p-2" name="idStatus" id="idStatus" value={organization.idStatus} required
									onChange={handleAdd}
									autoComplete='off'>
									<option value=""></option>
									<option value="1">actif</option>
									<option value="2">inactif</option>
								</select>
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
									onChange={handleAdd}
									autoComplete='off'
									required
								/>
							</div>

							<div className="col-md-6 ">
								<label htmlFor="picture" className="form-label">Logo :</label>
								<input
									type="file"
									className="form-control no-focus-outline"
									id="picture"
									name="picture"
									onChange={handleFileChange}
								/>
							</div>

							<div className="col-md-12 d-flex gap-2">
								<button type="submit" className="Btn Send btn-sm">
									<RemixIcons.RiSendPlaneLine />
									Enregistrer
								</button>
							</div>
						</form>
					</blockquote>
				</div>
			</div>
		</>
	)
}

export default CreateOrganization