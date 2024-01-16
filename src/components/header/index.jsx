import React, { useEffect } from 'react'
import * as RemixIcons from "react-icons/ri"
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo/cs-logo-red.png'
import { Link } from 'react-router-dom'
import Access from '../../utils/utilsAccess'
import './header.scss'

const Header = ({ sidebar, setSidebar }) => {
    const Navigate = useNavigate()
    const location = useLocation()
    const access = Access()

    const id = localStorage.getItem("id")

    const newOrganization = () => Navigate('/organizations/new')
    const newCompany = () => Navigate('/companies/new')
    const newSurveys = () => Navigate('/surveys/new')
    const newUsers = () => Navigate('/users/new')

    useEffect(() => {

    },[])

    return (
        <header>
            <div className="Left">
                <div className="Company">
                    <img src={logo} alt="" />
                    <span>CUSTOMER SPACE</span>
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
                                    location.pathname.includes('organizations') && !location.pathname.includes('new') ?
                                        <small onClick={newOrganization}>Nouvelle Organizat.</small> :
                                        location.pathname.includes('companies') && !location.pathname.includes('new') ?
                                            <small onClick={newCompany}>Nouvelle Entreprise</small> :
                                            location.pathname.includes('surveys') && !location.pathname.includes('new') ?
                                                <small onClick={newSurveys}>Nouvelle Enquête</small> :
                                                location.pathname.includes('users') && !location.pathname.includes('new') ?
                                                    <small onClick={newUsers}>Nouveau utilisateur</small> :
                                                    <small onClick={newSurveys}>Nouvelle Enquête</small>
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