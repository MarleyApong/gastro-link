import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlinePhone, AiOutlineMail, AiOutlineFieldNumber } from 'react-icons/ai'
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
import { Organizations } from "../../services/organizations"

const ListOrganization = () => {
   const Navigate = useNavigate()

   const [data, setdata] = useState([])
   const [oneData, setOneData] = useState([])
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [status, setStatus] = useState(1)
   const [search, setSearch] = useState('')
   const [id, setId] = useState('')
   const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)
   const [getImage, setGetImage] = useState('')

   const date = new Date()
   const nowDate = dateFormat(date, "yyyy-mm-dd")
   const imageRef = useRef(null)
   const imageTypes = ['image/png', 'image/jpg', 'image/jpeg']

   const patch = (itemId) => {
      setshowDetailCompanyModal(true)
      setId(itemId)
   }

   const hideModal = () => {
      setshowDetailCompanyModal(false)
      setGetImage('')
      setRefresh((current) => current + 1)
   }

   useEffect(() => {
      const loadData = async () => {
         try {
            let res = await Organizations.getAll(order, filter, status, search)
            setdata(res.data.content.data)

            res = await Organizations.getCount()
            setAllCount(res.data.content)

         } catch (err) {
            console.log("Load: ", err)
         }
      }

      loadData()
   }, [order, filter, search, status, refresh])

   useEffect(() => {
      Organizations.getOne(id)
         .then((res) => {
            // alert(setOneData(res.data.content))
            setOneData(res.data.content)
         })
   }, [id, refresh])

   const uploadPicture = () => {
      if (getImage) {
         const formData = new FormData()
         formData.append('picture', getImage)
         Organizations.changeProfil(id, formData)
            .then((res) => {
               toast.success("Logo importé avec succès !")
               setRefresh((current) => current + 1)
               // Navigate(`/companies/details/${id}`)
               setGetImage('')
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
                  else if (err.response.data.error.name === "LIMIT_UNEXPECTED_FILE") {
                     toast.error("Erreur, l'image doit être < 2 Mo !")
                  }
                  else {
                     toast.error("Erreur interne du serveur !")
                  }
               }
            })

      }
      else {
         toast.error("Selectionner une photo pour continuer !")
      }
   }

   const handleToggle = (idRow) => {
      Organizations.changeStatus(idRow)
         .then((res) => {
            if (res.data.message === 'organization active') toast.success("Organisation activée !")
            else toast.success("Organisation désactivée !")
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
      Organizations.changeStatus(id)
         .then((res) => {
            if (res.data.message === 'organization active') toast.success("Organisation activée !")
            else toast.success("Organisation désactivée !")
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
                  Detail de l'organization : {oneData.name}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               <div className="container">
                  <div className="row ">
                     <div onClick={() => imageRef.current.click()} title="cliquez pour choisir une autre image" className="col-md-6 d-flex shadow align-items-center justify-content-center overflow-hidden p-2">
                        {
                           getImage === '' && oneData.picture ?
                              <img className="object-fit-cover" crossorigin="anonymous" src={'http://localhost:8000' + oneData.picture} alt="" width="100%" height="400px" /> :
                              getImage === '' && oneData.picture === '' ?
                                 <img className="object-fit-cover" crossorigin="anonymous" src={logoPlaceholder} alt="" width="100%" height="400px" /> :
                                 getImage !== '' && imageTypes.includes(getImage.type) ?
                                    <img className="object-fit-cover" src={URL.createObjectURL(getImage)} alt="" width="100%" height="400px" /> :
                                    <img className="object-fit-cover" crossorigin="anonymous" src={logoPlaceholder} alt="" width="100%" height="400px" />
                        }
                        <input type="file" id="Profil" hidden ref={imageRef} accept=".jpg, .jpeg, .png" onChange={(e) => setGetImage(e.target.files[0])} />
                     </div>
                     <div className="col-md-6 infoDetail ml-4 ">
                        <div className="nomEntr fw-bold fs-2">{oneData.name ? oneData.name.toUpperCase() : '---'}</div>
                        <div className="secteurAc mb-4 ">
                           <p className="fw-bold me-1 text-center">Description </p>
                           {oneData.description ? oneData.description : '---'}
                        </div>
                        <div className="NumIden mb-3"><AiOutlineFieldNumber className="icon" size={18} />{oneData.id ? oneData.id : '---'}</div>
                        <div className="immatriculation mb-3"><RemixIcons.RiCalendar2Line className="icon" />{oneData.createdAt ? dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss') : '---'}</div>
                        <div className="telephone mb-3"><AiOutlinePhone className="icon" /> {oneData.phone ? oneData.phone : '---'} </div>
                        <div className="ville mb-3"><FaCity className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                        <div className="ville mb-3 d-flex align-items-center">
                           <RemixIcons.RiUserSharedLine className="icon" />
                           {oneData.idStatus === 1 ? 'actif' : 'inactif'}
                        </div>

                        <div className="site">
                           <RemixIcons.RiGlobalLine className="icon" />
                           <a href="https://www.allhcorp.com" className="text-danger" target="_blank" rel="noopener noreferrer">
                              www.allhcorp.com
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  {
                     getImage === '' && imageTypes.includes(getImage.type) ?
                        <Button onClick={() => imageRef.current.click()} className="Btn Send btn-sm me-2"><RemixIcons.RiPictureInPictureLine />Choisir logo</Button> :
                        getImage && imageTypes.includes(getImage.type) ?
                           <Button onClick={uploadPicture} className="Btn Update btn-sm me-2"><RemixIcons.RiPictureInPictureLine />Modifier logo</Button> :
                           <Button onClick={() => imageRef.current.click()} className="Btn Send btn-sm me-2"><RemixIcons.RiPictureInPictureLine />Choisir logo</Button>
                  }
                  <Button onClick={() => Navigate(`/organizations/update/${oneData.id}`)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier infos</Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.idStatus === 1 ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.idStatus === 1 ? 'Désactiver ?' : 'Activer ?'}</Button>
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
         name: 'Nom',
         selector: row => row.name,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Téléphone',
         selector: row => row.phone,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Ville',
         selector: row => row.city,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Quartier',
         selector: row => row.neighborhood,
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

export default ListOrganization
