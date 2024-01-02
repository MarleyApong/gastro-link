import React from 'react'
import * as RemixIcons from "react-icons/ri"
import { useLocation, useNavigate } from 'react-router-dom'
import './header.scss'
import logo from '../../assets/imgs/logo/cs-logo.png'
import { Link } from 'react-router-dom'
import Access from '../../services/access'

const Header = ({ sidebar, setSidebar }) => {
    const Navigate = useNavigate()
    const location = useLocation()
    const access = Access()

    const newOrganization = () => Navigate('/organizations/new')
    const newCompany = () => Navigate('/companies/new')
    const newSurveys = () => Navigate('/surveys/new')

    return (
        <header>
            <div className="Left">
                <div className="Company">
                    <img src={logo} alt="" />
                    <span>All HIGHT Corp</span>
                </div>
            </div>
            {/* <div className="Middle">
                <input type="text" name="" id="" placeholder='Rechercher...' />
                <RemixIcons.RiSearch2Line className='Icon' />
            </div> */}
            <div className="Right">
                <div className="Not-SM">
                    {
                        access === 12 || access === 13 ?
                            <button className='Btn Success'>
                                <RemixIcons.RiAddLine />
                                {
                                    location.pathname.includes('compan') ?
                                        <small onClick={newOrganization}>Nouvelle Organizat.</small> :
                                        location.pathname.includes('organizat') ?
                                            <small  onClick={newCompany}>Nouvelle Entreprise</small> : 
                                            location.pathname.includes('surve') ?
                                            <small onClick={newSurveys}>Nouvelle Enquête</small> :  <small>Nouvelle Enquête</small>
                                }       
                            </button> :
                            access === 11 ?
                                "" :
                                access === 22 ?
                                    <button className='Btn Success'>
                                        <RemixIcons.RiAddLine />
                                        <small>Nouvelle Enquête</small>
                                    </button> :
                                    access === 21 ?
                                        "" : ""

                    }
                    {
                        access === 11 || access === 12 || access === 13 ?
                            "" :
                            access === 21 || access === 22 ?
                                <Link to='http://localhost:3000/customer-space' target='_blank' className="NotificationIcon">
                                    <RemixIcons.RiGlobalLine />
                                </Link> :
                                ""

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