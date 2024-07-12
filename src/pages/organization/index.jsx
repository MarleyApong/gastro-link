import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlinePhone, AiOutlineFieldNumber } from 'react-icons/ai'
import { FaCity } from 'react-icons/fa'
import dateFormat from 'dateformat'
import { useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import logoPlaceholder from "../../assets/img/avatar/logo-placeholder.jpg"
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import { Organization } from "../../services/organizationService"
import CustomDataTable from "../../components/CustomDataTable"
import SelectOption from "../../components/SelectOption"
import SearchInput from "../../components/SearchInput"
import Access from "../../guard/AccessGuard"
import { sortOption, StatusOption } from "../../data/optionFilter"
import useHandleError from "../../hooks/useHandleError"

const ListOrganization = () => {
   const Navigate = useNavigate()
   const access = Access()
   const statusOption = StatusOption()

   const [data, setData] = useState([])
   const [oneData, setOneData] = useState([])
   const [loading, setLoading] = useState(true)
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [status, setStatus] = useState('')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const [totalPages, setTotalPages] = useState(0)
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
            const res = await Organization.getAll(order, filter, status, search, limit, page)
            setData(res.data.content.data)
            setAllCount(res.data.content.totalElements)
            setTotalPages(res.data.content.totalPages)
         }
         catch (err) {
            useHandleError(err, Navigate)
         }
         finally {
            setLoading(false)
         }
      }

      loadData()
   }, [order, filter, search, status, refresh, limit, page])

   // FETCH ONE DATA
   useEffect(() => {
      Organization.getOne(id).then((res) => {
         setOneData(res.data.content)
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }, [id, refresh])

   // START LOGO PROCESSING PART =======================================================
   const uploadPicture = () => {
      if (getImage) {
         const formData = new FormData()
         formData.append('picture', getImage)
         Organization.changeProfil(id, formData).then((res) => {
            toast.success("Logo importé avec succès !")
            setRefresh((current) => current + 1)
            setGetImage('')
         }).catch((err) => {
            setRefresh((current) => current + 1)
            useHandleError(err, Navigate)
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
         imageToShow =  oneData.picture
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
      Organization.changeStatus(idRow).then((res) => {
         if (res.data.message === 'organization active') toast.success("Organisation activée !")
         else toast.success("Organisation désactivée !")
         setRefresh((current) => current + 1)
      }).catch((err) => {
         setRefresh((current) => current + 1)
         useHandleError(err, Navigate)
      })
   }

   // CHANGE STATUS WITH SIMPLE BUTTON
   const detailsStatusChange = (id) => {
      Organization.changeStatus(id).then((res) => {
         if (res.data.message === 'organization active') toast.success("Organisation activée !")
         else toast.success("Organisation désactivée !")
         setRefresh((current) => current + 1)
      }).catch((err) => {
         setRefresh((current) => current + 1)
         useHandleError(err, Navigate)
      })
   }

   // DELETED ORGANIZATION
   const deleteOrganization = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         Organization.deleted(id).then((res) => {
            toast.success("Organization supprimée avec succès !")
            setRefresh((current) => current + 1)
         }).catch((err) => {
            useHandleError(err, Navigate)
         })
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
         selector: row => row.name,
         wrap: true,
      },
      {
         name: 'Téléphone',
         selector: row => row.phone,
         wrap: true,
      },
      {
         name: 'Ville',
         selector: row => row.city,
         wrap: true,
      },
      {
         name: 'Quartier',
         selector: row => row.neighborhood,
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

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'phone', label: 'téléphone' },
      { value: 'city', label: 'ville' },
      { value: 'neighborhood', label: 'quartier' },
      { value: 'createdAt', label: 'date de créat.' },
   ]

   return (
      <>
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
            size="xl"
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
                        <img className="object-fit-cover" src={imageToShow} alt="" width="100%" height="400px" />
                        <input type="file" id="Profil" hidden ref={imageRef} accept=".jpg, .jpeg, .png" onChange={(e) => setGetImage(e.target.files[0])} />
                     </div>
                     <div className="col-md-6 infoDetail ml-4 ">
                        <div className="nomEntr fw-bold fs-2 shadow p-2 mb-3 text-center">{oneData.name ? oneData.name.toUpperCase() : '---'}</div>
                        <div className="secteurAc mb-4 ">
                           <p className="fw-bold me-1 text-cnter">Description </p>
                           {oneData.description ? oneData.description : '---'}
                        </div>
                        {/* <div className="NumIden mb-3"><AiOutlineFieldNumber className="icon" size={18} />{oneData.id ? oneData.id : '---'}</div> */}
                        <div className="mb-3"><RemixIcons.RiCalendar2Line className="icon" />{oneData.createdAt ? dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss') : '---'}</div>
                        <div className="mb-3"><AiOutlinePhone className="icon" /> {oneData.phone ? oneData.phone : '---'} </div>
                        <div className="mb-3"><FaCity className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                        <div className="mb-3 d-flex align-items-center">
                           <RemixIcons.RiUserSharedLine className="icon" />
                           {oneData.Status && oneData.Status.name === 'actif' ? 'actif' : 'inactif'}
                        </div>

                        {/* <span className="site">
                           <RemixIcons.RiGlobalLine className="icon" />
                           <a href="https://www.allhcorp.com" className="text-danger" target="_blank" rel="noopener noreferrer">
                              www.allhcorp.com
                           </a>
                        </span> */}
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-lg-flex d-sm-block">
                  <Button onClick={buttonAction} className={buttonClass} title={buttonLabel}>
                     <RemixIcons.RiPictureInPictureLine />
                     {buttonLabel}
                  </Button>
                  <Button onClick={() => Navigate(`/organizations/update/${oneData.id}`)} className="Btn Send me-2" title="Modifier infos">
                     <RemixIcons.RiPenNibLine />
                     Modifier infos
                  </Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.Status && oneData.Status.name === 'actif' ? ' Btn Error  me-2' : 'Btn Send  me-2'} title={oneData.Status && oneData.Status.name === 'actif' ? 'Désactiver ?' : 'Activer ?'}>
                     <RemixIcons.RiExchangeBoxLine />
                     {oneData.Status && oneData.Status.name === 'actif' ? 'Désactiver ?' : 'Activer ?'}
                  </Button>
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error" title="Fermer"><RemixIcons.RiCloseLine />Fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </>
   )
}

export default ListOrganization
