import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import dateFormat from 'dateformat'
import logoPlaceholder from "../../assets/img/avatar/user.jpg"
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import { Account } from "../../services/accountService"
import CustomDataTable from "../../components/CustomDataTable"
import { User } from "../../services/userService"
import { Role } from "../../services/roleService"
import SelectOption from "../../components/SelectOption"
import { EnvOption, sortOption, StatusOption, RoleOption } from "../../data/optionFilter"
import SearchInput from "../../components/SearchInput"
import Access from "../../utils/utilsAccess"

const ListUser = () => {
   const Navigate = useNavigate()
   const access = Access()
   const statusOption = StatusOption()
   const envOption = EnvOption()
   const roleOption = RoleOption()

   const [data, setdata] = useState([])
   const [oneData, setOneData] = useState([])
   const [affiliation, setAffiliation] = useState({})
   const [loading, setLoading] = useState(true)
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('firstName')
   const [status, setStatus] = useState('')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const [totalPages, setTotalPages] = useState(0)
   const [env, setEnv] = useState('')
   const [role, setRole] = useState('')
   const [id, setId] = useState('')
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)
   const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)

   // RECOVERING THE ID OF THE SELECTED LINE
   const patch = (itemId) => {
      setshowDetailCompanyModal(true)
      setId(itemId)
   }

   // CLOSE THE TEMPLATE MODAL
   const hideModal = () => {
      setshowDetailCompanyModal(false)
      setRefresh((current) => current + 1)
   }

   // GET ORDER VALUE
   const handleOrderChange = (e) => {
      setOrder(e.target.value)
   }

   // GET FILTER VALUE
   const handleFilterChange = (e) => {
      setFilter(e.target.value)
   }

   // GET STATUS VALUE
   const handleStatusChange = (e) => {
      setStatus(e.target.value)
   }

   // GET ENV VALUE
   const handleEnvChange = (e) => {
      setEnv(e.target.value)
   }

   // GET ROLE VALUE
   const handleRoleChange = (e) => {
      setRole(e.target.value)
   }

   // GET RESEARCH VALUE
   const handleSearchChange = (e) => {
      setSearch(e.target.value)
   }

   // GET ALL DATA API
   useEffect(() => {
      const loadData = async () => {
         try {
            if (access === 13) {
               setLoading(true)
               let res = await User.getAll(order, filter, status, role, env, search, limit, page)
               setdata(res.data.content.data)

               res = await User.getCount()
               setAllCount(res.data.content.totalElements)
            }
            else if (access === 23) {
               // GET ID OF STATUS
               const objetFounded = envOption.filter((item, _) => item.label === 'external').map((env, _) => env.value)
               if (objetFounded) {
                  setEnv(objetFounded.toString())
               }
               setLoading(true)
               let res = await User.getAll(order, filter, status, role, env, search, limit, page)
               setdata(res.data.content.data)
               setAllCount(res.data.content.totalElements)
            }

         } catch (err) {
            console.log("Load: ", err)
         } finally {
            setLoading(false)
         }
      }

      loadData()
   }, [access, order, filter, search, status, role, env, refresh])

   // GET ONE DATA API
   useEffect(() => {
      setAffiliation({})
      User.getOne(id)
         .then((res) => setOneData(res.data.content))

      User.getOrganizationCompany(id)
         .then((res) => setAffiliation(res.data))
   }, [id, refresh])

   // CHANGE STATUS WITH TOGGLE BUTTON
   const handleToggle = (idRow) => {
      User.changeStatus(idRow)
         .then((res) => {
            if (res.data.message === 'user active') toast.success("utilisateur activé !")
            else toast.success("utilisateur désactivé !")
            setRefresh((current) => current + 1)
         })
         .catch((err) => {
            console.error("Erreur lors de la mise à jour du statut :", err)
            setRefresh((current) => current + 1)
            if (err) {
               if (err.response.data.error.name === "MissingData") {
                  toast.error("Erreur, données incomplètes !")
               }
               else if (err.response.data.error.name === "MissingParams") {
                  toast.error("Erreur, Paramètres incomplètes !")
               }
               else if (err.response.data.error.name === "BadRequest") {
                  toast.error("Erreur, mauvaise requête !")
               }
               else {
                  toast.error("Erreur interne du serveur !")
               }
            }
            // setOneData({ ...oneData, idStatus: oneData.idStatus })
         })
   }

   // CHANGE STATUS WITH SIMPLE BUTTON
   const detailsStatusChange = (id) => {
      User.changeStatus(id)
         .then((res) => {
            if (res.data.message === 'user active') toast.success("Utilisateur activé !")
            else toast.success("Utilisateur désactivé !")
            setRefresh((current) => current + 1)
         })
         .catch((err) => {
            console.error("Erreur lors de la mise à jour du statut :", err)
            setRefresh((current) => current + 1)
            if (err) {
               if (err.response.data.error.name === "MissingData") {
                  toast.error("Erreur, données incomplètes !")
               }
               else if (err.response.data.error.name === "MissingParams") {
                  toast.error("Erreur, Paramètres incomplètes !")
               }
               else if (err.response.data.error.name === "BadRequest") {
                  toast.error("Erreur, mauvaise requête !")
               }
               else if (err.response.status === 400) {
                  toast.error("Erreur lors de la mise à jour du statut !")
               }
               else {
                  toast.error("Erreur interne du serveur !")
               }
            }
         })
   }

   // DELETED USER
   const deleteUser = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         User.deleted(id)
            .then((res) => {
               toast.success("Utilisateur supprimé avec succès !")
               setRefresh((current) => current + 1)
            })
            .catch((err) => console.log("error: ", err))
      }
   }

   // SYSTEM PAGINATION
   const handlePageChange = (newPage) => {
      setPage(newPage)
   }

   const handleLimitChange = (newLimit) => {
      setLimit(newLimit)
   }

   // FORMATTING JSON DATA TO MAKE IT MORE READABLE
   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

   // HEADING AND DISPLAY PRINCIPLE OF THE TABLE
   const columns = [
      {
         name: "#",
         cell: (row, index) => index + 1,
         maxWidth: '50px'
      },
      {
         name: 'Nom',
         selector: row => row.firstName,
         wrap: true,
      },
      {
         name: 'Prenom',
         selector: row => row.lastName,
         wrap: true,
      },
      {
         name: 'Email',
         selector: row => row.email,
         wrap: true,
      },
      {
         name: 'Role',
         selector: row => row.Role.name,
         wrap: true,
      },
      {
         name: 'Date créat.',
         selector: row => dateFormat(new Date(row.createdAt), 'dd-mm-yyyy HH:MM:ss'),
         wrap: true,
      },
      {
         name: 'Actions',
         cell: (row) => (
            <div className="d-flex ">
               <button className="Btn Update" title="Détails" onClick={() => patch(row.id)}>
                  <RemixIcons.RiEyeLine fontSize={15} />
               </button>
               <button className="Btn Send" title="Modifier" onClick={() => Navigate(`/users/update/${row.id}`)}>
                  <RemixIcons.RiPenNibLine fontSize={15} />
               </button>
               {access === 13 && row.idRole !== 3 && <button className="Btn Error" title="Supprimer" onClick={() => deleteUser(row.id)}>
                  <RemixIcons.RiDeleteBin2Line fontSize={15} />
               </button>}
            </div>
         )
      },
   ]

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'firstName', label: 'nom' },
      { value: 'lastName', label: 'prénom' },
      { value: 'email', label: 'email' },
      { value: 'createdAt', label: 'date de créat.' },
   ]

   // ADD 'Status' COLUMNS IF USER HAVE ACCESS
   /*
      4 -> the position at which elements will be added or removed
      0 -> existing items to deleted
   */
   if (access === 11 || access === 12 || access === 13) {
      columns.splice(4, 0, {
         name: 'Status',
         cell: (row) => (
            <ToggleButton
               checked={row.Status.name === 'actif' ? true : false}
               onChange={(id) => handleToggle(id)}
               id={row.id}
            />
         ),
         wrap: true,
      })
   }

   if (access === 13) {
      columns.splice(5, 0, {
         name: 'Env.',
         selector: row => row.Env && row.Env.name === 'internal' ? "interne" : "externe",
         wrap: true,
      })
   }

   return (
      <div>
         <HeaderMain total={allCount} />

         <div className="OptionFilter">
            <SelectOption
               label="Trier par"
               id="sort"
               name={order}
               value={order}
               onChange={handleOrderChange}
               options={sortOption}
            />

            <SelectOption
               label="Filtrer par"
               id="filter"
               name={filter}
               value={filter}
               onChange={handleFilterChange}
               options={filterOptions}
            />

            <SelectOption
               label="Statut"
               id="status"
               name={status}
               value={status}
               onChange={handleStatusChange}
               options={statusOption}
            />

            {access === 13 && (
               <SelectOption
                  label="Env."
                  id="env"
                  name={env}
                  value={env}
                  onChange={handleEnvChange}
                  options={envOption}
               />
            )}

            <SelectOption
               label="Rôle"
               id="role"
               name={role}
               value={role}
               onChange={handleRoleChange}
               options={roleOption}
            />

            <SearchInput
               filter={filter}
               placeholder="Tapez ici.."
               ariaLabel="Search"
               value={search}
               onChange={handleSearchChange}
            />
         </div>

         <CustomDataTable
            loading={loading}
            columns={columns}
            data={data}
            ExpandedComponent={ExpandedComponent}
            paginationPerPage={limit}
            paginationTotalRows={allCount}
            currentPage={page}
            totalPages={totalPages}
            onChangePage={handlePageChange}
            onChangeRowsPerPage={handleLimitChange}
         />

         <Modal
            show={showDetailCompanyModal}
            onHide={hideModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-react-bootstrap">
            <Modal.Header closeButton className="header-react-bootstrap">
               <Modal.Title id="contained-modal-title-vcenter" className="title-react-bootstrap">
                  Detail de l'utilisateur : {oneData.firstName + " " + oneData.lastName}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               <div className="container">
                  <div className="row ">
                     <div className="col-md-6 d-flex shadow align-items-center justify-content-center overflow-hidden p-2">
                        <img className="object-fit-cover" crossorigin="anonymous" src={logoPlaceholder} alt="" width="100%" height="400px" />
                     </div>

                     <div className="col-md-6 infoDetail ml-4">
                        <div>
                           <h5 className="mb-3 p-2 shadow">Infos</h5>
                           <div className="ps-4">
                              <p className="mb-2"><span className="fw-bold">Nom :</span> {oneData.firstName}</p>
                              <p className="mb-2"><span className="fw-bold">Prénom :</span> {oneData.lastName}</p>
                              <p className="mb-2"><span className="fw-bold">Email :</span> {oneData.email}</p>
                              <p className="mb-2"><span className="fw-bold">Téléphone :</span> {oneData.phone}</p>
                              <p className="mb-2"><span className="fw-bold">Environnement :</span> {oneData.Env && oneData.Env.name === 'internal' ? "interne" : "externe"}</p>
                              <p className="mb-2"><span className="fw-bold">Rôle :</span> {oneData.Role && oneData.Role.name}</p>
                              <p className="mb-2"><span className="fw-bold">Statut :</span> {oneData.Status && oneData.Status.name}</p>
                              <p className="mb-2"><span className="fw-bold">Date de création :</span> {oneData.id && dateFormat(new Date(oneData.createdAt), 'dd-mm-yyyy HH:MM:ss')}</p>
                              <p className="mb-2"><span className="fw-bold">Date de modif :</span> {oneData.id && dateFormat(new Date(oneData.updatedAt), 'dd-mm-yyyy HH:MM:ss')}</p>
                           </div>
                        </div>
                        <div className="">
                           <h5 className="mb-3 mt-3 p-2 shadow">Affiliation</h5>
                           <div className="ps-4">
                              <p className="mb-2"><span className="fw-bold">Organisation :</span> {affiliation.organization || 'Aucune'}</p>
                              <p className="mb-2"><span className="fw-bold">Entreprise :</span> {affiliation.company || 'Aucune'}</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={() => Navigate(`/users/update/${oneData.id}`)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier</Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.Status && oneData.Status.name === 'actif' ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.Status && oneData.Status.name === 'actif' ? 'Désactiver ?' : 'Activer ?'}</Button>
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error btn-sm"><RemixIcons.RiCloseLine />Fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </div>
   )
}

export default ListUser