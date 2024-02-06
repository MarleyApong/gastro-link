import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import { AiOutlinePhone, AiOutlineMail } from 'react-icons/ai'
import dateFormat from 'dateformat'
import { useNavigate } from "react-router-dom"
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
import { sortOption, StatusOption } from "../../data/optionFilter"
import Access from "../../utils/utilsAccess"
import { Account } from "../../services/accountService"
import useHandleError from "../../hooks/useHandleError"

const ListCompany = () => {
   const Navigate = useNavigate()
   const access = Access()
   const statusOption = StatusOption()
   const idUser = localStorage.getItem('id')

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
            if (access === 23) {
               const res = await Company.getCompanyByUser(idUser, order, filter, search, status, limit, page)
               setData(res.data.content.data)
               setAllCount(res.data.content.totalElements)
               setTotalPages(res.data.content.totalPages)
            }
            else if (access === 12 || access === 13) {
               const res = await Company.getAll(order, filter, search, status, limit, page)
               setData(res.data.content.data)
               setAllCount(res.data.content.totalElements)
               setTotalPages(res.data.content.totalPages)
            }
         }
         catch (err) {
            useHandleError(err, Navigate)
         }
         finally {
            setLoading(false)
         }
      }

      loadData()
   }, [access, order, filter, search, status, refresh, limit, page])

   // FECTH ONE DATA
   useEffect(() => {
      Company.getOne(id).then((res) =>
         setOneData(res.data.content)
      )
      .catch((err) => {
         useHandleError(err, Navigate)
      })
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
            setRefresh((current) => current + 1)
            useHandleError(err, Navigate)
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
            setRefresh((current) => current + 1)
            useHandleError(err, Navigate)
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
            .catch((err) => {
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
         cell: (_, index) => index + 1,
         maxWidth: '50px'
      },
      {
         name: 'Nom',
         selector: row => row.name,
         wrap: true,
      },
      {
         name: 'Telephone',
         selector: row => row.phone,
         wrap: true,
      },
      {
         name: 'Email',
         selector: row => row.email,
         wrap: false,
      },
      {
         name: 'Secteur',
         selector: row => row.category,
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

   // ADD 'Status' COLUMNS IF USER HAVE ACCESS
   /*
      4 -> the position at which elements will be added or removed
      0 -> existing items to deleted
   */
   if (access === 11 || access === 12 || access === 13) {
      columns.splice(5, 0, {
         name: 'Status',
         cell: (row) => (
            <ToggleButton
               checked={row.Status && row.Status.name === 'actif' ? true : false}
               onChange={(id) => handleToggle(id)}
               id={row.id}
            />
         ),
         wrap: true,
      })
   }

   if (access === 11 || access === 12 || access === 13) {
      columns.splice(2, 0, {
         name: 'Organisation',
         selector: row => row.Organization.name,
         wrap: true,
      })
   }

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'phone', label: 'téléphone' },
      { value: 'email', label: 'email' },
      { value: 'city', label: 'ville' },
      { value: 'neighborhood', label: 'quartier' },
      { value: 'category', label: 'secteur' },
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
                        <div className="shadow p-2 mb-2">
                           <div className="nomEntr fw-bold fs-2">{oneData.name ? oneData.name.toUpperCase() : '---'}</div>
                           <div>Secteur: {oneData.category ? oneData.category : '---'}</div>
                        </div>
                        <div className="secteurAc mb-4 ">
                           <p className="fw-bold me-1 text-center">Description </p>
                           {oneData.description ? oneData.description : '---'}
                        </div>
                        <div className="immatriculation mb-3"><RemixIcons.RiCalendar2Line className="icon" />{oneData.createdAt ? dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss') : '---'}</div>
                        <div className="email mb-3"><AiOutlineMail className="icon" />{oneData.email ? oneData.email : '---'}</div>
                        <div className="telephone mb-3"><AiOutlinePhone className="icon" /> {oneData.phone ? oneData.phone : '---'} </div>
                        <div className="ville mb-3"><FaCity className="icon" /> {oneData.city ? oneData.city : '---'} , {oneData.neighborhood ? oneData.neighborhood : '---'}</div>
                        {/* <span className="site">
                           <RemixIcons.RiGlobalLine className="icon" />
                           <a href={`http://localhost:5173/page/${oneData.webpage}`} target="_blank" rel="noopener noreferrer">
                              page web
                           </a>
                        </span> */}
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={buttonAction} className={buttonClass} title={buttonLabel}>
                     <RemixIcons.RiPictureInPictureLine />
                  </Button>
                  <Button onClick={() => Navigate(`/companies/update/${oneData.id}`)} className="Btn Send  me-2" title="Modifier infos"><RemixIcons.RiPenNibLine /></Button>
                  {access === 12 || access === 13 &&
                     <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.Status && oneData.Status.name === 'actif' ? ' Btn Error  me-2' : 'Btn Send  me-2'} title={oneData.Status && oneData.Status.name === 'actif' ? 'Désactiver ?' : 'Activer ?'}><RemixIcons.RiExchangeBoxLine /></Button>
                  }
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error" title="Fermer"><RemixIcons.RiCloseLine /></Button>
               </div>
            </Modal.Footer>
         </Modal >
      </>
   )
}

export default ListCompany
