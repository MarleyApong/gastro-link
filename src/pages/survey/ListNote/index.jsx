import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import dateFormat from 'dateformat'
import logoPlaceholder from "../../../assets/img/avatar/logo-placeholder.jpg"
import HeaderMain from "../../../components/HeaderMain"
import ToggleButton from "../../../components/ToggleButton"
import { Survey } from "../../../services/surveyService"
import { Account } from "../../../services/accountService"
import CustomDataTable from "../../../components/CustomDataTable"
import { Question } from "../../../services/questionService"
import SelectOption from "../../../components/SelectOption"
import { sortOption, statusOption } from "../../../data/optionFilter"
import SearchInput from "../../../components/SearchInput"
import Access from "../../../utils/utilsAccess"

const ListNote = () => {
   const Navigate = useNavigate()
   const access = Access

   const [data, setdata] = useState([])
   const [oneData, setOneData] = useState([])
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [status, setStatus] = useState('')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(0)
   const [id, setId] = useState('')
   const [idUpdateQuestion, setIdUpdateQuestion] = useState('')
   const [idSurveyUpdate, setIdSurveyUpdate] = useState('')
   const [questionUpdateCheck, setQuestionUpdateCheck] = useState('')
   const [surveyUpdateCheck, setSurveyUpdateCheck] = useState('')
   const [question, setQuestion] = useState('')
   const [questionUpdade, setQuestionUpdade] = useState('')
   const [surveyUpdade, setSurveyUpdade] = useState('')
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)
   const [stateQuestion, setStateQuestion] = useState(false)
   const [stateQuestionUpdade, setStateQuestionUpdade] = useState(false)
   const [stateSurvey, setStateSurvey] = useState(false)
   const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)

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

   // GET STATUS VALUE
   const handleStatusChange = (e) => {
      setStatus(e.target.value)
   }

   // GET RESEARCH VALUE
   const handleSearchChange = (e) => {
      setSearch(e.target.value)
   }

   // SHOW MODAL FOR UPDATE QUESTION
   const questionUpdateModal = (id, name) => {
      setStateQuestionUpdade(true)
      setIdUpdateQuestion(id)
      setQuestionUpdade(name)
      setQuestionUpdateCheck(name)
   }

   // SHOW MODAL FOR UPDATE SURVEY
   const surveyUpdateModal = (id, name) => {
      setStateSurvey(true)
      setStateQuestion(false)
      setIdSurveyUpdate(id)
      setSurveyUpdade(name)
      setSurveyUpdateCheck(name)
   }

   // RULE FOR ADDING QUESTIONS 
   const addQuestion = (length) => {
      if (length >= 5) {
         toast.error("Limit des questions atteinte.")
         toast.error("Impossible d'ajouter !")
      }
      else {
         setStateQuestion(true)
         setStateSurvey(false)
         setStateQuestionUpdade(false)
      }
   }

   // GET ALL DATA API
   useEffect(() => {
      const loadData = async () => {
         try {
            let res = await Survey.getAll(order, filter, status, search, limit, page)
            setdata(res.data.content.data)

            res = await Survey.getAll()
            setAllCount(res.data.content.totalElements)
         } catch (err) {
            console.log("Load: ", err)
         }
      }

      loadData()
   }, [order, filter, search, status, refresh])

   // GET ONE DATA API
   useEffect(() => {
      Survey.getOne(id)
         .then((res) => setOneData(res.data.content))
   }, [id, refresh])

   // CHANGE STATUS WITH TOGGLE BUTTON
   const handleToggle = (idRow) => {
      Survey.changeStatus(idRow)
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

   // CHANGE STATUS WITH SIMPLE BUTTON
   const detailsStatusChange = (id) => {
      Survey.changeStatus(id)
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

   // ADD QUESTION
   const handleSubmit = (e) => {
      e.preventDefault()
      const data = {
         idSurvey: id,
         name: question
      }

      if (question === "") {
         toast.error("Entrez la question pour continuer !")
      }
      else {
         Question.add(data)
            .then((res) => {
               toast.success("Question ajoutée avec succès !")
               setQuestion('')
               setStateQuestion(false)
               setRefresh((current) => current + 1)
            })
            .catch((err) => {
               if (err.response.status === 400) {
                  toast.error("Champs mal renseigné ou format inattendu !", {
                     style: {
                        textAlign: 'center'
                     }
                  })
               }
               else if (err.response.status === 401) {
                  toast.error("La session a expiré !")
                  Account.logout()
                  Navigate("/auth/login")
               }
               else if (err.response.status === 403) {
                  toast.error("Accès interdit !")
               }
               else if (err.response.status === 404) {
                  toast.error("Ressource non trouvée !")
               }
               else if (err.response.status === 415) {
                  toast.error("Erreur, contactez l'administrateur !")
               }
               else if (err.response.status === 500) {
                  toast.error("Erreur interne du serveur !")
               }
               else {
                  toast.error("Erreur de données organization(e)s !")
                  Account.logout()
                  Navigate("/auth/login")
               }
            })
      }
   }

   // UPDATE QUESTION
   const handleUpdateQuestion = (e) => {
      e.preventDefault()
      const data = { name: questionUpdade }
      if (questionUpdade === "") {
         toast.error("La question ne peut être vide !")
      }
      Question.update(idUpdateQuestion, data)
         .then((res) => {
            toast.success("La question a été bien modifiée !")
            setStateQuestionUpdade(false)
            setRefresh((current) => current + 1)
            setQuestionUpdade('')
         })
         .catch((err) => console.log("error: ", err))
   }

   // UPDATE SURVEY
   const handleUpdateSurvey = (e) => {
      e.preventDefault()
      alert(idSurveyUpdate)
      const data = { name: surveyUpdade }
      if (surveyUpdade === "") {
         toast.error("L'enquête ne peut être vide !")
      }
      Survey.update(idSurveyUpdate, data)
         .then((res) => {
            toast.success("L'enquête a été bien modifiée !")
            setStateSurvey(false)
            setRefresh((current) => current + 1)
            setSurveyUpdade('')
         })
         .catch((err) => console.log("error: ", err))
   }

   // FORMATTING JSON DATA TO MAKE IT MORE READABLE
   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

   // HEADING AND DISPLAY PRINCIPLE OF THE TABLE
   const columns = [
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
         name: 'Enquête',
         selector: row => row.Company.Organization.name,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Note',
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
               <button className="Btn Update" title="Détails" onClick={() => patch(row.id)}>
                  <RemixIcons.RiEyeLine fontSize={15} />
               </button>
            </div>
         )
      },
   ]

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'createdAt', label: 'date de créat.' },
   ]
   return (
      <div>
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

                    
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap">
               <Button onClick={hideModal} className="Btn Error btn-sm"><RemixIcons.RiCloseLine />Fermer</Button>
            </Modal.Footer>
         </Modal >
      </div>
   )
}

export default ListNote