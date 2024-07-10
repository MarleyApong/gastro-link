import React, { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import CustomSelect from "../../../../components/CustomSelect"
import HeaderMain from "../../../../components/HeaderMain"
import PleaseNote from "../../../../components/PleaseNote"
import Access from "../../../../guard/AccessGuard"
import Internal from "./Components/Internal"
import External from "./Components/External"
import { StatusOption } from "../../../../data/optionFilter"
import { Account } from "../../../../services/accountService"

const CreateProduct = () => {
	const Navigate = useNavigate()
	const access = Access()
	const statusOption = StatusOption()
	const idUser = Account.getUserId()

	let idStatus = ''

	// GET ID OF STATUS
	const objetFounded = statusOption.filter((item, _) => item.label === 'actif').map((status, _) => status.value)
	if (objetFounded) {
		idStatus = objetFounded.toString()
	}

	return (
		<>
			<div>
				<HeaderMain />

				<div className="card-body CardBody card">
					<h5>Entrez les informations concernant le produit.</h5>
					<PleaseNote />
					{(access === 12 || access === 13) && (
						<Internal
							Navigate={Navigate}
							access={access}
							CustomSelect={CustomSelect}
						/>
					)}
					{(access === 21 || access === 22 || access === 23) && (
						<External
							Navigate={Navigate}
							access={access}
							idStatus={idStatus}
							idUser={idUser}
							CustomSelect={CustomSelect}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default CreateProduct