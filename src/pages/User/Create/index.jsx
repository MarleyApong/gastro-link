import React from "react"
import { useNavigate } from "react-router-dom"
import HeaderMain from "../../../components/HeaderMain"
import CustomSelect from "../../../components/CustomSelect"
import PleaseNote from "../../../components/PleaseNote"
import Internal from "./Components/Internal"
import External from "./Components/External"
import Access from "../../../utils/utilsAccess"

const CreateUser = () => {
	const Navigate = useNavigate()
	const access = Access()

	return (
		<>
			<div>
				<HeaderMain />

				<div className="card-body CardBody card">
					<h5>Entrez les informations concernant l'utilisateur.</h5>
					<PleaseNote />
					{access === 12 || access === 13 && (
						<Internal
							Navigate={Navigate}
							access={access}
							CustomSelect={CustomSelect}
						/>
					)}
					{access === 21 || access === 22 || access === 23 && (
						<External
							Navigate={Navigate}
							access={access}
							CustomSelect={CustomSelect}
						/>
					)}
				</div>
			</div>
		</>
	)
}

export default CreateUser