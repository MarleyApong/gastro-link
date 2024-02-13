import React, { useState, useEffect } from 'react'
import * as RemixIcons from "react-icons/ri"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Company } from '../../../services/companyService'
import { Average } from '../../../services/average'
import { useNavigate } from 'react-router-dom'
import { Survey } from '../../../services/surveyService'
import dateFormat from 'dateformat'

export const SecondGroupInternal = ({ chart }) => {
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

   return (
      <>
         <div className="TBoxx">
            <h5>Entreprises enregistrées</h5>
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
                  <XAxis dataKey="0" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="1" stroke="#8884d8" activeDot={{ r: 8 }} />
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
   const limit = 5
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
                  <XAxis dataKey="0" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="1" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                  <h5 className='company'>Entreprise: {surveyAverage.maxSurvey && surveyAverage.maxSurvey.company}</h5>
               </div>
            </div>
            <div className="Right">
               <h5>Enquête avec moins de note </h5>
               <div className="ReturnContent">
                  <h3>Enquête: {surveyAverage.minSurvey && surveyAverage.minSurvey.name}</h3>
                  <div className='Return'>
                     <h2>{surveyAverage.minSurvey && surveyAverage.minSurvey.average}</h2>
                  </div>
                  <h5 className='company'>Entreprise: {surveyAverage.minSurvey && surveyAverage.minSurvey.company}</h5>
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
                        <td>Entreprise</td>
                        <td>date</td>
                        <td>Statut</td>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        survey.map((item, index) => (
                           <tr>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.Company.name}</td>
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

export const SecondGroupExternalServer = ({ idUser, chart }) => {
   const Navigate = useNavigate()
   const [survey, setSurvey] = useState([])
   const [surveyAverage, setSurveyAverage] = useState({})

   const order = 'desc'
   const filter = 'createdAt'
   const status = ''
   const search = ''
   const limit = 5
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

   return (
      <>
         <div className="TBoxx">
            <h5>Mes statistiques(commande traitée par jour)</h5>
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
                  <XAxis dataKey="0" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="1" stroke="#8884d8" activeDot={{ r: 8 }} />
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
                  <h5 className='company'>Entreprise: {surveyAverage.maxSurvey && surveyAverage.maxSurvey.company}</h5>
               </div>
            </div>
            <div className="Right">
               <h5>Enquête avec moins de note </h5>
               <div className="ReturnContent">
                  <h3>Enquête: {surveyAverage.minSurvey && surveyAverage.minSurvey.name}</h3>
                  <div className='Return'>
                     <h2>{surveyAverage.minSurvey && surveyAverage.minSurvey.average}</h2>
                  </div>
                  <h5 className='company'>Entreprise: {surveyAverage.minSurvey && surveyAverage.minSurvey.company}</h5>
               </div>
            </div>
         </div>
         <div className="TBoxx">
            <div className="TBoxx-head">
               <h5>Détails des commandes en cours</h5>
               <span className='Btn Send' onClick={() => Navigate('/surveys')}><RemixIcons.RiEyeLine size={15} /> Plus détails</span>
            </div>
            <div className="Details">
               <table>
                  <thead>
                     <tr>
                        <td>Commande N°</td>
                        <td>Table</td>
                        <td>Produit</td>
                        <td>date</td>
                        <td>Détails</td>
                     </tr>
                  </thead>
                  <tbody>
                     {
                        survey.map((item, index) => (
                           <tr>
                              <td>{index + 1}</td>
                              <td>{item.name}</td>
                              <td>{item.Company.name}</td>
                              <td>{dateFormat(new Date(item.createdAt), 'dd-mm-yyyy HH:MM:ss')}</td>
                              <td>
                                 <span className={item.Status.name === 'actif' ? 'Success p-1 rounded-3 text-white' : 'Error p-1 rounded-3 text-white'}><RemixIcons.RiEyeLine size={15}/></span>
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
