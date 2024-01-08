import React, { useEffect, useState, useRef } from "react"
import { useNavigate } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import { AiOutlineFieldNumber } from 'react-icons/ai'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import dateFormat from 'dateformat'
import logoPlaceholder from "../../assets/img/avatar/logo-placeholder.jpg"
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import { Survey } from "../../services/surveyService"
import { Account } from "../../services/accountService"
import CustomDataTable from "../../components/CustomDataTable"
import { Question } from "../../services/questionService"

const ListSurvey = () => {
   const Navigate = useNavigate()

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

   const date = new Date()
   const nowDate = dateFormat(date, "yyyy-mm-dd")

   const patch = (itemId) => {
      setshowDetailCompanyModal(true)
      setId(itemId)
   }

   const hideModal = () => {
      setshowDetailCompanyModal(false)
      setRefresh((current) => current + 1)
   }

   const questionUpdateModal = (id, name) => {
      setStateQuestionUpdade(true)
      setIdUpdateQuestion(id)
      setQuestionUpdade(name)
      setQuestionUpdateCheck(name)
   }

   const surveyUpdateModal = (id, name) => {
      setStateSurvey(true)
      setStateQuestion(false)
      setIdSurveyUpdate(id)
      setSurveyUpdade(name)
      setSurveyUpdateCheck(name)
   }

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

   useEffect(() => {
      Survey.getOne(id)
         .then((res) => setOneData(res.data.content))
   }, [id, refresh])

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

   const deleteQuestion = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         Question.deleted(id)
            .then((res) => {
               toast.success("Question supprimée avec succès !")
               setRefresh((current) => current + 1)
            })
            .catch((err) => console.log("error: ", err))
      }
   }

   const deleteSurvey = (id) => {
      const confirm = window.confirm("Voulez-vous vraiment effectuer cette action ?")
      if (confirm) {
         Survey.deleted(id)
            .then((res) => {
               toast.success("Enquête supprimée avec succès !")
               setRefresh((current) => current + 1)
            })
            .catch((err) => console.log("error: ", err))
      }
   }

   // table
   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

   const columns = [
      {
         name: 'Enquête',
         selector: row => row.name,
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
               {/* <button className="Btn Send" title="Modifier" onClick={() => Navigate(`/organizations/update/${row.id}`)}>
                  <RemixIcons.RiPenNibLine fontSize={15} />
               </button> */}
               <button className="Btn Error" title="Supprimer" onClick={() => deleteSurvey(row.id)}>
                  <RemixIcons.RiDeleteBin2Line fontSize={15} />
               </button>
            </div>
         )
      },
   ]

   return (
      <div>
         <HeaderMain total={allCount} />

         <div className="OptionFilter">
            <div className="AllOptionBox">
               <label htmlFor="">Trier par: </label>
               <select className="input ml-2" name={order} onChange={(e) => setOrder(e.target.value)}>
                  <option value="asc">ordre croissant</option>
                  <option value="desc">ordre décroissant</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="">Filtrer par: </label>
               <select className="input ml-2" name={filter} onChange={(e) => setFilter(e.target.value)}>
                  <option value="name">nom</option>
                  <option value="createdAt">date de créat.</option>
               </select>
            </div>

            <div className="AllOptionBox">
               <label htmlFor="">Statut: </label>
               <select className="input ml-2" name={status} onChange={(e) => setStatus(e.target.value)}>
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
                     <div className="col-md-6 d-flex shadow align-items-center justify-content-center overflow-hidden p-2">
                        {
                           <img className="object-fit-cover" crossorigin="anonymous" src={oneData.Company ? 'http://localhost:8000' + oneData.Company.picture : logoPlaceholder} alt="" width="100%" height="400px" />
                        }
                     </div>

                     <div className="col-md-6 infoDetail ml-4 ">
                        <div className="fw-bold fs-5 mb-4">Entre. : {oneData.Company ? oneData.Company.name.toUpperCase() : '---'}</div>
                        <div className="mb-2 fw-bold p-2 shadow">Enquête: {oneData.name ? oneData.name : '---'}</div>
                        <div className="card-question">
                           <form onSubmit={handleSubmit} className={stateQuestion ? "question transition-add-question p-2 shadow" : "question p-2 shadow"}>
                              <label htmlFor="question" className="fw-bold">Nom de la question: </label>
                              <textarea name="question" onChange={(e) => setQuestion(e.target.value)} value={question} placeholder="Entrez la question"></textarea>
                              <div className="d-flex justify-content-between">
                                 <Button onClick={() => setStateQuestion(true)} type="submit" className='Btn Success btn-sm me-2' title="Ajouter"><RemixIcons.RiAddLine /></Button>
                                 <Button onClick={() => setStateQuestion(false)} className="Btn Error btn-sm" title="Retour"><RemixIcons.RiArrowRightLine /></Button>
                              </div>
                           </form>

                           <form onSubmit={handleUpdateSurvey} className={stateSurvey ? "survey transition-survey p-2 shadow" : "survey p-2 shadow"}>
                              <label htmlFor="survey-update" className="fw-bold">Nom de l'enquête: </label>
                              <textarea name="survey-update" onChange={(e) => setSurveyUpdade(e.target.value)} value={surveyUpdade} placeholder="Modifiez l'enquête"></textarea>
                              <div className="d-flex justify-content-between">
                                 <Button onClick={() => setStateSurvey(true)} type="submit" className='Btn Send btn-sm me-2' title="Modifier" disabled={surveyUpdateCheck === surveyUpdade}><RemixIcons.RiPenNibLine /></Button>
                                 <Button onClick={() => setStateSurvey(false)} className="Btn Error btn-sm" title="Retour"><RemixIcons.RiArrowRightLine /></Button>
                              </div>
                           </form>
                           <div className="question-content-details">
                              <div className="mb-3"><AiOutlineFieldNumber className="icon" size={18} />{oneData.id ? oneData.id : '---'}</div>
                              <div className="mb-2 fw-bold p-2 shadow">Questions</div>
                              <form onSubmit={handleUpdateQuestion} className={stateQuestionUpdade ? "question-update transition-update-question" : "question-update"}>
                                 <textarea name="area-question" onChange={(e) => setQuestionUpdade(e.target.value)} value={questionUpdade} placeholder="Modifiez la question"></textarea>
                                 <div className="d-flex justify-content-between">
                                    <Button onClick={() => setStateQuestionUpdade(true)} type="submit" className='Btn Send btn-sm me-2' title="Ajouter" disabled={questionUpdateCheck === questionUpdade}><RemixIcons.RiPenNibLine /></Button>
                                    <Button onClick={() => setStateQuestionUpdade(false)} className="Btn Error btn-sm" title="Retour"><RemixIcons.RiArrowRightLine /></Button>
                                 </div>
                              </form>
                              <ol>
                                 {
                                    oneData.id && oneData.Questions.map((item, index) => {
                                       return <li key={index + 1} className="mb-3 d-flex align-items p-1 shadow list-question">
                                          <span onClick={() => questionUpdateModal(item.id, item.name)}>{index + 1}. {item.name.length >= 40 ? item.name.substring(0, 45) + '...' : item.name}</span>
                                          <RemixIcons.RiDeleteBinLine onClick={() => deleteQuestion(item.id)} title="Supprimer" />
                                       </li>
                                    })
                                 }
                              </ol>
                           </div>
                        </div>

                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-flex">
                  <Button onClick={() => surveyUpdateModal(oneData.id, oneData.name)} className="Btn Send btn-sm me-2"><RemixIcons.RiPenNibLine />Modifier l'enquête</Button>
                  <Button onClick={() => detailsStatusChange(oneData.id)} className={oneData.idStatus === 1 ? ' Btn Error btn-sm me-2' : 'Btn Send btn-sm me-2'}><RemixIcons.RiExchangeBoxLine />{oneData.idStatus === 1 ? 'Désactiver ?' : 'Activer ?'}</Button>
                  <Button onClick={() => addQuestion(oneData.Questions.length)} className={oneData.id && oneData.Questions.length >= 5 ? 'Btn Error btn-sm me-2' : 'Btn Success btn-sm me-2'}><RemixIcons.RiAddLine />Nouvelle quest.</Button>
                  <div className="site">
                     <RemixIcons.RiGlobalLine className="icon" />
                     <a href="https://www.allhcorp.com" target="_blank" rel="noopener noreferrer">
                        www.allhcorp.com
                     </a>
                  </div>
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error btn-sm"><RemixIcons.RiCloseLine />Fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </div>
   )
}

export default ListSurvey
