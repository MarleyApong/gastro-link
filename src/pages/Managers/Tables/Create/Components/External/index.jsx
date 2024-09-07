import React, { useCallback, useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import * as Spinners from 'react-loader-spinner'
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import { Company } from "../../../../../../services/companyService"
import { Table } from "../../../../../../services/tableService"
import useHandleError from "../../../../../../hooks/useHandleError"

const MySwal = withReactContent(Swal)

const External = ({ Navigate, access, idStatus, idUser, CustomSelect }) => {
    const order = 'asc'
    const filter = 'name'
    const status = 'actif'
    const search = ''
    const limit = 20
    const page = 0

    const [isSubmitting, setIsSubmitting] = useState(false)
    const [selectedCompanyValue, setSelectedCompanyValue] = useState({})
    const [company, setCompany] = useState([])
    const [table, setTable] = useState({
        idCompany: "",
        tableNumber: "",
        prefix: "",
        numberOfTables: "",
        baseNumber: ""
    })
    const [toggleChecked, setToggleChecked] = useState(false)

    // RETURN THE SELECTED VALUE FROM THE CUSTOMSELECT COMPONENT
    const handleCompanyValue = useCallback((value) => {
        setSelectedCompanyValue(value)
    }, [])

    // PUSH SELECTED ID OF COMPANY
    if (access === 23) {
        table.idCompany = selectedCompanyValue.value
    }
    else if (access === 22 && company.length > 0) {
        table.idCompany = company[0].id
    }

    // SET ALL VALUE
    const handleAdd = (e) => {
        const { name, value } = e.target
        setTable({
            ...table,
            [name]: value,
        })
    }

    useEffect(() => {
        Company.getCompanyByUser(idUser, order, filter, search, idStatus, limit, page)
            .then((res) => {
                setCompany(res.data.content.data)
            })
            .catch((err) => {
                useHandleError(err, Navigate)
            })

    }, [idUser, idStatus])

    // ADD TABLE
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        if (
            table.idCompany === ""
            || (!toggleChecked && table.tableNumber === "")
            || (toggleChecked && (table.prefix === "" || table.numberOfTables === "" || table.baseNumber === ""))
        ) {
            setIsSubmitting(false)
            MySwal.fire({
                icon: 'error',
                title: 'Erreur',
                text: 'Les champs marqués par une étoile sont obligatoires !'
            })
        }
        else {
            const tableData = toggleChecked
                ? {
                    idCompany: table.idCompany,
                    prefix: table.prefix,
                    numberOfTables: table.numberOfTables,
                    baseNumber: table.baseNumber,
                    option: "auto"
                }
                : {
                    idCompany: table.idCompany,
                    tableNumber: table.tableNumber,
                    option: "manual"
                }

            Table.add(tableData)
                .then((res) => {
                    const successMessage = toggleChecked
                        ? `${table.numberOfTables} tables ajoutées avec succès !`
                        : "Table ajoutée avec succès !"

                    MySwal.fire({
                        icon: 'success',
                        title: 'Succès',
                        text: successMessage
                    }).then(() => {
                        Navigate('/managers/tables')
                    })
                })
                .catch((err) => {
                    useHandleError(err, Navigate)
                })
                .finally(() => {
                    setIsSubmitting(false)
                })
        }
    }

    const handleChange = () => {
        setToggleChecked(!toggleChecked)
    }

    return (
        <blockquote className="blockquote mb-0">
            <form onSubmit={handleSubmit} className="row g-2 form">

                {!toggleChecked && <div className="col-md-6">
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
                        onChange={handleAdd}
                        autoComplete='off'
                        required
                    />
                </div>}
                {toggleChecked && <>
                    <div className="col-md-6">
                        <label htmlFor="prefix" className="form-label">
                            Entrez un préfixe:
                            <span className="text-danger taille_etoile">*</span>
                        </label>
                        <input
                            type="text"
                            className="form-control no-focus-outline"
                            id="prefix"
                            name="prefix"
                            placeholder="Par exemple: T-"
                            value={table.prefix}
                            onChange={handleAdd}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="numberOfTables" className="form-label">
                            Nombre de table:
                            <span className="text-danger taille_etoile">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control no-focus-outline"
                            id="numberOfTables"
                            name="numberOfTables"
                            value={table.numberOfTables}
                            onChange={handleAdd}
                            autoComplete='off'
                            required
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="baseNumber" className="form-label">
                            Numéro de base:
                            <span className="text-danger taille_etoile">*</span>
                        </label>
                        <input
                            type="number"
                            className="form-control no-focus-outline"
                            id="baseNumber"
                            name="baseNumber"
                            value={table.baseNumber}
                            onChange={handleAdd}
                            autoComplete='off'
                            required
                        />
                    </div>
                </>}
                {access === 23 && (
                    <div className="col-md-6">
                        <label htmlFor="" className="form-label">
                            Nom du restaurant :
                            <span className="text-danger taille_etoile">*</span>
                        </label>
                        <CustomSelect data={company} placeholder="Selectionnez un restaurant" onSelectedValue={handleCompanyValue} />
                    </div>
                )}
                <div className="col-md-12 d-flex justify-content-between align-items-center">
                    <div className="d-flex gap-2 justify-content-between align-items-center">
                        <button type="submit" className="Btn Send btn-sm" disabled={isSubmitting}>
                            {isSubmitting ? <Spinners.TailSpin height="18" width="18" ariaLabel="tail-spin-loading" radius="5" color="#fff" /> : <RemixIcons.RiSendPlaneLine />}
                            {isSubmitting ? 'Ajout en cours' : 'Ajouter'}
                        </button>
                        <button type='button' className={`d-flex align-items-center gap-2 ms-3 Btn ${toggleChecked && 'Update'}`} onClick={handleChange}>Option avancée{toggleChecked ? <RemixIcons.RiArrowUpFill /> : <RemixIcons.RiArrowDownFill />}</button>
                    </div>
                    <button onClick={() => Navigate('/managers/tables')} className="Btn Error">
                        Annuler / Retour
                    </button>
                </div>
            </form>
        </blockquote>
    )
}

export default External