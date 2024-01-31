import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import HeaderMain from "../../../../components/HeaderMain"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import { Account } from "../../../../services/accountService"
import { Product } from "../../../../services/productService"

const UpdateProduct = () => {
	const Navigate = useNavigate()
	const { id } = useParams()

	// PRODUCT OWNERSHIP
	const [product, setProduct] = useState({
		name: "",
		category: "",
		price: ""
	})

	// PRODUCT OWNERSHIP COPY
	const [lastData, setLastData] = useState({
		name: "",
		category: "",
		price: ""
	})

	// SET ALL VALUE
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setProduct({
			...product,
			[name]: value,
		})
	}

	// GET ONE DATA API
	useEffect(() => {
		Product.getOne(id)
			.then((res) => {
				setProduct({
					name: res.data.content.name,
					category: res.data.content.category,
					price: res.data.content.price,
				})
				setLastData({
					name: res.data.content.name,
					category: res.data.content.category,
					price: res.data.content.price,
				})
			})
	}, [id])

	// UPDATE PRODUCT
	const handleSubmit = (e) => {
		e.preventDefault()
		if (
			product.name === "" ||
			product.category === "" ||
			product.price === "") {
			toast.error("Les champs marqués par une etoile sont obligations !")
		}
		else if (
			product.name === lastData.name &&
			product.category === lastData.category &&
			product.price === lastData.price
		) {
			toast.error("Aucune valeur n'a été modifiée.")
			toast.error("Echec de l'opération  !")
		}
		else {
			Product.update(id, product)
				.then((res) => {
					toast.success("Produit modifié avec succès !")
					Navigate('/managers/products')
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
					<h5>Modifiez les informations concernant le produit.</h5>
					<blockquote className="blockquote mb-0">
						<form onSubmit={handleSubmit} className="row g-2 form" for>
							<div className="col-md-6">
								<label htmlFor="name" className="form-label">
									Nom du produit :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="name"
									name="name"
									value={product.name}
									onChange={handleUpdate}
									autoComplete='off'
									required

								/>
							</div>
							<div className="col-md-12">
								<label htmlFor="category" className="form-label">
									Catégorie :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="text"
									className="form-control no-focus-outline"
									id="category"
									name="category"
									value={product.category}
									onChange={handleUpdate}
									autoComplete='off'
									required
								/>
							</div>
							<div className="col-md-6">
								<label htmlFor="price" className="form-label">
									Price :
									<span className="text-danger taille_etoile">*</span>
								</label>
								<input
									type="number"
									className="form-control no-focus-outline"
									id="price"
									name="price"
									value={product.price}
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
								<button className="Btn Error btn-sm" onClick={() => Navigate('/managers/products')}>
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

export default UpdateProduct