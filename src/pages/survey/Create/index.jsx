import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Company } from "../../../services/companyService"
import { Organization } from "../../../services/organizationService"
import { Survey } from "../../../services/surveyService"
import { Account } from "../../../services/accountService"
import HeaderMain from "../../../components/HeaderMain"
import CustomSelect from "../../../components/CustomSelect"

const CreateSurvey = () => {
	const Navigate = useNavigate()
	const order = 'asc'
	const filter = 'name'
	const status = 1
	const search = ''
	const limit = 10000
	const page = 0

	const [idOrganization, setIdOrganization] = useState('')
	const [organization, setOrganization] = useState([])
	const [selectedValue, setSelectedValue] = useState({})
	const [company, setCompany] = useState([])
	const [survey, setSurvey] = useState({
		idCompany: "",
		idStatus: "",
		name: "",
	})

	const handleOrganizationValue = useCallback((value) => {
		setSelectedValue(value)
	}, [])

	const handleCompanyValue = useCallback((value) => {
		setSelectedValue(value)
	}, [])
	survey.idCompany = selectedValue.value

	const handleAdd = (e) => {
		const { name, value } = e.target;
		setSurvey({
			...survey,
			[name]: value,
		})
	}

	useEffect(() => {
		Organization.getAll(order, filter, status, search, limit, page)
			.then((res) => setOrganization(res.data.content.data))

	}, [order, filter, status, search, limit, page])

	useEffect(() => {
		Company.getAll(order, filter, search, status)
			.then((res) => setCompany(res.data.content.data))
			.catch((err) => console.log("Erreur: ", err))
	}, [idOrganization])

	const filterCompany = company.filter((item) => item.idOrganization === idOrganization)

	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			selectedValue === false
			|| survey.idCompany === ""
			|| survey.name === ""
			|| survey.idStatus === "") {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else {
			Survey.add(survey)
				.then((res) => {
					toast.success("Enquête ajoutée avec succès !")
					Navigate('/surveys/list')
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
					<h5>Entrez les informations concernant l'enquête.</h5>
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleSubmit} className="row g-2 form">
							<div className="col-md-6 ">
								<label htmlFor="neighborhood" className="form-label">
									Nom de l'enquête :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="name"
									name="name"
									value={survey.name}
									onChange={handleAdd}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="" className="form-label">
									Nom de l'organisation:
									<span className="text-danger taille_etoile">*</span>
								</label>
								<CustomSelect data={organization} setId={setIdOrganization} placeholder="Selectionnez une organisation" onSelectedValue={handleOrganizationValue} />
							</div>
							<div className="col-md-6">
								<label htmlFor="" className="form-label">
									Nom de l'entreprise :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<CustomSelect data={filterCompany} placeholder="Selectionnez une entreprise" onSelectedValue={handleCompanyValue} />
							</div>

							<div className="col-md-6 ">
								<label htmlFor="idStatus" className="form-label">
									Status :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<select className="form-control no-focus-outline p-2 custom-select" name="idStatus" id="idStatus" value={survey.idStatus} required
									onChange={handleAdd}
									autoComplete='off'>
									<option value=""></option>
									<option value="1">actif</option>
									<option value="2">inactif</option>
								</select>
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
	);
};



export default CreateSurvey
