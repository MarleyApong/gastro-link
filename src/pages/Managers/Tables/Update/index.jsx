import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderMain from "../../../../components/HeaderMain"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { Account } from "../../../../services/accountService"
import { Table } from "../../../../services/tableService"
import Access from "../../../../utils/utilsAccess"

const UpdateTable = () => {
	const Navigate = useNavigate()
	const { id } = useParams()
	const access = Access()
   const idUser = localStorage.getItem('id')

	const order = 'asc'
   const filter = 'name'
   const status = 'actif'
   const search = ''
   const limit = 20
   const page = 0

	const [company, setCompany] = useState([])
	// TABLE OWNERSHIP
	const [table, setTable] = useState({
		tableNumber: "",
		idCompany: ''
	})

	// TABLE OWNERSHIP COPY
	const [lastData, setLastData] = useState({
		tableNumber: ""
	})

	// SET ALL VALUE
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setTable({
			...table,
			[name]: value,
		})
	}

	table.idCompany = company[0].id

	// GET ONE DATA API
	useEffect(() => {
		Table.getOne(id)
			.then((res) => {
				setTable({
					tableNumber: res.data.content.tableNumber
				})
				setLastData({
					tableNumber: res.data.content.tableNumber
				})
			})
	}, [id])

	useEffect(() => {
      Company.getCompanyByUser(idUser, order, filter, search, status, limit, page)
         .then((res) => {
            setCompany(res.data.content.data)
         })
         .catch((error) => console.error('Erreur lors de la récupération des entreprises par organisation :', error))
   }, [idUser, status])

	// UPDATE TABLE
	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			table.tableNumber === "") {
			toast.error("Champ obligation !")
		}
		else if (
			table.tableNumber === lastData.tableNumber 
		) {
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération  !")
		}
		else {
			Table.update(id, table)
				.then((res) => {
					toast.success("Table modifiée avec succès !")
					Navigate('/managers/tables')
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
						toast.error("Erreur de données produits !")
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
					<h5>Modifiez les informations concernant la table.</h5>
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleSubmit} className="row g-2 form" for>
							<div className="col-md-6">
								<label htmlFor="tableNumber" className="form-label">
									Nom / numéro de la table :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="tableNumber"
									name="tableNumber"
									value={table.tableNumber}
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
								<button className="Btn Error btn-sm" onClick={() => Navigate('/managers/tables')}>
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

export default UpdateTable