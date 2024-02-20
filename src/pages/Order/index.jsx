import React, { useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HeaderMain from '../../components/HeaderMain'
import SelectOption from '../../components/SelectOption'
import SearchInput from '../../components/SearchInput'
import { sortOption } from "../../data/optionFilter"
import CustomDataTable from "../../components/CustomDataTable"
import dateFormat from "dateformat"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Access from "../../utils/utilsAccess"
import useHandleError from "../../hooks/useHandleError"
import { Orders } from "../../services/orderService"
import { User } from "../../services/userService"
import EventOrder from "../../components/EventOrder"

const Order = () => {
   const Navigate = useNavigate()
   const access = Access()
   const idUser = localStorage.getItem('id')
   const eventOrder = EventOrder()

   const [data, setData] = useState([])
   const [currentIdOrder, setCurrentIdOrder] = useState(null)
   const [company, setCompany] = useState('')
   const [loading, setLoading] = useState(true)
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(1)
   const [totalPages, setTotalPages] = useState(0)
   const [id, setId] = useState('')
   const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)

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

   // GET RESEARCH VALUE
   const handleSearchChange = (e) => {
      setSearch(e.target.value)
   }

   // GET COMPANY BY USER
   useEffect(() => {
      const loadCompany = async () => {
         try {
            const res = await User.getOrganizationCompany(idUser)
            const idCompany = res.data.content.Company.id
            setCompany(idCompany)
         } catch (err) {
            // Handle error
         }
      }

      loadCompany()
   }, [idUser])

   // FETCH ALL DATA
   useEffect(() => {
      const loadData = async () => {
         try {
            if (access === 20) {
               const status = 'actif'
               let res = await Orders.getOrderByCompany(company, order, filter, search, status, limit, page)
               setData(res.data.content.data)
               setAllCount(res.data.content.totalElements)
               setTotalPages(res.data.content.totalPages)
            }
         } catch (err) {
            useHandleError(err, Navigate)
         } finally {
            setLoading(false)
         }
      }

      loadData()
   }, [access, idUser, order, filter, search, refresh, limit, page, eventOrder, company])

   // FETCH ONE DATA
   useEffect(() => {
      Orders.getOne(id)
         .then((res) => {
            // Handle data
         }).catch((err) => {
            useHandleError(err, Navigate)
         })
   }, [id, refresh])

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'commande n°' },
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
         name: 'Commande N°',
         selector: row => row.name,
         wrap: true,
      },
      {
         name: 'Table',
         selector: row => row.Table.tableNumber,
         wrap: true,
      },
      {
         name: 'Produit',
         selector: row => row.Orders_Products.length,
         wrap: true,
      },
      {
         name: 'Date',
         selector: row => dateFormat(new Date(row.createdAt), 'dd-mm-yyyy HH:MM:ss'),
         wrap: true,
      },
      {
         name: 'Actions',
         cell: (row) => (
            <div className="d-flex ">
               <button
                  onClick={() => handleTakeOrder(row.id)}
                  className="Btn Success"
                  title={currentIdOrder === row.id ? "Terminer la commande" : "Prendre la commande"}
                  disabled={currentIdOrder !== null && currentIdOrder !== row.id}
               >
                  {currentIdOrder === row.id ? <RemixIcons.RiCheckboxMultipleLine /> : <RemixIcons.RiEyeLine />}
                  {currentIdOrder === row.id ? "Terminer" : "Prendre"}
               </button>
            </div>
         )
      },
   ]

   // Take order function
   const handleTakeOrder = async (idOrder) => {
      try {
         if (currentIdOrder === idOrder) {
            // Finish order logic
            await Orders.finishOrder(idOrder)
            setCurrentIdOrder(null)
            localStorage.removeItem('currentIdOrder') // Supprimer l'identifiant de la commande du localStorage
            toast.success("Commande terminée avec succès !")
         } else {
            // Take order logic
            await Orders.updateUserIdInOrder(idOrder, idUser)
            setCurrentIdOrder(idOrder)
            localStorage.setItem('currentIdOrder', idOrder) // Stocker l'identifiant de la commande dans le localStorage
            toast.success("Commande prise en charge avec succès !")
         }
      } catch (err) {
         // Handle error
         toast.error("Une erreur s'est produite !")
      }
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
                  Detail de la commande : {/* Afficher le nom de la commande ici */}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               <div className="container">
                  {/* Afficher les détails de la commande ici */}
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <Button onClick={hideModal} className="Btn Error" title="Fermer"><RemixIcons.RiCloseLine /></Button>
            </Modal.Footer>
         </Modal >
      </>
   )
}

export default Order
