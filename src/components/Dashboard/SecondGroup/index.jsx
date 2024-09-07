import React, { useState, useEffect } from 'react'
import * as RemixIcons from "react-icons/ri"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts'
import { Company } from '../../../services/companyService'
import { Average } from '../../../services/average'
import { useNavigate } from 'react-router-dom'
import { Survey } from '../../../services/surveyService'
import dateFormat from 'dateformat'
import CustomPieChart from '../FirstGroup/CustomPieChart'

export const SecondGroupInternal = ({ chart, detailsBusinessWeek, setDetailsBusinessWeek, statisticsCompanies }) => {
   const Navigate = useNavigate()

   const [companies, setCompanies] = useState([])
   const [averageMinMax, setAverageMinMax] = useState({})

   const order = 'desc'
   const filter = 'createdAt'
   const status = ''
   const search = ''
   const limit = 5
   const page = 0

   useEffect(() => {
      const loadData = async () => {
         try {
            let res = await Average.averageMinMax()
            setAverageMinMax(res.data)

            res = await Company.getAll(order, filter, status, search, limit, page)
            setCompanies(res.data.content.data)
         } catch (err) {
            console.log(err);
         }
      }

      loadData()
   }, [])

   const formatYAxisTicks = tick => Number.isInteger(tick) ? tick : ''
   const performanceCompany = [
      {
         "name": "Restaurant A",
         "averageRating": 4.2,
         "orderCount": 120,
         "bestTableRating": {
            "tableId": 1,
            "rating": 4.9
         },
         "topConsumingTable": {
            "tableId": 3,
            "productCount": 50
         },
         "mostConsumedProduct": {
            "productId": 101,
            "count": 75
         }
      },
      {
         "name": "Restaurant B",
         "averageRating": 3.8,
         "orderCount": 95,
         "bestTableRating": {
            "tableId": 2,
            "rating": 4.7
         },
         "topConsumingTable": {
            "tableId": 4,
            "productCount": 30
         },
         "mostConsumedProduct": {
            "productId": 102,
            "count": 50
         }
      },
      {
         "name": "Restaurant C",
         "averageRating": 4.5,
         "orderCount": 150,
         "bestTableRating": {
            "tableId": 5,
            "rating": 4.8
         },
         "topConsumingTable": {
            "tableId": 6,
            "productCount": 60
         },
         "mostConsumedProduct": {
            "productId": 103,
            "count": 100
         }
      }
   ]

   const performanceTrendChart = [
      {
         "date": "2023-01-01",
         "averageRating": 4.2,
         "orderCount": 120
      },
      {
         "date": "2023-02-01",
         "averageRating": 4.3,
         "orderCount": 130
      },
      {
         "date": "2023-03-01",
         "averageRating": 4.1,
         "orderCount": 110
      },
      {
         "date": "2023-04-01",
         "averageRating": 4.4,
         "orderCount": 140
      }
   ]

   const stackedBarChart = [
      {
         "question": "Question 1",
         "responseA": 50,
         "responseB": 30,
         "responseC": 20
      },
      {
         "question": "Question 2",
         "responseA": 40,
         "responseB": 35,
         "responseC": 25
      }
   ]

   const averageRatingHistogram = [
      {
         "companyName": "Restaurant A",
         "averageRating": 4.2
      },
      {
         "companyName": "Restaurant B",
         "averageRating": 3.9
      },
      {
         "companyName": "Restaurant C",
         "averageRating": 4.5
      }
   ]

   return (
      <>
         <div className="TBoxx">
            <div className="d-flex justify-content-between align-items-center">
               <h5>Entreprises enregistrées</h5>
               <input type="week" value={detailsBusinessWeek} onChange={(e) => setDetailsBusinessWeek(e.target.value)} />
            </div>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <LineChart
                  width={500}
                  height={300}
                  data={chart}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3" />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatYAxisTicks} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
         <div className="TBoxx">
            <div className="Left">
               <h5>Meilleure note </h5>
               <div className="ReturnContent">
                  {averageMinMax.maxCompany && (
                     <>
                        <h3>{averageMinMax.maxCompany.name}</h3>
                        <div className='Return'>
                           <h2>{averageMinMax.maxCompany.average}</h2>
                        </div>
                     </>
                  )}
               </div>
            </div>
            <div className="Right">
               <h5>Dernière note </h5>
               <div className="ReturnContent">
                  {averageMinMax.maxCompany && (
                     <>
                        <h3>{averageMinMax.minCompany.name}</h3>
                        <div className='Return'>
                           <h2>{averageMinMax.minCompany.average}</h2>
                        </div>
                     </>
                  )}
               </div>
            </div>
         </div>
         <div className="TBoxx">
            <h5>Performance des entreprises</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <BarChart data={statisticsCompanies} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Bar yAxisId="left" dataKey="averageQuestion" fill="#8884d8" name="Note moyenne par question" />
                  <Bar yAxisId="left" dataKey="averageSurvey" fill="#8dd1e1" name="Note moyenne par enquête" />
                  <Bar yAxisId="left" dataKey="tableWithMostOrders.orderCount" fill="#82ca9d" name="Nombre de commandes" />
                  <Bar yAxisId="left" dataKey="tableWithMostOrders.tableNumber" fill="#ffc658" name="Meilleure table" />
                  {/* <Bar yAxisId="right" dataKey="topConsumingTable.productCount" fill="#ff8042" name="Produits consommés par table" /> */}
               </BarChart>
            </ResponsiveContainer>
         </div>
         {/* <div className="TBoxx">
            <h5>Tendances des performances des entreprises</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <LineChart data={performanceTrendChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" orientation="left" stroke="#8884d8" />
                  <YAxis yAxisId="right" orientation="right" stroke="#82ca9d" />
                  <Tooltip />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="averageRating" stroke="#8884d8" name="Note moyenne" />
                  <Line yAxisId="right" type="monotone" dataKey="orderCount" stroke="#82ca9d" name="Nombre de commandes" />
               </LineChart>
            </ResponsiveContainer>
         </div> */}
         <div className="TBoxx">
            <h5>Évaluations Moyennes par Restaurant</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <BarChart data={statisticsCompanies} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="averageSurvey" fill="#8884d8" />
               </BarChart>
            </ResponsiveContainer>
         </div>
        {/* <div className="TBoxx">
            <h5>Répartition des Réponses par Question</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <BarChart data={stackedBarChart} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="question" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="responseA" stackId="a" fill="#8884d8" name="Réponse A" />
                  <Bar dataKey="responseB" stackId="a" fill="#82ca9d" name="Réponse B" />
                  <Bar dataKey="responseC" stackId="a" fill="#ffc658" name="Réponse C" />
               </BarChart>
            </ResponsiveContainer>
         </div>*/}

         <div className="TBoxx">
            <div className="TBoxx-head">
               <h5>Détails des 5 dernières entreprises</h5>
               <span className='Btn Send' onClick={() => Navigate('/companies')}><RemixIcons.RiEyeLine size={15} /> Plus détails</span>
            </div>
            <div className="Details">
               <table>
                  <thead>
                     <tr>
                        <td>No.</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Téléphone</td>
                        <td>Ville</td>
                        <td>Statut</td>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        companies.map((company, index) => {
                           return (
                              <tr key={index}>
                                 <td>{index + 1}</td>
                                 <td>{company.name}</td>
                                 <td>{company.email}</td>
                                 <td>{company.phone}</td>
                                 <td>{company.city}</td>
                                 <td>
                                    <span className={company.Status.name === 'actif' ? 'Success p-1 rounded-3 text-white' : 'Error p-1 rounded-3 text-white'}>{company.Status.name === 'actif' ? 'actif' : 'inactif'}</span>
                                 </td>
                              </tr>
                           )
                        })
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </>
   )
}

