import React, { useEffect, useState, useRef } from "react"
import * as RemixIcons from "react-icons/ri"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import HeaderMain from '../../components/HeaderMain'
import SelectOption from '../../components/SelectOption'
import SearchInput from '../../components/SearchInput'
import logoPlaceholder from "../../assets/img/avatar/customer survey.jpg"
import { sortOption } from "../../data/optionFilter"
import CustomDataTable from "../../components/CustomDataTable"
import dateFormat from "dateformat"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import Access from "../../guard/AccessGuard"
import { Customer } from "../../services/customerService"
import { Account } from "../../services/accountService"
import useHandleError from "../../hooks/useHandleError"

const ListCustomer = () => {
   const Navigate = useNavigate()
   const access = Access()
   const idUser = Account.getUserId()

   const [data, setData] = useState([])
   const [oneData, setOneData] = useState([])
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

   // FETCH ALL DATA
   useEffect(() => {
      const loadData = async () => {
         try {
            if (access === 23 || access === 22) {
               const res = await Customer.getCustomersByUser(idUser, order, filter, search, limit, page)
               setData(res.data.content.data)
               setAllCount(res.data.content.totalElements)
               setTotalPages(res.data.content.totalPages)
            }
            else if (access === 12 || access === 13) {
               const res = await Customer.getAll(order, filter, search, limit, page)
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
   }, [access, idUser, order, filter, search, refresh, limit, page])

   // FETCH ONE DATA
   useEffect(() => {
      Customer.getOne(id).then((res) => {
         setOneData(res.data.content)
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }, [id, refresh])

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'Nom' },
      { value: 'phone', label: 'Téléphone' },
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
         name: 'Nom',
         selector: row => row.name,
         wrap: true,
      },
      {
         name: 'Prénom',
         selector: row => row.phone,
         wrap: true,
      },
      {
         name: 'Enquête',
         selector: row => row.survey,
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
            </div>
         )
      },
   ]

   if (access === 13 || access === 23) {
      columns.splice(4, 0, {
         name: 'Restaurant',
         selector: row => row.id && row.company,
         wrap: true,
      })
   }

   if (access === 13) {
      columns.splice(5, 0, {
         name: 'Organisation',
         selector: row => row.id && row.organization,
         wrap: true,
      })
   }

   return (
      <>
         <HeaderMain total={allCount} />

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
                  Detail du client : {oneData.name}
               </Modal.Title>
            </Modal.Header>
            <Modal.Body className="body-react-bootstrap">
               {oneData.id && (
                  <div className="container">
                     <div className="row ">
                        <div className="col-md-6 d-flex align-items-center justify-content-center overflow-hidden p-2">
                           <img className="object-fit-cover" crossorigin="anonymous" src={logoPlaceholder} alt="" width="100%" height="400px" />
                        </div>
                        <div className="col-md-6 infoDetail ml-4 ">
                           <div className="fw-bold fs-2 shadow p-2 mb-4">{oneData.name.toUpperCase()}</div>
                           <div className="mb-3">Téléphone : {oneData.phone}</div>
                           <div className="mb-3">Enquête : {oneData.survey}</div>
                           <div className="mb-3">Ajouté le : {dateFormat(oneData.createdAt, 'dd-mm-yyyy HH:MM:ss')}</div>
                           <>
                              <h5 className="mb-3 mt-3 p-2 shadow">Affiliation</h5>
                              <div className="ps-4">
                                 <p className="mb-2"><span className="fw-bold">Organisation :</span> {oneData.organization || 'Aucune'}</p>
                                 <p className="mb-2"><span className="fw-bold">Restaurant :</span> {oneData.company || 'Aucune'}</p>
                              </div>
                           </>
                        </div>
                     </div>
                     <div className="row p-2">
                        <h5 className="mb-3 mt-3 p-3 shadow">Question - Reponses</h5>
                        {
                           oneData.questions.map((item, index) => (
                              <div className="mb-3 d-flex flex-column overflow-hidden p-2">
                                 <span className="mb-1 shadow p-2 border">Question {index + 1} : {item.name}</span>
                                 <span style={{ width: '60px' }} className={item.note > 2.5 ? "text-white p-1 Success" : "text-white p-1 Error"}>Note: {item.note}</span>
                                 <span className="p-1 border mt-1">Suggestion: {item.suggestion}</span>
                              </div>
                           ))
                        }
                     </div>
                  </div>
               )}
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap">
               <Button onClick={hideModal} className="Btn Error" title="Fermer"><RemixIcons.RiCloseLine />Fermer</Button>
            </Modal.Footer>
         </Modal >
      </>
   )
}

export default ListCustomer