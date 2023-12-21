import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AjouterEntreprise, Layout, ListeEntreprise, ModifierEntreprise, Parametre, TableauDeBord } from '../pages/admin'
import { ListeNote, ListeClient, ListeEnquete } from '../pages/users'
import HeaderAdmin from '../components/header/HeaderAdmin'
import ProfilAdmin from '../components/profil/ProfilAdmin'
import SidebarAdmin from '../components/sidebar/SidebarAdmin'
import Erreur404 from '../_util/Erreur404'

const Private = () => {
    const [profil, setProfil] = useState(false)
    const [sidebarAdmin, setSidebarAdmin] = useState(false)

    return (
        <div className="Pages">
            <HeaderAdmin
                sidebarAdmin={sidebarAdmin}
                setSidebarAdmin={setSidebarAdmin}
            />
            <main className='Main'>
                <SidebarAdmin
                    profil={profil}
                    setProfil={setProfil}
                    sidebarAdmin={sidebarAdmin}
                />
                <div className={sidebarAdmin ? "ContentMax" : "Content"}>
                    <ProfilAdmin
                        profil={profil}
                        setProfil={setProfil}
                    />
                    <Routes>
                        <Route element={<Layout />}>
                            <Route index element={<TableauDeBord />} />
                            <Route path='/dashboard' element={<TableauDeBord />} />
                            <Route path='/company' element={<ListeEntreprise />} />
                            <Route path='/company/list' element={<ListeEntreprise />} />
                            <Route path='/company/new' element={<AjouterEntreprise />} />
                            <Route path='/company/update' element={<ModifierEntreprise />} />
                            <Route path='/survey/list' element={<ListeEnquete />} />
                            <Route path='/survey' element={<ListeEnquete />} />
                            <Route path='survey/note' element={<ListeNote />} />
                            <Route path='/customer' element={<ListeClient />} />
                            <Route path='/settings' element={<Parametre />} />
                            <Route path='/dashboard' element={<ListeNote />} />
                            <Route path='*' element={<Erreur404 />} />
                        </Route>
                    </Routes>
                </div>
            </main>
        </div>
    )
}

export default Private