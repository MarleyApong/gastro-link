import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import toast from "react-hot-toast"
import dateFormat from 'dateformat'
import HeaderMain from "../../components/HeaderMain"
import ToggleButton from "../../components/ToggleButton"
import { Survey } from "../../services/surveyService"
import { Account } from "../../services/accountService"
import CustomDataTable from "../../components/CustomDataTable"
import { Question } from "../../services/questionService"
import SelectOption from "../../components/SelectOption"
import { sortOption, StatusOption } from "../../data/optionFilter"
import SearchInput from "../../components/SearchInput"
import Access from "../../guard/AccessGuard"
import { Average } from "../../services/average"
import useHandleError from "../../hooks/useHandleError"
import Swal from 'sweetalert2'

const ListSurvey = () => {
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
   const [idUpdateQuestion, setIdUpdateQuestion] = useState('')
   const [idSurveyUpdate, setIdSurveyUpdate] = useState('')
   const [questionUpdateCheck, setQuestionUpdateCheck] = useState('')
   const [surveyUpdateCheck, setSurveyUpdateCheck] = useState('')
   const [question, setQuestion] = useState('')
   const [questionUpdade, setQuestionUpdade] = useState('')
   const [surveyUpdade, setSurveyUpdade] = useState('')
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)
   const [averageSurvey, setAverageSurvey] = useState(0)
   const [averageQuestion, setAverageQuestion] = useState(0)
   const [averageCompany, setAverageCompany] = useState(0)
   const [stateQuestion, setStateQuestion] = useState(false)
   const [stateQuestionUpdade, setStateQuestionUpdade] = useState(false)
   const [stateSurvey, setStateSurvey] = useState(false)
   const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)

   // RECOVERING THE ID OF THE SELECTED LINE
   const patch = (itemId) => {
      setId(itemId)
      setshowDetailCompanyModal(true)
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
            setLoading(true)

            // RETRIEVE ALL SURVEYS
            const res = await Survey.getAll(order, filter, status, search, limit, page)
            const surveys = res.data.content.data
            setAllCount(res.data.content.totalElements)
            setTotalPages(res.data.content.totalPages)

            // RETRIEVE THE AVERAGE FOR EACH SURVEY
            const averages = await Promise.all(
               surveys.map((survey) =>
                  Average.averageSurvey(survey.id)
                     .then((res) => res.data.average)
                     .catch(() => 0)
               )
            )

            // ADD THE AVERAGE TO EACH SURVEY OBJECT
            const surveysWithAverage = surveys.map((survey, index) => ({
               ...survey,
               average: averages[index],
            }))

            // UPDATE THE STATE WITH THE ENRICHED DATA
            setData(surveysWithAverage)

            // RETRIEVE THE TOTAL NUMBER OF SURVEYS
            const totalSurveys = await Survey.getAll(order, filter, status, search, limit, page)
            setAllCount(totalSurveys.data.content.totalElements)

            // RETRIEVE DETAILED DATA FOR THE SELECTED SURVEY (id)
            const detailedSurvey = await Survey.getOne(id)
            const detailedSurveyData = detailedSurvey.data.content

            // CALCULATE THE AVERAGE FOR EACH QUESTION
            const questionsWithAverage = detailedSurveyData.Questions ? detailedSurveyData.Questions.map(async (question) => {
               const questionAverage = await Average.averageQuestion(question.id).catch(() => 0)
               return { ...question, average: questionAverage.data.average }
            }) : []

            // UPDATE 'onData' STATE WITH ENRICHED QUESTION DATA
            setOneData({
               ...detailedSurveyData,
               Questions: await Promise.all(questionsWithAverage),
            })
         }
         catch (err) {
            useHandleError(err, Navigate)
         } finally {
            setLoading(false)
         }
      }

      loadData()
   }, [id, refresh, order, filter, search, status, limit, page])

   // GET ONE DATA API
   useEffect(() => {
      const load = async () => {
         try {
            let res = await Survey.getOne(id)
            setOneData(res.data.content)
            const idCompany = res.data.content.Company ? res.data.content.Company.id : null

            if (res.data.content > 0) {
               res = await Average.averageQuestion()
               setAverageQuestion(res.data.average)
               res = await Average.averageSurvey(id)
               setAverageSurvey(res.data.average)

               res = await Average.averageCompany(idCompany)
               setAverageCompany(res.data.average)
            }
         }
         catch (err) {
            useHandleError(err, Navigate)
         }
      }

      load()
   }, [id])

   // CHANGE STATUS WITH TOGGLE BUTTON
   const handleToggle = (idRow, idCompany) => {
      Survey.changeStatus(idRow, idCompany).then((res) => {
         if (res.data.message === 'survey active') toast.success("Enquête activée !")
         else toast.success("Enquête désactivée !")
         setRefresh((current) => current + 1)
      }).catch((err) => {
         setRefresh((current) => current + 1)
         useHandleError(err, Navigate)
      })
   }

   // CHANGE STATUS WITH SIMPLE BUTTON
   const detailsStatusChange = (id, idCompany) => {
      Survey.changeStatus(id, idCompany).then((res) => {
         if (res.data.message === 'survey active') toast.success("Enquête activée !")
         else toast.success("Enquête désactivée !")
         setRefresh((current) => current + 1)
      }).catch((err) => {
         setRefresh((current) => current + 1)
         useHandleError(err, Navigate)
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
         Question.add(data).then((res) => {
            toast.success("Question ajoutée avec succès !")
            setQuestion('')
            setStateQuestion(false)
            setRefresh((current) => current + 1)
         }).catch((err) => {
            useHandleError(err, Navigate)
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
      Question.update(idUpdateQuestion, data).then((res) => {
         toast.success("La question a été bien modifiée !")
         setStateQuestionUpdade(false)
         setRefresh((current) => current + 1)
         setQuestionUpdade('')
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }

   // UPDATE SURVEY
   const handleUpdateSurvey = (e) => {
      e.preventDefault()
      const data = { name: surveyUpdade }
      if (surveyUpdade === "") {
         toast.error("L'enquête ne peut être vide !")
      }
      Survey.update(idSurveyUpdate, data).then((res) => {
         toast.success("L'enquête a été bien modifiée !")
         setStateSurvey(false)
         setRefresh((current) => current + 1)
         setSurveyUpdade('')
      }).catch((err) => {
         useHandleError(err, Navigate)
      })
   }

   // DELETE QUESTION
   const deleteQuestion = (id) => {
      Swal.fire({
         title: 'Êtes-vous sûr(e) ?',
         text: "Vous ne pourrez pas revenir en arrière !",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Oui, supprimer !'
      }).then((result) => {
         if (result.isConfirmed) {
            Question.deleted(id).then((res) => {
               toast.success("Question supprimée avec succès !")
               setRefresh((current) => current + 1)
            }).catch((err) => {
               useHandleError(err, Navigate)
            })
         }
      })
   }

   // DELETE SURVEY
   const deleteSurvey = (id) => {
      Swal.fire({
         title: 'Êtes-vous sûr(e) ?',
         text: "Vous ne pourrez pas revenir en arrière !",
         icon: 'warning',
         showCancelButton: true,
         confirmButtonColor: '#3085d6',
         cancelButtonColor: '#d33',
         confirmButtonText: 'Oui, supprimer !'
      }).then((result) => {
         if (result.isConfirmed) {
            Survey.deleted(id).then((res) => {
               toast.success("Enquête supprimée avec succès !");
               setRefresh((current) => current + 1);
            }).catch((err) => {
               useHandleError(err, Navigate)
            })
         }
      })
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
         name: 'Enquête',
         selector: row => row.name,
         wrap: true,
      },
      {
         name: 'Note',
         selector: row => row.average,
         wrap: true,
      },
      {
         name: 'Status',
         cell: (row) => (
            <ToggleButton
               checked={row.Status.name === 'actif' ? true : false}
               onChange={(id) => handleToggle(id, row.Company.id)}
               id={row.id}
            />
         ),
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

   // ADD 'Organisaion' COLUMNS IF USER HAVE ACCESS
   /*
      5 -> the position at which elements will be added or removed
      0 -> existing items to deleted
   */
   if (access === 11 || access === 12 || access === 13) {
      columns.splice(5, 0, {
         name: 'Organisation',
         selector: row => row.Company ? row.Company.Organization.name : '',
         wrap: true,
      })
   }

   // ADD 'Entreprise' COLUMNS IF USER HAVE ACCESS
   /*
      4 -> the position at which elements will be added or removed
      0 -> existing items to deleted
   */
   if (access === 11 || access === 12 || access === 13 || access === 23) {
      columns.splice(4, 0, {
         name: 'Entreprise',
         selector: row => row.Company ? row.Company.name : '',
         wrap: true,
      })
   }

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'createdAt', label: 'date de créat.' },
   ]

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
                     <div className="col-md-12 ml-4">
                        <div className="mb-2 fw-bold p-2 shadow d-lg-flex d-sm-block justify-content-between align-items-center">
                           <div className="d-flex align-items-center justify-content-between">
                              <span className="me-2 fs-6">Enquête: {oneData.name ? oneData.name : '---'}</span>
                              <span className={averageSurvey > 2.5 ? "Btn Success" : "Btn Error"}>{averageSurvey}</span>
                           </div>
                           <div className="d-flex align-items-center justify-content-between">
                              <span className="me-2 fs-6">Entreprise : {oneData.Company ? oneData.Company.name.toUpperCase() : '---'}</span>
                              <span className={averageCompany > 2.5 ? "Btn Success" : "Btn Error"}>{averageCompany}</span>
                           </div>
                        </div>
                        <div className="card-question shadow">
                           <form onSubmit={handleSubmit} className={stateQuestion ? "question transition-add-question p-2 shadow" : "question p-2 shadow"}>
                              <label htmlFor="question" className="fw-bold">Nom de la question: </label>
                              <textarea name="question" onChange={(e) => setQuestion(e.target.value)} value={question} placeholder="Entrez la question"></textarea>
                              <div className="d-flex justify-content-between">
                                 <Button onClick={() => setStateQuestion(true)} type="submit" className='Btn Success  me-2' title="Ajouter"><RemixIcons.RiAddLine /></Button>
                                 <Button onClick={() => setStateQuestion(false)} className="Btn Error " title="Retour"><RemixIcons.RiArrowRightLine /></Button>
                              </div>
                           </form>

                           <form onSubmit={handleUpdateSurvey} className={stateSurvey ? "survey transition-survey p-2 shadow" : "survey p-2 shadow"}>
                              <label htmlFor="survey-update" className="fw-bold">Nom de l'enquête: </label>
                              <textarea name="survey-update" onChange={(e) => setSurveyUpdade(e.target.value)} value={surveyUpdade} placeholder="Modifiez l'enquête"></textarea>
                              <div className="d-flex justify-content-between">
                                 <Button onClick={() => setStateSurvey(true)} type="submit" className='Btn Send  me-2' title="Modifier" disabled={surveyUpdateCheck === surveyUpdade}><RemixIcons.RiPenNibLine /></Button>
                                 <Button onClick={() => setStateSurvey(false)} className="Btn Error " title="Retour"><RemixIcons.RiArrowRightLine /></Button>
                              </div>
                           </form>
                           <div className="question-content-details">
                              <div className="mb-2 ps-2 fw-bold">Questions</div>
                              <form onSubmit={handleUpdateQuestion} className={stateQuestionUpdade ? "question-update transition-update-question" : "question-update"}>
                                 <textarea name="area-question" onChange={(e) => setQuestionUpdade(e.target.value)} value={questionUpdade} placeholder="Modifiez la question"></textarea>
                                 <div className="d-flex justify-content-between">
                                    <Button onClick={() => setStateQuestionUpdade(true)} type="submit" className='Btn Send  me-2' title="Ajouter" disabled={questionUpdateCheck === questionUpdade}><RemixIcons.RiPenNibLine /></Button>
                                    <Button onClick={() => setStateQuestionUpdade(false)} className="Btn Error" title="Retour"><RemixIcons.RiArrowRightLine /></Button>
                                 </div>
                              </form>
                              {oneData.id && oneData.Questions.length > 0 ? (
                                 <ol>
                                    {oneData.id &&
                                       oneData.Questions.map((item, index) => (
                                          <li key={index + 1} className="mb-2 d-flex align-items-center justify-content-between p-2 shadow list-question">
                                             <span onClick={() => questionUpdateModal(item.id, item.name)}>
                                                {index + 1}. {item.name}
                                             </span>
                                             <div className="d-flex align-items-center">
                                                <span className={item.average > 2.5 ? "Btn Success me-3" : "Btn Error me-3"}>{item.average}</span>

                                                <button className="Btn Update" onClick={() => Navigate(`/surveys/questions/${item.id}`)} title="détails" >
                                                   <RemixIcons.RiEyeLine />
                                                </button>
                                                <button className="Btn Error" onClick={() => deleteQuestion(item.id)} title="Supprimer" >
                                                   <RemixIcons.RiDeleteBin2Line />
                                                </button>
                                             </div>
                                          </li>
                                       ))
                                    }
                                 </ol>
                              ) : <span className="d-flex align-items-center justify-content-center">Aucune question disponible</span>}

                           </div>
                        </div>
                     </div>
                  </div>
               </div>
            </Modal.Body>
            <Modal.Footer className="footer-react-bootstrap d-flex justify-content-between">
               <div className="d-lg-flex d-sm-block">
                  <Button onClick={() => surveyUpdateModal(oneData.id, oneData.name)} className="Btn Send me-2" title="Modifier l'enquête">
                     <RemixIcons.RiPenNibLine />
                     Modifier l'enquête
                  </Button>
                  {access === 12 || access === 13 &&
                     <Button onClick={() => detailsStatusChange(oneData.id, oneData.idCompany)} className={oneData.id && oneData.Status.name === 'actif' ? ' Btn Error me-2' : 'Btn Send me-2'}>
                        <RemixIcons.RiExchangeBoxLine />
                        {oneData.id && oneData.Status.name === 'actif' ? 'Désactiver ?' : 'Activer ?'}
                     </Button>
                  }
                  <Button onClick={() => addQuestion(oneData.Questions.length)} className={oneData.id && oneData.Questions.length >= 5 ? 'Btn Error me-2' : 'Btn Success me-2'} title="Nouvelle question">
                     <RemixIcons.RiAddLine />
                     Nouvelle question
                  </Button>
               </div>
               <div>
                  <Button onClick={hideModal} className="Btn Error"><RemixIcons.RiCloseLine />Fermer</Button>
               </div>
            </Modal.Footer>
         </Modal >
      </>
   )
}

export default ListSurvey