import React, { useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import HeaderMain from "../../../components/HeaderMain"
import { useNavigate, useParams } from "react-router-dom"
import { Account } from "../../../services/accountService"
import { Company } from "../../../services/companyService"
import useHandleError from "../../../hooks/useHandleError"

const UpdateCompany = () => {
	const Navigate = useNavigate()
	const { id } = useParams()

	// COMPANY OWNERSHIP
	const [company, setCompany] = useState({
		name: "",
		description: "",
		email: "",
		category: "",
		phone: "",
		city: "",
		neighborhood: ""
	})

	// COMPANY OWNERSHIP COPY
	const [lastData, setLastData] = useState({
		name: "",
		description: "",
		email: "",
		category: "",
		phone: "",
		city: "",
		neighborhood: ""
	})

	// SET ALL VALUE
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setCompany({
			...company,
			[name]: value,
		})
	}

	// GET ONE DATA API
	useEffect(() => {
		Company.getOne(id)
			.then((res) => {
				setCompany({
					name: res.data.content.name,
					description: res.data.content.description,
					category: res.data.content.category,
					email: res.data.content.email,
					phone: res.data.content.phone,
					city: res.data.content.city,
					neighborhood: res.data.content.neighborhood
				})
				setLastData({
					name: res.data.content.name,
					description: res.data.content.description,
					category: res.data.content.category,
					email: res.data.content.email,
					phone: res.data.content.phone,
					city: res.data.content.city,
					neighborhood: res.data.content.neighborhood
				})
			})
			.catch((err) => {
				useHandleError(err, Navigate)
			})
	}, [id])

	// ADD COMPANY
	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			company.name === "" ||
			company.description === "" ||
			company.email === "" ||
			company.category === "" ||
			company.phone === "" ||
			company.city === "" ||
			company.neighborhood === "") {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else if (
			company.name === lastData.name &&
			company.description === lastData.description &&
			company.email === lastData.email &&
			company.category === lastData.category &&
			company.phone === lastData.phone &&
			company.city === lastData.city &&
			company.neighborhood === lastData.neighborhood
		) {
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération  !")
		}
		else {
			Company.update(id, company)
				.then((res) => {
					toast.success("Entreprise modifiée avec succès !")
					Navigate('/companies/')
				})
				.catch((err) => {
					useHandleError(err, Navigate)
				})
		}
	}

	return (
		<>
			<div>
				<HeaderMain />

				<div className="card-body CardBody card">
					<h5>Modifiez les informations concernant votre entreprise.</h5>
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleSubmit} className="row g-2 form">
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
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="name" className="form-label">
									Email :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="email"
									name="email"
									value={company.email}
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
									value={company.description}
									onChange={handleUpdate}
									autoComplete='off'
									required
								>
								</textarea>
							</div>
							<div className="col-md-6">
								<label htmlFor="phone" className="form-label">
									Secteur d'activité :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="category"
									name="category"
									value={company.category}
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
									value={company.phone}
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
									value={company.city}
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
									value={company.neighborhood}
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
								<button className="Btn Error btn-sm" onClick={() => Navigate('/companies')}>
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

export default UpdateCompany