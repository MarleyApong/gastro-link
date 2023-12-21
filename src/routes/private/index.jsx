import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { Dashboard, Layout} from '../../pages'
// import { ListeNote, ListeClient, ListeEnquete } from '../pages/users'
Header
import Profil from '../../components/profil'
import Sidebar from '../../components/sidebar'
// import Erreur404 from '../_util/Erreur404'
import Header from '../../components/header'

const PrivateRoute = () => {
   const [profil, setProfil] = useState(false)
   const [sidebar, setSidebar] = useState(false)
   const access = {
      role: localStorage.getItem('lero'),
      env:  localStorage.getItem('env'),
      status:  localStorage.getItem('status'),
   }

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
                     {/* <Route path='/company' element={<ListeEntreprise />} />
                     <Route path='/company/list' element={<ListeEntreprise />} />
                     <Route path='/company/new' element={<AjouterEntreprise />} />
                     <Route path='/company/update' element={<ModifierEntreprise />} />
                     <Route path='/survey/list' element={<ListeEnquete />} />
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