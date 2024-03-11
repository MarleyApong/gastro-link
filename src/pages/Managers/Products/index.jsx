import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HeaderMain from '../../../components/HeaderMain'
import SelectOption from '../../../components/SelectOption'
import SearchInput from '../../../components/SearchInput'
import logoPlaceholder from "../../../assets/img/avatar/product.jpg"
import { StatusOption, sortOption } from "../../../data/optionFilter"
import CustomDataTable from "../../../components/CustomDataTable"
import { Product } from "../../../services/productService"
import dateFormat from "dateformat"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Access from "../../../utils/utilsAccess"
import useHandleError from "../../../hooks/useHandleError"
import ToggleButton from "../../../components/ToggleButton"
import config from "../../../config"

const Products = () => {
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

   // CHANGE STATUS WITH SIMPLE BUTTON
   const detailsStatusChange = (id) => {
      Product.changeStatus(id).then((res) => {
         if (res.data.message === 'product active') toast.success("Produit activé !")
         else toast.success("Produit désactivé !")
         setRefresh((current) => current + 1)
      }).catch((err) => {
         setRefresh((current) => current + 1)
         useHandleError(err, Navigate)
      })
   }

   // FETCH ALL DATA
   useEffect(() => {
      const loadData = async () => {
         try {
            if (access === 23 || access === 22) {
               const res = await Product.getProductsByUser(idUser, order, filter, status, search, limit, page)
               setData(res.data.content.data)
               setAllCount(res.data.content.totalElements)
               setTotalPages(res.data.content.totalPages)
            }
            else if (access === 12 || access === 13) {
               const res = await Product.getAll(order, filter, status, search, limit, page)
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
   }, [access, idUser, order, filter, status, search, refresh, limit, page])

   // FETCH ONE DATA
   useEffect(() => {
      Product.getOne(id).then((res) => {
         setOneData(res.data.content)
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }, [id, refresh])

   // CHANGE STATUS WITH TOGGLE BUTTON
   const handleToggle = (idRow) => {
      Product.changeStatus(idRow).then((res) => {
         if (res.data.message === 'product active') toast.success("Produit activé !")
         else toast.success("Produit désactivé !")
         setRefresh((current) => current + 1)
      }).catch((err) => {
         setRefresh((current) => current + 1)
         useHandleError(err, Navigate)
      })
   }


   // START LOGO PROCESSING PART =======================================================
   const uploadPicture = () => {
      if (getImage) {
         const formData = new FormData()
         formData.append('picture', getImage)
         Product.changePicture(id, formData)
            .then((res) => {
               toast.success("Image importée avec succès !")
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
         imageToShow = config.serverUrl + oneData.picture
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

   // DELETED PRODUCT
   const deleteProduct = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         Product.deleted(id)
            .then((res) => {
               toast.success("Produit supprimé avec succès !")
               setRefresh((current) => current + 1)
            })
            .catch((err) => {
               useHandleError(err, Navigate)
            })
      }
   }

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'price', label: 'prix' },
      { value: 'category', label: 'catérorie' },
      { value: 'createdAt', label: 'date de créat.' },
   ]

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
         name: 'Produit',
         selector: row => row.name,
         wrap: true,
      },
      {
         name: 'Prix',
         selector: row => row.price,
         wrap: true,
      },
      {
         name: 'Catégorie',
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
               <button className="Btn Update" title="Détails" onClick={() => patch(row.id)}>
                  <RemixIcons.RiEyeLine fontSize={15} />
               </button>
               <button className="Btn Send" title="Modifier" onClick={() => Navigate(`/managers/products/update/${row.id}`)}>
                  <RemixIcons.RiPenNibLine fontSize={15} />
               </button>
               {access === 13 && <button className="Btn Error" title="Supprimer" onClick={() => deleteProduct(row.id)}>
                  <RemixIcons.RiDeleteBin2Line fontSize={15} />
               </button>}
            </div>
         )
      },
   ]

   if (access === 13 || access === 23) {
      columns.splice(4, 0, {
         name: 'Entreprise',
         selector: row => row.id && row.Company.name,
         wrap: true,
      })
   }

   if (access === 13) {
      columns.splice(4, 0, {
         name: 'Organisation',
         selector: row => row.id && row.Company.Organization.name,
         wrap: true,
      })
   }

   if (access === 12 || access === 13 || access === 23 || access === 22) {
      columns.splice(5, 0, {
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

   return (
      <>
         <HeaderMain total={0} />

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
                  Detail du produit : {oneData.name}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               <div className="container">
                  <div className="row ">
                     <div onClick={() => imageRef.current.click()} title="cliquez pour choisir une autre image" className="col-md-6 d-flex shadow align-items-center justify-content-center overflow-hidden p-2">
                        <img className="object-fit-cover" crossorigin="anonymous" src={imageToShow} alt="" width="100%" height="400px" />
                        <input type="file" id="Profil" hidden ref={imageRef} accept=".jpg, .jpeg, .png" onChange={(e) => setGetImage(e.target.files[0])} />
                     </div>
                     {oneData.id && (
                        <div className="col-md-6 infoDetail ml-4 ">
                           <div className="fw-bold fs-2 shadow p-2 mb-4">{oneData.name.toUpperCase()}</div>
                           <div className="mb-3">
                              <p className="fw-bold me-1">Catégorie : {oneData.category ? oneData.category : '---'}</p>
                              <p>Prix : {oneData.price}</p>
                           </div>
                           <div className="mb-3">Ajouté le : {dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss')}</div>
                           <div className="mb-3">Modifié le : {dateFormat(oneData.updatedAt, 'dd-mm-yyyy HH:MM:ss')}</div>
                           <>
                              <h5 className="mb-3 mt-3 p-2 shadow">Affiliation</h5>
                              <div className="ps-4">
                                 <p className="mb-2"><span className="fw-bold">Organisation :</span> {oneData.Company.Organization.name || 'Aucune'}</p>
                                 <p className="mb-2"><span className="fw-bold">Entreprise :</span> {oneData.Company.name || 'Aucune'}</p>
                              </div>
                           </>
                        </div>
                     )}
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={buttonAction} className={buttonClass} title={buttonLabel}>
                     <RemixIcons.RiPictureInPictureLine />
                     {buttonLabel}
                  </Button>
                  <Button onClick={() => Navigate(`/managers/products/update/${oneData.id}`)} className="Btn Send  me-2" title="Modifier infos"><RemixIcons.RiPenNibLine />Modifier le prod.</Button>
                  {(access === 12 || access === 13 || access === 23 || access === 22) &&
                     <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.id && oneData.Status.name === 'actif' ? ' Btn Error me-2' : 'Btn Send me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.id && oneData.Status.name === 'actif' ? 'Désactiver ?' : 'Activer ?'}</Button>
                  }
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error" title="Fermer"><RemixIcons.RiCloseLine />Fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </>
   )
}

export default Products