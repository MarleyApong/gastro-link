import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlineFieldNumber } from 'react-icons/ai'
import dateFormat from 'dateformat'
import { useNavigate } from "react-router-dom"
import { FaCity } from 'react-icons/fa'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import logoPlaceholder from "../../assets/imgs/avatar/logo-placeholder.jpg"
import HeaderMain from "../../components/header-main"
import ToggleButton from "../../components/toggle-button"
import { Surveys } from "../../services/surveys"

const ListSurvey = () => {
   const Navigate = useNavigate()

   const [data, setdata] = useState([])
   const [oneData, setOneData] = useState([])
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [status, setStatus] = useState(1)
   const [search, setSearch] = useState('')
   const [id, setId] = useState('')
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)
   const [stateQuestion, setStateQuestion] = useState(false)
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

   useEffect(() => {
      const loadData = async () => {
         try {
            let res = await Surveys.getAll()
            setdata(res.data.content.data)

         } catch (err) {
            console.log("Load: ", err)
         }
      }

      loadData()
   }, [order, filter, search, status, refresh])

   useEffect(() => {
      Surveys.getOne(id)
         .then((res) => setOneData(res.data.content))
   }, [id, refresh])

   const handleToggle = (idRow) => {
      Surveys.changeStatus(idRow)
         .then((res) => {
            if (res.data.message === 'Survey active') toast.success("Enquête activée !")
            else toast.success("Enquête désactivée !")
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
      Surveys.changeStatus(id)
         .then((res) => {
            if (res.data.message === 'Survey active') toast.success("Enquête activée !")
            else toast.success("Enquête désactivée !")
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

   // modal
   const DetailCompanyModal = (props) => {
      return (
         <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            className="modal-react-bootstrap"
         >
            <Modal.Header closeButton className="header-react-bootstrap">
               <Modal.Title id="contained-modal-title-vcenter" className="title-react-bootstrap">
                  Detail de l'enquête : {oneData.name}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               <div className="container">
                  <div className="row ">
                     <div className="col-md-6 d-flex shadow align-items-center justify-content-center overflow-hidden p-2">
                        {
                           <img className="object-fit-cover" crossorigin="anonymous" src={oneData.Company ? 'http://localhost:8000' + oneData.Company.picture : logoPlaceholder} alt="" width="100%" height="400px" />
                        }
                     </div>

                     <div className="col-md-6 infoDetail ml-4 ">
                        <div className="fw-bold fs-5 mb-4">Entre. : {oneData.Company ? oneData.Company.name.toUpperCase() : '---'}</div>
                        <div className="mb-2 fw-bold p-2 shadow">Enquête: {oneData.name ? oneData.name : '---'}</div>
                        <div className="mb-3"><AiOutlineFieldNumber className="icon" size={18} />{oneData.id ? oneData.id : '---'}</div>
                        <div className="card-answers">
                           <div className={stateQuestion ? "add-answers-none answers p-2 shadow" : "add-answers answers p-2 shadow"}>
                              <label htmlFor="answers" className="fw-bold">Nom de l'enquête: </label>
                              <textarea name="answers" id="answers"></textarea>
                              <div className="d-flex justify-content-between">
                                 <Button onClick={() => setStateQuestion(true)} className='Btn Success btn-sm me-2'><RemixIcons.RiAddLine />Ajouter</Button>
                                 <Button onClick={() => setStateQuestion(false)} className="Btn Error btn-sm"><RemixIcons.RiCloseLine /></Button>
                              </div>
                           </div>
                           <div className="ps-3 answers">
                              <div className="mb-3"><RemixIcons.RiNumber1 className="icon" />{oneData.createdAt ? dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss') : '---'}</div>
                              <div className="mb-3"><RemixIcons.RiNumber2 className="icon" />{oneData.email ? oneData.email : '---'}</div>
                              <div className="mb-3"><RemixIcons.RiNumber3 className="icon" /> {oneData.phone ? oneData.phone : '---'} </div>
                              <div className="mb-3"><RemixIcons.RiNumber4 className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                              <div className="mb-3"><RemixIcons.RiNumber5 className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                              <div className="site">
                                 <RemixIcons.RiGlobalLine className="icon" />
                                 <a href="https://www.allhcorp.com" target="_blank" rel="noopener noreferrer">
                                    www.allhcorp.com
                                 </a>
                              </div>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={() => Navigate(`/surveys/update/${oneData.id}`)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier infos</Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.idStatus === 1 ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.idStatus === 1 ? 'Désactiver ?' : 'Activer ?'}</Button>
                  <Button onClick={() => setStateQuestion(true)} className='Btn Success btn-sm me-2'><RemixIcons.RiAddLine />Nouvelle quest.</Button>
               </div>
               <div>
                  <Button onClick={props.onHide} className="Btn Error btn-sm"><RemixIcons.RiCloseLine />fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      );
   }

   // table
   const customStyles = {
      headRow: {
         style: {
            backgroundColor: 'var(--z-color-2)',
            fontWeight: 'bold',
            color: "var(--color-1)",
         },
      },
      rows: {
         style: {
            height: '0px',
         },
      },
      headCells: {
         style: {
            paddingLeft: '25px',
         },
      },
      cells: {
         style: {
            paddingLeft: '25px',
         },
      },
   }

   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>;

   const columns = [
      // {
      //    name: '#',
      //    selector: row => row.id,
      //    sortable: true,
      //    wrap: true,
      // },
      {
         name: 'Enquête',
         selector: row => row.name,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Status',
         selector: row => <ToggleButton checked={row.idStatus === 1 ? true : false} onChange={() => handleToggle(row.id)} />,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Entreprise',
         selector: row => row.Company.name,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Organisation',
         selector: row => row.Company.Organization.name,
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
               <button className="btn btn-primary btn-sm voir" title="Détails" onClick={() => patch(row.id)}>
                  <RemixIcons.RiEyeLine fontSize={15} />
               </button>
               <button className="btn btn-warning btn-sm" title="Modifier" onClick={() => Navigate(`/organizations/update/${row.id}`)}>
                  <RemixIcons.RiPenNibLine fontSize={15} />
               </button>
            </div>
         )
      },

   ]

   return (
      <div>
         <HeaderMain total={allCount.totalElements} />

         <div className="OptionFilter">
            <div className="AllOptionBox">
               <label htmlFor="">Trier par: </label>
               <select className="input ml-2" name={order} onChange={(e) => setOrder(e.target.value)}>
                  <option value="asc">croisant</option>
                  <option value="desc">Ordre décroisant</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="">Filtrer par: </label>
               <select className="input ml-2" name={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="name">Nom</option>
                  <option value="city">Ville</option>
                  <option value="neigborhood">Quartier</option>
                  <option value="createdAt">date de créat.</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="">Statut: </label>
               <select className="input ml-2" name={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="1">Actif</option>
                  <option value="2">Inactif</option>
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

         <DataTable
            className="CustomerData"
            columns={columns}
            data={data}
            // selectableRows
            responsive
            pagination
            striped
            highlightOnHover
            customStyles={customStyles}
            expandableRowsComponent={ExpandedComponent}
         />
         {/* <!-- Logout Modal--> */}
         <DetailCompanyModal
            show={showDetailCompanyModal}
            onHide={hideModal}
         />
      </div>
   )
}

export default ListSurvey
