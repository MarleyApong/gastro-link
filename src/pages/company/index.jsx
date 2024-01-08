import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlinePhone, AiOutlineMail, AiOutlineFieldNumber } from 'react-icons/ai'
import dateFormat from 'dateformat'
import { Link, useNavigate } from "react-router-dom"
import { FaCity } from 'react-icons/fa'
import DataTable from 'react-data-table-component'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import toast from "react-hot-toast"
import logoPlaceholder from "../../assets/img/avatar/logo-placeholder.jpg"
import { Company } from "../../services/companyService"
import CustomDataTable from "../../components/CustomDataTable"

const ListCompany = () => {
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
            let res = await Company.getAll(order, filter, search, status)
            setdata(res.data.content.data)

            res = await Company.getCount()
            setAllCount(res.data.content)
         } catch (err) {
            console.log("Load: ", err)
         }
      }

      loadData()
   }, [order, filter, search, status, refresh])

   useEffect(() => {
      Company.getOne(id)
         .then((res) => setOneData(res.data.content))

   }, [id, refresh])

   const uploadPicture = () => {
      if (getImage) {
         const formData = new FormData()
         formData.append('picture', getImage)
         Company.changeProfil(id, formData)
            .then((res) => {
               toast.success("Logo importé avec succès !")
               setRefresh((current) => current + 1)
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
      Company.changeStatus(idRow)
         .then((res) => {
            if (res.data.message === 'company active') toast.success("Entreprise activée !")
            else toast.success("Entreprise désactivée !")
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
            // setOneData({ ...oneData, idStatus: oneData.idStatus })
         })
   }

   const detailsStatusChange = (id) => {
      Company.changeStatus(id)
         .then((res) => {
            if (res.data.message === 'company active') toast.success("Entreprise activée !")
            else toast.success("Entreprise désactivée !")
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
                  Detail de l'entreprise : {oneData.name}
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
                        <div className="secteurAc mb-2 fw-bold">Secteur: {oneData.category ? oneData.category : '---'}</div>
                        <div className="secteurAc mb-4 d-flex ">
                           <p className="fw-bold me-1">Description: </p>
                           {oneData.description ? oneData.description : '---'}
                        </div>
                        <div className="NumIden mb-3"><AiOutlineFieldNumber className="icon" size={18} />{oneData.id ? oneData.id : '---'}</div>
                        <div className="immatriculation mb-3"><RemixIcons.RiCalendar2Line className="icon" />{oneData.createdAt ? dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss') : '---'}</div>
                        <div className="email mb-3"><AiOutlineMail className="icon" />{oneData.email ? oneData.email : '---'}</div>
                        <div className="telephone mb-3"><AiOutlinePhone className="icon" /> {oneData.phone ? oneData.phone : '---'} </div>
                        <div className="ville mb-3"><FaCity className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                        <div className="site">
                           <RemixIcons.RiGlobalLine className="icon" />
                           <a href="https://www.allhcorp.com" target="_blank" rel="noopener noreferrer">
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
                  <Button onClick={() => Navigate(`/companies/update/${oneData.id}`)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier infos</Button>
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
         name: 'Telephone',
         selector: row => row.phone,
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
         name: 'Secteur',
         selector: row => row.category,
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
               <button className="Btn Update" title="Voir plus" onClick={() => patch(row.id)}>
                  <RemixIcons.RiEyeLine />
               </button>
               <button className="Btn Send" title="Modifier" onClick={() => Navigate(`/companies/update/${row.id}`)}>
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
               <label htmlFor="sort">Trier par: </label>
               <select className="input ml-2" id="sort"  name={order} onChange={(e) => setOrder(e.target.value)}>
                  <option value="asc">order croissant</option>
                  <option value="desc">ordre décroissant</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="filter">Filtrer par: </label>
               <select className="input ml-2" id="filter" name={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="name">nom</option>
                  <option value="phone">téléphone</option>
                  <option value="email">email</option>
                  <option value="city">ville</option>
                  <option value="neigborhood">quartier</option>
                  <option value="category">secteur</option>
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

         {/* <!-- Logout Modal--> */}
         <DetailCompanyModal
            show={showDetailCompanyModal}
            onHide={hideModal}
         />
      </div>
   )
}

export default ListCompany
