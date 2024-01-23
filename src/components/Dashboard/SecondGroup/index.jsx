import React, { useState, useEffect } from 'react'
import * as RemixIcons from "react-icons/ri"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { cuveExternal, cuveInternal } from '../../../data/cuve'
import Pagination from '../../Pagination'
import { Company } from '../../../services/companyService'
import { Average } from '../../../services/average'
import { useNavigate } from 'react-router-dom'

export const SecondGroupInternal = ({ chart }) => {
   const Navigate = useNavigate()

   const [companies, setCompanies] = useState([])
   const [averageMinMax, setAverageMinMax] = useState({})
   const [surveys, setSurveys] = useState([])

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
               <span className='Btn Send' onClick={() => Navigate('/companies')}><RemixIcons.RiEyeLine size={15}/> Plus détails</span>
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
                                    <span className={company.idStatus === 1 ? 'Success p-1 rounded-3 text-white' : 'Error p-1 rounded-3 text-white'}>{company.idStatus === 1 ? 'actif' : 'inactif'}</span>
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
export const SecondGroupExternal = () => {
   return (
      <>
         <div className="TBoxx">
            <h5>Courbes des reponses de la semaine</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <LineChart
                  width={500}
                  height={300}
                  data={cuveExternal}
                  margin={{
                     top: 5,
                     right: 30,
                     left: 20,
                     bottom: 5,
                  }}
               >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="Courbe" stroke="#8884d8" activeDot={{ r: 8 }} />
               </LineChart>
            </ResponsiveContainer>
         </div>
         <div className="TBoxx">
            <div className="Left">
               <h5>Enquête avec plus de note </h5>
               <div className="ReturnContent">
                  <h3>Nourriture</h3>
                  <div className='Return'>
                     <h2>30</h2>
                  </div>
               </div>
            </div>
            <div className="Right">
               <h5>Enquête avec moins de note </h5>
               <div className="ReturnContent">
                  <h3>Service</h3>
                  <div className='Return'>
                     <h2>5</h2>
                  </div>
               </div>
            </div>
         </div>
         <div className="TBoxx">
            <h5>Liste des enquêtes</h5>
            <div className="Details">
               <table>
                  <thead>
                     <tr>
                        <td>No.</td>
                        <td>Nom</td>
                        <td>date</td>
                        <td>Question</td>
                        <td>Reponse</td>
                        <td>Statut</td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>Nourriture</td>
                        <td>2023-09-10</td>
                        <td>4</td>
                        <td>20</td>
                        <td>Encours</td>
                     </tr>
                     <tr>
                        <td>2</td>
                        <td>Service</td>
                        <td>2023-09-10</td>
                        <td>4</td>
                        <td>20</td>
                        <td>Encours</td>
                     </tr>
                     <tr>
                        <td>3</td>
                        <td>Boisson</td>
                        <td>2023-09-10</td>
                        <td>4</td>
                        <td>20</td>
                        <td>Encours</td>
                     </tr>
                     <tr>
                        <td>4</td>
                        <td>Animation</td>
                        <td>2023-09-10</td>
                        <td>4</td>
                        <td>20</td>
                        <td>Encours</td>
                     </tr>
                     <tr>
                        <td>5</td>
                        <td>Confort</td>
                        <td>2023-09-10</td>
                        <td>4</td>
                        <td>20</td>
                        <td>Encours</td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <Pagination
               pageable=""
            />
         </div>
      </>
   )
}
