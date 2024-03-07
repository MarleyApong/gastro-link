import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderMain from "../../../../components/HeaderMain"
import * as RemixIcons from "react-icons/ri"
import * as Spinners from 'react-loader-spinner'
import toast from "react-hot-toast"
import { Account } from "../../../../services/accountService"
import { Table } from "../../../../services/tableService"
import useHandleError from "../../../../hooks/useHandleError"

const UpdateTable = () => {
	const Navigate = useNavigate()
	const { id } = useParams()

	const [isSubmitting, setIsSubmitting] = useState(false)
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
		const { name, value } = e.target
		setTable({
			...table,
			[name]: value,
		})
	}

	// GET ONE DATA API
	useEffect(() => {
		Table.getOne(id).then((res) => {
			setTable({
				tableNumber: res.data.content.tableNumber,
				idCompany: res.data.content.idCompany
			})
			setLastData({
				tableNumber: res.data.content.tableNumber
			})
		}).catch((err) => {
			useHandleError(err, Navigate)
		})
	}, [id])

	// UPDATE TABLE
	const handleSubmit = (e) => {
		e.preventDefault()
		setIsSubmitting(true)
		if (
			table.tableNumber === "") {
			setIsSubmitting(false)
			toast.error("Champ obligation !")
		}
		else if (
			table.tableNumber === lastData.tableNumber
		) {
			setIsSubmitting(false)
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération  !")
		}
		else {
			Table.update(id, table).then((res) => {
				toast.success("Table modifiée avec succès !")
				Navigate('/managers/tables')
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
									{isSubmitting ? <Spinners.TailSpin height="18" width="18" ariaLabel="tail-spin-loading" radius="5" color="#fff" /> : <RemixIcons.RiEditCircleLine />}
									{isSubmitting ? 'Modif. en cours' : 'Modifier'}
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