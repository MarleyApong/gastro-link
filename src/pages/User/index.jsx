import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import { AiOutlineFieldNumber } from 'react-icons/ai'
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

const ListUser = () => {
   const Navigate = useNavigate()

   const [data, setdata] = useState([])
   const [oneData, setOneData] = useState([])
   const [roleData, setRoleData] = useState([])
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('firstName')
   const [status, setStatus] = useState('')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(20)
   const [page, setPage] = useState(0)
   const [env, setEnv] = useState('')
   const [role, setRole] = useState('')
   const [id, setId] = useState('')
   const [question, setQuestion] = useState('')
   const [questionUpdade, setQuestionUpdade] = useState('')
   const [surveyUpdade, setSurveyUpdade] = useState('')
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)
   const [stateQuestion, setStateQuestion] = useState(false)
   const [stateQuestionUpdade, setStateQuestionUpdade] = useState(false)
   const [stateSurvey, setStateSurvey] = useState(false)
   const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)

   const date = new Date()
   const nowDate = dateFormat(date, "yyyy-mm-dd")

   const patch = (itemId) => {
      setshowDetailCompanyModal(true)
      setId(itemId)
   }

   const hideModal = () => {
      setshowDetailCompanyModal(false)
      setRefresh((current) => current + 1)
   }

   const questionUpdateModal = (id, name) => {
      setStateQuestionUpdade(true)
      setIdUpdateQuestion(id)
      setQuestionUpdade(name)
      setQuestionUpdateCheck(name)
   }

   const surveyUpdateModal = (id, name) => {
      setStateSurvey(true)
      setStateQuestion(false)
      setIdSurveyUpdate(id)
      setSurveyUpdade(name)
      setSurveyUpdateCheck(name)
   }

   useEffect(() => {
      Role.getAll().then((res) => setRoleData(res.data.content))
   },[])

   useEffect(() => {
      const loadData = async () => {
         try {
            let res = await User.getAll(order, filter, status, role, env, search, limit, page)
            setdata(res.data.content.data)

            res = await User.getCount()
            setAllCount(res.data.content.totalElements)

         } catch (err) {
            console.log("Load: ", err)
         }
      }

      loadData()
   }, [order, filter, search, status, role, env, refresh])

   useEffect(() => {
      User.getOne(id)
         .then((res) => setOneData(res.data.content))
   }, [id, refresh])

   const handleToggle = (idRow) => {
      User.changeStatus(idRow)
         .then((res) => {
            if (res.data.message === 'Status modified') toast.success("Statut modifié !")
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

   const detailsStatusChange = (id) => {
      User.changeStatus(id)
         .then((res) => {
            if (res.data.message === 'User active') toast.success("Utilisateur activé !")
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

   // table
   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

   const columns = [
      {
         name: 'Nom',
         selector: row => row.firstName,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Prenom',
         selector: row => row.lastName,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Email',
         selector: row => row.email,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Env.',
         selector: row => row.idEnv === 1 ? "interne" : "externe",
         sortable: true,
         wrap: true,
      },
      {
         name: 'Role',
         selector: row => row.idRole === 1 ? "user" : row.idRole === 2 ? "admin" : "super admin",
         sortable: true,
         wrap: true,
      },
      {
         name: 'Status',
         cell: (row) => (
            <ToggleButton
               checked={row.idStatus === 1 ? true : false}
               onChange={(id) => handleToggle(id)}
               id={row.id}
            />
         ),
         sortable: true,
         wrap: true,
      },
      {
         name: 'Date créat.',
         selector: row => dateFormat(new Date(row.createdAt), 'dd-mm-yyyy HH:MM:ss'),
         sortable: true,
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
               <button className="Btn Error" title="Supprimer" onClick={() => deleteUser(row.id)}>
                  <RemixIcons.RiDeleteBin2Line fontSize={15} />
               </button>
            </div>
         )
      },
   ]

   return (
      <div>
         <HeaderMain total={allCount} />

         <div className="OptionFilter">
            <div className="AllOptionBox">
               <label htmlFor="">Trier par: </label>
               <select className="input ml-2" name={order} onChange={(e) => setOrder(e.target.value)}>
                  <option value="asc">ordre croissant</option>
                  <option value="desc">ordre décroissant</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="filter">Filtrer par: </label>
               <select className="input ml-2" id="filter" name={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="firstName">nom</option>
                  <option value="lastName">prénom</option>
                  <option value="email">email</option>
                  <option value="createdAt">date de créat.</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="status">Statut: </label>
               <select className="input ml-2" id="status" name={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="">tous</option>
                  <option value="1">actif</option>
                  <option value="2">inactif</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="env">Env. : </label>
               <select className="input ml-2" id="env" name={env} onChange={(e) => setEnv(e.target.value)}>
                  <option value="">tous</option>
                  <option value="1">interne</option>
                  <option value="2">externe</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="role">Role : </label>
               <select className="input ml-2" id="role" name={role} onChange={(e) => setRole(e.target.value)}>
                  <option value="">tous</option>
                  {roleData.map((item) => (
                     <option key={item.id} value={item.id}>{item.name}</option>
                  ))}
               </select>
            </div>

            <div className="AllOptionBox">
               <input
                  className="input search"
                  type={filter === 'createdAt' ? 'date' : 'text'}
                  placeholder="Tapez ici.."
                  aria-label="Search"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
               />
            </div>
         </div>

         <CustomDataTable
            columns={columns}
            data={data}
            ExpandedComponent={ExpandedComponent}
         />

         <Modal
            show={showDetailCompanyModal}
            onHide={hideModal}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-react-bootstrap"
         >
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
                              <p className="mb-2"><span className="fw-bold">Environnement :</span> {oneData.idEnv === 1 ? "interne" : "externe"}</p>
                              <p className="mb-2"><span className="fw-bold">Rôle :</span> {oneData.idRole === 1 ? "user" : oneData.idRole === 2 ? "admin" : "super admin"}</p>
                              <p className="mb-2"><span className="fw-bold">Statut :</span> {oneData.idStatut === 1 ? "actif" : "inactif"}</p>
                              <p className="mb-2"><span className="fw-bold">Date de création :</span> {oneData.id && dateFormat(new Date(oneData.createdAt), 'dd-mm-yyyy HH:MM:ss')}</p>
                              <p className="mb-2"><span className="fw-bold">Date de modif :</span> {oneData.id && dateFormat(new Date(oneData.updatedAt), 'dd-mm-yyyy HH:MM:ss')}</p>
                           </div>
                        </div>
                        <div className="">
                           <h5 className="mb-3 mt-3 p-2 shadow">Affiliation</h5>
                           <div className="ps-4">
                              <p className="mb-2"><span className="fw-bold">Organisation :</span> Aucun</p>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={() => surveyUpdateModal(oneData.id, oneData.name)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier</Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.idStatus === 1 ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.idStatus === 1 ? 'Désactiver ?' : 'Activer ?'}</Button>
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
