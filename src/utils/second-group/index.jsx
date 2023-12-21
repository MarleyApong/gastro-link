import React from 'react'
import * as RemixIcons from "react-icons/ri"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { cuveExternal, cuveInternal } from '../../data/cuve'
import Pagination from '../../components/pagination'

export const SecondGroupInternal = () => {
   return (
      <>
         <div className="TBoxx">
            <h5>Entreprises enregistrées</h5>
            <ResponsiveContainer width="100%" height="90%" className="OK">
               <LineChart
                  width={500}
                  height={300}
                  data={cuveInternal}
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
               <h5>Meilleure note </h5>
               <div className="ReturnContent">
                  <h3>Resto Famine</h3>
                  <div className='Return'>
                     <h2>70</h2>
                  </div>
               </div>
            </div>
            <div className="Right">
               <h5>Dernière note </h5>
               <div className="ReturnContent">
                  <h3>Kage Auto</h3>
                  <div className='Return'>
                     <h2>20</h2>
                  </div>
               </div>
            </div>
         </div>
         <div className="TBoxx">
            <h5>Détails entreprises</h5>
            <div className="Details">
               <table>
                  <thead>
                     <tr>
                        <td>No.</td>
                        <td>Nom</td>
                        <td>Email</td>
                        <td>Téléphone</td>
                        <td>Immatriculation</td>
                        <td>Statut</td>
                     </tr>
                  </thead>
                  <tbody>
                     <tr>
                        <td>1</td>
                        <td>Resto famine</td>
                        <td>resto.famine@gmail.com</td>
                        <td>655 67 89 90</td>
                        <td>RJ45UKSWE34098</td>
                        <td><RemixIcons.RiCheckboxCircleLine size={16} /></td>
                     </tr>
                     <tr>
                        <td>2</td>
                        <td>Resto famine</td>
                        <td>resto.famine@gmail.com</td>
                        <td>655 67 89 90</td>
                        <td>RJ45UKSWE34098</td>
                        <td><RemixIcons.RiCheckboxCircleLine size={16} /></td>
                     </tr>
                     <tr>
                        <td>3</td>
                        <td>Resto famine</td>
                        <td>resto.famine@gmail.com</td>
                        <td>655 67 89 90</td>
                        <td>RJ45UKSWE34098</td>
                        <td><RemixIcons.RiCheckboxCircleLine size={16} /></td>
                     </tr>
                     <tr>
                        <td>4</td>
                        <td>Resto famine</td>
                        <td>resto.famine@gmail.com</td>
                        <td>655 67 89 90</td>
                        <td>RJ45UKSWE34098</td>
                        <td><RemixIcons.RiCheckboxCircleLine size={16} /></td>
                     </tr>
                     <tr>
                        <td>5</td>
                        <td>Resto famine</td>
                        <td>resto.famine@gmail.com</td>
                        <td>655 67 89 90</td>
                        <td>RJ45UKSWE34098</td>
                        <td><RemixIcons.RiCheckboxCircleLine size={16} /></td>
                     </tr>
                  </tbody>
               </table>
            </div>

            <Pagination
               pageable=''
            />
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
