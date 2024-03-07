import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import * as Spinners from 'react-loader-spinner'
import toast from "react-hot-toast"
import HeaderMain from "../../../components/HeaderMain"
import { Organization } from "../../../services/organizationService"
import useHandleError from "../../../hooks/useHandleError"

const UpdateOrganization = () => {
	const Navigate = useNavigate()
	const { id } = useParams()
	
	const [isSubmitting, setIsSubmitting] = useState(false)
	// ORGANIZATION OWNERSHIP
	const [organization, setOrganization] = useState({
		name: "",
		description: "",
		phone: "",
		city: "",
		neighborhood: ""
	})

	// ORGANIZATION OWNERSHIP COPY
	const [lastData, setLastData] = useState({
		name: "",
		description: "",
		phone: "",
		city: "",
		neighborhood: ""
	})

	// SET ALL VALUE
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setOrganization({
			...organization,
			[name]: value,
		})
	}

	// GET ONE DATA API
	useEffect(() => {
		Organization.getOne(id).then((res) => {
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
		}).catch((err) => {
			useHandleError(err, Navigate)
		})
	}, [id])

	// UPDATE ORGANIZATION
	const handleSubmit = (e) => {
		e.preventDefault()
		setIsSubmitting(true)
		if (
			organization.name === "" ||
			organization.description === "" ||
			organization.phone === "" ||
			organization.city === "" ||
			organization.neighborhood === ""
		) {
			toast.error("Les champs marqués par une etoile sont obligations !")
			setIsSubmitting(false)
		}
		else if (
			organization.name === lastData.name &&
			organization.description === lastData.description &&
			organization.phone === lastData.phone &&
			organization.city === lastData.city &&
			organization.neighborhood === lastData.neighborhood
		) {
			setIsSubmitting(false)
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération  !")
		}
		else {
			Organization.update(id, organization)
			.then((res) => {
				toast.success("organization modifiée avec succès !")
				Navigate('/organizations/')
			})
			.catch((err) => {
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
									{isSubmitting ? <Spinners.TailSpin height="18" width="18" ariaLabel="tail-spin-loading" radius="5" color="#fff" /> : <RemixIcons.RiEditCircleLine />}
									{isSubmitting ? 'Modif. en cours' : 'Modifier'}
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
	)
}

export default UpdateOrganization