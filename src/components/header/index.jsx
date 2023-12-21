import React from 'react'
import * as RemixIcons from "react-icons/ri"
import { useLocation, useNavigate } from 'react-router-dom'
import './header.scss'
import logo from '../../assets/imgs/logo/cs-logo.png'
import { Link } from 'react-router-dom'
import { statusAccess } from '../../services/access'

const Header = ({ sidebar, setSidebar }) => {
    const Navigate = useNavigate()
    const location = useLocation()
    const access = statusAccess()

    const SelectLink = ({ urlLink }) => {
        if (urlLink.includes('dashboard')) {
            return "tableau de bord"
        }
        else if (urlLink.includes('organizations')) {
            return "liste organisations"
        }
        else if (urlLink.includes('organizations/new')) {
            return "ajout organisation"
        }
        else if (urlLink.includes('surveys')) {
            return "liste enquêtes"
        }
        else if (urlLink.includes('surveys/new')) {
            return "ajout enquête"
        }
        else if (urlLink.includes('notes')) {
            return "notes"
        }
        else if (urlLink.includes('companies')) {
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
        <header>
            <div className="Left">
                <div className="Company">
                    <img src={logo} alt="" />
                    <span>All HIGHT Corp</span>
                </div>
                <div className="Date">[]
                    {/* <RemixIcons.RiTimeLine /> */}
                    <span style={{ textTransform: 'uppercase', width: '150px' }}><SelectLink urlLink={location.pathname} /></span>
                </div>
            </div>
            <div className="Middle">
                <input type="text" name="" id="" placeholder='Rechercher...' />
                <RemixIcons.RiSearch2Line className='Icon' />
            </div>
            <div className="Right">
                <div className="Not-SM">
                    {
                        access === 12 || access === 13 ?
                            <button className='Btn Success'>
                                <RemixIcons.RiAddLine />
                                <small>Nouvelle Entreprise</small>
                            </button> :
                            access === 11 ?
                                "" :
                                access === 22 ?
                                    <button className='Btn Success'>
                                        <RemixIcons.RiAddLine />
                                        <small>Nouvelle Enquête</small>
                                    </button> :
                                    access === 21 ?
                                        "" : Navigate('/auth/login')

                    }
                    {
                        access === 11 || access === 12 || access === 13 ?
                            "" :
                            access === 21 || access === 22 ?
                                <Link to='http://localhost:3000/customer-space' target='_blank' className="NotificationIcon">
                                    <RemixIcons.RiGlobalLine />
                                </Link> :
                               Navigate('/auth/login')

                    }

                    <div className="NotificationIcon">
                        <RemixIcons.RiSunLine />
                    </div>
                    <div className="NotificationIcon">
                        <RemixIcons.RiNotification3Line />
                    </div>
                </div>
                <div className="NotificationIcon" onClick={() => setSidebar(!sidebar)}>
                    <RemixIcons.RiMenu2Line />
                </div>
            </div>
        </header>
    )
}

export default Header