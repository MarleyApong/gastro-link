import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlinePhone, AiOutlineFieldNumber } from 'react-icons/ai'
import dateFormat from 'dateformat'
import { useNavigate } from "react-router-dom"
import { FaCity } from 'react-icons/fa'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import logoPlaceholder from "../../assets/img/avatar/logo-placeholder.jpg"
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import { Organization } from "../../services/organizationService"
import CustomDataTable from "../../components/CustomDataTable"
import SelectOption from "../../components/SelectOption"
import { sortOption, statusOption } from "../../data/optionFilter"
import SearchInput from "../../components/SearchInput"
import Access from "../../utils/utilsAccess"

const ListOrganization = () => {
   const Navigate = useNavigate()
   const access = Access()

   const [data, setdata] = useState([])
   const [oneData, setOneData] = useState([])
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [status, setStatus] = useState('')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(0)
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
            let res = await Organization.getAll(order, filter, status, search)
            setdata(res.data.content.data)

            res = await Organization.getCount()
            setAllCount(res.data.content)

         } catch (err) {
            console.log("Load: ", err)
         }
      }

      loadData()
   }, [order, filter, search, status, refresh])

   // FETCH ONE DATA
   useEffect(() => {
      Organization.getOne(id)
         .then((res) => {
            setOneData(res.data.content)
         })
   }, [id, refresh])

   // START LOGO PROCESSING PART =======================================================
   const uploadPicture = () => {
      if (getImage) {
         const formData = new FormData()
         formData.append('picture', getImage)
         Organization.changeProfil(id, formData)
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

   // CHANGE STATUS WITH TOGGLE BUTTON
   const handleToggle = (idRow) => {
      Organization.changeStatus(idRow)
         .then((res) => {
            console.log(res.data);
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

   // CHANGE STATUS WITH SIMPLE BUTTON
   const detailsStatusChange = (id) => {
      Organization.changeStatus(id)
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

   // DELETED ORGANIZATION
   const deleteOrganization = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         Organization.deleted(id)
            .then((res) => {
               toast.success("Organization supprimée avec succès !")
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
               <button className="Btn Send" title="Modifier" onClick={() => Navigate(`/organizations/update/${row.id}`)}>
                  <RemixIcons.RiPenNibLine fontSize={15} />
               </button>
               {access === 13 && <button className="Btn Error" title="Supprimer" onClick={() => deleteOrganization(row.id)}>
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
      { value: 'city', label: 'ville' },
      { value: 'neigborhood', label: 'quartier' },
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
                  Detail de l'organization : {oneData.name}
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

                        <span className="site">
                           <RemixIcons.RiGlobalLine className="icon" />
                           <a href="https://www.allhcorp.com" className="text-danger" target="_blank" rel="noopener noreferrer">
                              www.allhcorp.com
                           </a>
                        </span>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={buttonAction} className={buttonClass}>
                     <RemixIcons.RiPictureInPictureLine />{buttonLabel}
                  </Button>
                  <Button onClick={() => Navigate(`/organizations/update/${oneData.id}`)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier infos</Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.idStatus === 1 ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.idStatus === 1 ? 'Désactiver ?' : 'Activer ?'}</Button>
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error btn-sm"><RemixIcons.RiCloseLine />fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </div>
   )
}

export default ListOrganization
