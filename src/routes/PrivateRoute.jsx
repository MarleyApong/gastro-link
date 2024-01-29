import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Layout, ListCompany, ListOrganization, ListSurvey, CreateCompany, CreateOrganization, CreateSurvey, UpdateCompany, UpdateOrganization, ListCustomer, ListUser, CreateUser, UpdateUser, Settings, ListNote, Products, Tables } from '../pages'
import Profil from '../components/Profil'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
// import Erreur404 from '../_util/Erreur404'

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
                     <Route path='/companies/new' element={<CreateCompany />} />
                     <Route path='/companies/update/:id' element={<UpdateCompany />} />
                     <Route path='/organizations' element={<ListOrganization />} />
                     <Route path='/organizations/list' element={<ListOrganization />} />
                     <Route path='/organizations/new' element={<CreateOrganization />} />
                     <Route path='/organizations/update/:id' element={<UpdateOrganization />} />
                     <Route path='/surveys' element={<ListSurvey />} />
                     <Route path='/surveys/list' element={<ListSurvey />} />
                     <Route path='/surveys/new' element={<CreateSurvey />} />
                     <Route path='/surveys/questions/:id' element={<ListNote />} />
                     <Route path='/customers' element={<ListCustomer />} />
                     <Route path='/users/new' element={<CreateUser />} />
                     <Route path='/users' element={<ListUser />} />
                     <Route path='/users/list' element={<ListUser />} />
                     <Route path='/users/update/:id' element={<UpdateUser />} />
                     <Route path='/settings' element={<Settings />} />
                     <Route path='/managers/products' element={<Products />} />
                     <Route path='/managers/tables' element={<Tables />} />
                     {/*<Route path='*' element={<Erreur404 />} /> */}
                  </Route>
               </Routes>
            </div>
         </main>
      </div>
   )
}

export default PrivateRoute