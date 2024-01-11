import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlinePhone, AiOutlineMail, AiOutlineFieldNumber } from 'react-icons/ai'
import dateFormat from 'dateformat'
import { Link, useNavigate } from "react-router-dom"
import { FaCity } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import toast from "react-hot-toast"
import logoPlaceholder from "../../assets/img/avatar/logo-placeholder.jpg"
import { Company } from "../../services/companyService"
import CustomDataTable from "../../components/CustomDataTable"
import SearchInput from "../../components/SearchInput"
import SelectOption from "../../components/SelectOption"
import { sortOption, statusOption } from "../../data/optionFilter"
import Access from "../../utils/utilsAccess"

const ListCompany = () => {
   const Navigate = useNavigate()
   const access = Access()

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

   // RECOVERING THE ID OF THE SELECTED LINE
   const patch = (itemId) => {
      setshowDetailCompanyModal(true)
      setId(itemId)
   }

   // CLOSE THE TEMPLATE MODAL
   const hideModal = () => {
      setshowDetailCompanyModal(false)
      setGetImage('')
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

   // GET RESEARCH VALUE
   const handleSearchChange = (e) => {
      setSearch(e.target.value)
   }

   // FETCH ALL DATA
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

   // FECTH ONE DATA
   useEffect(() => {
      Company.getOne(id)
         .then((res) => setOneData(res.data.content))

   }, [id, refresh])

   // START LOGO PROCESSING PART =======================================================
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
   const imageRef = useRef(null)
   const imageTypes = ['image/png', 'image/jpg', 'image/jpeg']
   const isImageEmpty = getImage === '' && imageTypes.includes(getImage.type)
   const hasValidImage = getImage && imageTypes.includes(getImage.type)

   let buttonLabel = 'Choisir logo'
   let buttonAction = () => imageRef.current.click()
   let buttonClass = 'Btn Send me-2'

   if (hasValidImage) {
      buttonLabel = 'Modifier logo'
      buttonClass = 'Btn Update me-2'
      buttonAction = uploadPicture
   }
   else if (isImageEmpty) {
      buttonAction = () => imageRef.current.click()
   }
   // END LOGO PROCESSING PART =======================================================

   // START PROCESSING IMAGE RENDERING =======================================================
   const getImageToShow = (getImage, oneData, imageTypes, logoPlaceholder) => {
      let imageToShow = logoPlaceholder

      if (getImage === '' && oneData.picture) {
         imageToShow = 'http://localhost:8000' + oneData.picture
      } else if (getImage === '' && oneData.picture === '') {
         imageToShow = logoPlaceholder
      } else if (getImage !== '' && imageTypes.includes(getImage.type)) {
         imageToShow = URL.createObjectURL(getImage)
      }

      return imageToShow
   }

   // SIMPLIFICATION OF THE FUNCTION FOR DISPLAY
   const imageToShow = getImageToShow(getImage, oneData, imageTypes, logoPlaceholder)
   // END PROCESSING IMAGE RENDERING =======================================================
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

   // DELETED ORGANIZATION
   const deleteCompany = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         Company.deleted(id)
            .then((res) => {
               toast.success("Entreprise supprimée avec succès !")
               setRefresh((current) => current + 1)
            })
            .catch((err) => console.log("error: ", err))
      }
   }

   // FORMATTING JSON DATA TO MAKE IT MORE READABLE
   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

   // HEADING AND DISPLAY PRINCIPLE OF THE TABLE
   const columns = [
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
               {access === 13 && <button className="Btn Error" title="Supprimer" onClick={() => deleteCompany(row.id)}>
                  <RemixIcons.RiDeleteBin2Line fontSize={15} />
               </button>}
            </div>
         )
      },

   ]

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'phone', label: 'téléphone' },
      { value: 'email', label: 'email' },
      { value: 'city', label: 'ville' },
      { value: 'neigborhood', label: 'quartier' },
      { value: 'category', label: 'secteur' },
      { value: 'createdAt', label: 'date de créat.' },
   ]

   return (
      <div>
         <HeaderMain total={allCount.totalElements} />

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

            <SearchInput
               filter={filter}
               placeholder="Tapez ici.."
               ariaLabel="Search"
               value={search}
               onChange={handleSearchChange}
            />
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
            className="modal-react-bootstrap">
            <Modal.Header closeButton className="header-react-bootstrap">
               <Modal.Title id="contained-modal-title-vcenter" className="title-react-bootstrap">
                  Detail de l'entreprise : {oneData.name}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               <div className="container">
                  <div className="row ">
                     <div onClick={() => imageRef.current.click()} title="cliquez pour choisir une autre image" className="col-md-6 d-flex shadow align-items-center justify-content-center overflow-hidden p-2">
                        <img className="object-fit-cover" crossorigin="anonymous" src={imageToShow} alt="" width="100%" height="400px" />
                        <input type="file" id="Profil" hidden ref={imageRef} accept=".jpg, .jpeg, .png" onChange={(e) => setGetImage(e.target.files[0])} />
                     </div>

                     <div className="col-md-6 infoDetail ml-4 ">
                        <div className="nomEntr fw-bold fs-2">{oneData.name ? oneData.name.toUpperCase() : '---'}</div>
                        <div className="secteurAc mb-2 fw-bold">Secteur: {oneData.category ? oneData.category : '---'}</div>
                        <div className="secteurAc mb-4 d-flex ">
                           <p className="fw-bold me-1">Description: </p>
                           {oneData.description ? oneData.description : '---'}
                        </div>
                        <div className="immatriculation mb-3"><RemixIcons.RiCalendar2Line className="icon" />{oneData.createdAt ? dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss') : '---'}</div>
                        <div className="email mb-3"><AiOutlineMail className="icon" />{oneData.email ? oneData.email : '---'}</div>
                        <div className="telephone mb-3"><AiOutlinePhone className="icon" /> {oneData.phone ? oneData.phone : '---'} </div>
                        <div className="ville mb-3"><FaCity className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                        <div className="site">
                           <RemixIcons.RiGlobalLine className="icon" />
                           <a href={`http://localhost:5173/page/${oneData.webpage}`} target="_blank" rel="noopener noreferrer">
                              page web
                           </a>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={buttonAction} className={buttonClass}>
                     <RemixIcons.RiPictureInPictureLine />{buttonLabel}
                  </Button>
                  <Button onClick={() => Navigate(`/companies/update/${oneData.id}`)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier infos</Button>
                  {access === 12 || access === 13 &&
                     <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.idStatus === 1 ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.idStatus === 1 ? 'Désactiver ?' : 'Activer ?'}</Button>
                  }
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error btn-sm"><RemixIcons.RiCloseLine />fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </div>
   )
}

export default ListCompany