export const SecondGroupExternal = ({ idUser, chart }) => {
   const Navigate = useNavigate()
   const [survey, setSurvey] = useState([])
   const [surveyAverage, setSurveyAverage] = useState({})

   const order = 'desc'
   const filter = 'createdAt'
   const status = ''
   const search = ''
   const limit = 1
   const page = 0

   useEffect(() => {
      const loadSurvey = async () => {
         let res = await Survey.getSurveysByUser(idUser, order, filter, status, search, limit, page)
         setSurvey(res.data.content)

         res = await Average.averageMinMaxSurvey(idUser)
         setSurveyAverage(res.data)
      }

      loadSurvey()
   }, [idUser, order, filter, status, search, limit, page])

   const formatYAxisTicks = tick => Number.isInteger(tick) ? tick : ''

   return (
      <>
         <div className="TBoxx">
            <h5>Courbes des reponses de la semaine</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <LineChart
                  width={500}
                  height={300}
                  data={chart}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3" />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatYAxisTicks} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
         <div className="TBoxx">
            <div className="Left">
               <h5>Enquête avec plus de note </h5>
               <div className="ReturnContent">
                  <h3>Enquête: {surveyAverage.maxSurvey && surveyAverage.maxSurvey.name}</h3>
                  <div className='Return'>
                     <h2>{surveyAverage.maxSurvey && surveyAverage.maxSurvey.average}</h2>
                  </div>
                  <h5 className='company'>Restaurant: {surveyAverage.maxSurvey && surveyAverage.maxSurvey.company}</h5>
               </div>
            </div>
            <div className="Right">
               <h5>Enquête avec moins de note </h5>
               <div className="ReturnContent">
                  <h3>Enquête: {surveyAverage.minSurvey && surveyAverage.minSurvey.name}</h3>
                  <div className='Return'>
                     <h2>{surveyAverage.minSurvey && surveyAverage.minSurvey.average}</h2>
                  </div>
                  <h5 className='company'>Restaurant: {surveyAverage.minSurvey && surveyAverage.minSurvey.company}</h5>
               </div>
            </div>
         </div>
         <div className="TBoxx">
            <div className="TBoxx-head">
               <h5>Détails des 5 dernières enquêtes</h5>
               <span className='Btn Send' onClick={() => Navigate('/surveys')}><RemixIcons.RiEyeLine size={15} /> Plus détails</span>
            </div>
            <div className="Details">
               <table>
                  <thead>
                     <tr>
                        <td>No.</td>
                        <td>Nom</td>
                        <td>Restaurant</td>
                        <td>date</td>
                        <td>Statut</td>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        survey.map((item, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.Company ? item.Company.name : ''}</td>
                              <td>{dateFormat(new Date(item.createdAt), 'dd-mm-yyyy HH:MM:ss')}</td>
                              <td>
                                 <span className={item.Status.name === 'actif' ? 'Success p-1 rounded-3 text-white' : 'Error p-1 rounded-3 text-white'}>{item.Status.name === 'actif' ? 'actif' : 'inactif'}</span>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </>
   )
}

export const SecondGroupExternalServer = ({ idServer, chart }) => {
   const Navigate = useNavigate()
   const [survey, setSurvey] = useState([])
   const [surveyAverage, setSurveyAverage] = useState({})

   const order = 'desc'
   const filter = 'createdAt'
   const status = ''
   const search = ''
   const limit = 1
   const page = 0

   useEffect(() => {
      const loadSurvey = async () => {
         let res = await Survey.getSurveysByServer(idServer, order, filter, status, search, limit, page)
         setSurvey(res.data.content)

         res = await Average.averageMinMaxSurveyServer(idServer)
         setSurveyAverage(res.data)
      }

      loadSurvey()
   }, [idServer, order, filter, status, search, limit, page])

   const formatYAxisTicks = tick => Number.isInteger(tick) ? tick : ''

   return (
      <>
         <div className="TBoxx">
            <h5>Courbes des reponses de la semaine</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <LineChart
                  width={500}
                  height={300}
                  data={chart}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}>
                  <CartesianGrid strokeDasharray="3" />
                  <XAxis dataKey="day" />
                  <YAxis tickFormatter={formatYAxisTicks} />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="total" stroke="#8884d8" activeDot={{ r: 8 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
         <div className="TBoxx">
            <div className="Left">
               <h5>Enquête avec plus de note </h5>
               <div className="ReturnContent">
                  <h3>Enquête: {surveyAverage.maxSurvey && surveyAverage.maxSurvey.name}</h3>
                  <div className='Return'>
                     <h2>{surveyAverage.maxSurvey && surveyAverage.maxSurvey.average}</h2>
                  </div>
                  <h5 className='company'>Restaurant: {surveyAverage.maxSurvey && surveyAverage.maxSurvey.company}</h5>
               </div>
            </div>
            <div className="Right">
               <h5>Enquête avec moins de note </h5>
               <div className="ReturnContent">
                  <h3>Enquête: {surveyAverage.minSurvey && surveyAverage.minSurvey.name}</h3>
                  <div className='Return'>
                     <h2>{surveyAverage.minSurvey && surveyAverage.minSurvey.average}</h2>
                  </div>
                  <h5 className='company'>Restaurant: {surveyAverage.minSurvey && surveyAverage.minSurvey.company}</h5>
               </div>
            </div>
         </div>
         <div className="TBoxx">
            <div className="TBoxx-head">
               <h5>Détails des 5 dernières enquêtes</h5>
               <span className='Btn Send' onClick={() => Navigate('/surveys')}><RemixIcons.RiEyeLine size={15} /> Plus détails</span>
            </div>
            <div className="Details">
               <table>
                  <thead>
                     <tr>
                        <td>No.</td>
                        <td>Nom</td>
                        <td>Restaurant</td>
                        <td>date</td>
                        <td>Statut</td>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        survey.map((item, index) => (
                           <tr key={index}>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.Company ? item.Company.name : ''}</td>
                              <td>{dateFormat(new Date(item.createdAt), 'dd-mm-yyyy HH:MM:ss')}</td>
                              <td>
                                 <span className={item.Status.name === 'actif' ? 'Success p-1 rounded-3 text-white' : 'Error p-1 rounded-3 text-white'}>{item.Status.name === 'actif' ? 'actif' : 'inactif'}</span>
                              </td>
                           </tr>
                        ))
                     }
                  </tbody>
               </table>
            </div>
         </div>
      </>
   )
}
