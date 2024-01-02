import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Layout, ListCompany, ListOrganization, ListSurvey, NewCompany, NewOrganization, NewSurvey, UpdateCompany, UpdateOrganization } from '../pages'
import Profil from '../components/profil'
import Sidebar from '../components/sidebar'
// import Erreur404 from '../_util/Erreur404'
import Header from '../components/header'
import Access from '../services/access'

const PrivateRoute = () => {
   const [profil, setProfil] = useState(false)
   const [sidebar, setSidebar] = useState(false)

   return (
      <div className="Pages">
         <Header
            sidebar={sidebar}
            setSidebar={setSidebar}
         />
         <main className='Main'>
            <Sidebar
               profil={profil}
               setProfil={setProfil}
               sidebar={sidebar}
            />
            <div className={sidebar ? "ContentMax" : "Content"}>
               <Profil
                  profil={profil}
                  setProfil={setProfil}
               />
               <Routes>
                  <Route element={<Layout />}>
                     <Route index element={<Dashboard />} />
                     <Route path='/dashboard' element={<Dashboard />} />
                     <Route path='/companies' element={<ListCompany />} />
                     <Route path='/companies/list' element={<ListCompany />} />
                     <Route path='/companies/new' element={<NewCompany />} />
                     <Route path='/companies/update/:id' element={<UpdateCompany />} />
                     <Route path='/organizations' element={<ListOrganization />} />
                     <Route path='/organizations/list' element={<ListOrganization />} />
                     <Route path='/organizations/new' element={<NewOrganization />} />
                     <Route path='/organizations/update/:id' element={<UpdateOrganization />} />
                     <Route path='/surveys' element={<ListSurvey />} />
                     <Route path='/surveys/list' element={<ListSurvey />} />
                     <Route path='/surveys/new' element={<NewSurvey />} />
                     {/*<Route path='/survey/list' element={<ListeEnquete />} />
                     <Route path='/survey' element={<ListeEnquete />} />
                     <Route path='survey/note' element={<ListeNote />} />
                     <Route path='/customer' element={<ListeClient />} />
                     <Route path='/settings' element={<Parametre />} />
                     <Route path='/dashboard' element={<ListeNote />} />
                     <Route path='*' element={<Erreur404 />} /> */}
                  </Route>
               </Routes>
            </div>
         </main>
      </div>
   )
}

export default PrivateRoute