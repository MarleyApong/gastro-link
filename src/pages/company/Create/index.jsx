import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import HeaderMain from "../../../components/HeaderMain"
import { useNavigate } from "react-router-dom"
import { Company } from "../../../services/companyService"
import { Organization } from "../../../services/organizationService"
import CustomSelect from "../../../components/CustomSelect"
import PleaseNote from "../../../components/PleaseNote"
import { StatusOption } from "../../../data/optionFilter"

const CreateCompany = () => {
	const Navigate = useNavigate()
	const statusOption = StatusOption()
	const order = 'asc'
	const filter = 'name'
	const status = 'actif'
	const search = ''
	const limit = 10000
	const page = 0

	const [file, setFile] = useState('')
	const [organization, setOrganization] = useState([])
	const [selectedValue, setSelectedValue] = useState({})
	const [company, setCompany] = useState({
		idOrganization: "",
		idStatus: "",
		name: "",
		description: "",
		category: "restaurant",
		phone: "",
		email: "",
		city: "",
		neighborhood: "",
	})

	// RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
	const handleSelectedValue = useCallback((value) => {
		setSelectedValue(value)
	}, [])

	// PUSH SELECTED ID OF ORGANIZATION 
	company.idOrganization = selectedValue.value

	// SET ALL VALUE
	const handleAdd = (e) => {
		const { name, value } = e.target;
		setCompany({
			...company,
			[name]: value,
		})
	}

	// CHOISE PICTURE
	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFile(selectedFile)
	}

	// FETCH ALL DATA
	useEffect(() => {
		Organization.getAll(order, filter, status, search, limit, page)
			.then((res) => {
				setOrganization(res.data.content.data)
			})
	}, [order, filter, status, search, limit, page])

	// ADD COMPANY
	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			selectedValue === false
			|| company.name === ""
			|| company.description === ""
			|| company.email === ""
			|| company.phone === ""
			|| company.city === ""
			|| company.neighborhood === ""
			|| company.idStatus === "") {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else {
			const formData = new FormData();
			Object.keys(company).forEach((key) => {
				formData.append(key, company[key]);
			})

			if (file) {
				formData.append('picture', file);
			}


			Company.add(formData)
				.then((res) => {
					toast.success("Entreprise ajoutée avec succès !")
					Navigate('/companies/')
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
						account_service.logoutAdmin()
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
					// 	account_service.logout()
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
					<h5>Entrez les informations concernant votre entreprise.</h5>
					<PleaseNote />
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleSubmit} className="row g-2 form" for>
							<div className="col-md-6">
								<label htmlFor="" className="form-label">
									Nom de l'organisation:
									<span className="text-danger taille_etoile">*</span>
								</label>
								<CustomSelect data={organization} placeholder="Selectionnez une organisation" onSelectedValue={handleSelectedValue} />
							</div>
							<div className="col-md-6">
								<label htmlFor="name" className="form-label">
									Nom de l'entreprise :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="name"
									name="name"
									value={company.name}
									onChange={handleAdd}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="email" className="form-label">
									Email :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="email"
									className="form-control no-focus-outline"
									id="email"
									name="email"
									value={company.email}
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
									value={company.description}
									onChange={handleAdd}
									autoComplete='off'
									required
								>

								</textarea>
							</div>
							<div className="col-md-6">
								<label htmlFor="secteur_ac" className="form-label">
									Secteur d'activité :
									<span className="text-danger fs-5">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="secteur_ac"
									name="category"
									value={company.category}
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
									value={company.phone}
									onChange={handleAdd}
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
									value={company.city}
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
								<select className="form-control no-focus-outline p-2 custom-select" name="idStatus" id="idStatus" value={company.idStatus} required
									onChange={handleAdd}
									autoComplete='off'>
									{statusOption.map((status, index) => (
										<option key={index} value={status.value}>{status.label}</option>
									))}
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
									value={company.neighborhood}
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

export default CreateCompany
