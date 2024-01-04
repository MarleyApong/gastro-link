import React from 'react'
import { useLocation } from 'react-router-dom'
import Access from '../../utils/utilsAccess'
import './headerMain.scss'

const HeaderMain = ({ total }) => {
    const location = useLocation()
    const access = Access()

    const SelectLink = ({ urlLink }) => {
        if (urlLink.includes('dashboard')) {
            return "tableau de bord"
        }
        else if (urlLink.includes('organizations') && !urlLink.includes('new') && !urlLink.includes('update')) {
            return "liste organisations"
        }
        else if (urlLink.includes('organizations/update') && !urlLink.includes('new')) {
            return "modif. organisation"
        }
        else if (urlLink.includes('organizations/new') && !urlLink.includes('update')) {
            return "ajout organisation"
        }
        else if (urlLink.includes('surveys') && !urlLink.includes('new')) {
            return "liste enquêtes"
        }
        else if (urlLink.includes('surveys/new')) {
            return "ajout enquête"
        }
        else if (urlLink.includes('notes')) {
            return "notes"
        }
        else if (urlLink.includes('companies') && !urlLink.includes('new')) {
            return "liste entreprises"
        }
        else if (urlLink.includes('companies/new')) {
            return "ajout entreprise"
        }
        else if (urlLink.includes('customers')) {
            return "liste clients"
        }
        else if (urlLink.includes('settings')) {
            return "paramètres"
        }
    }
    return (
        <div className='HeaderMain'>
            <h5 style={{ textTransform: 'uppercase'}}><SelectLink urlLink={location.pathname} /></h5>
            <h5>{total ? `Total : ${total}` : ""}</h5>
        </div>
    )
}

export default HeaderMain