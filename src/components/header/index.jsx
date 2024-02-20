import React, { useEffect } from 'react'
import * as RemixIcons from "react-icons/ri"
import { useLocation, useNavigate } from 'react-router-dom'
import logo from '../../assets/img/logo/cs-logo-red.png'
import Access from '../../utils/utilsAccess'
import './header.scss'
import toast from 'react-hot-toast'
import EventOrder from '../EventOrder'

const Header = ({ sidebar, setSidebar }) => {
    const Navigate = useNavigate()
    const location = useLocation()
    const access = Access()
    const eventOrder = EventOrder()

    const id = localStorage.getItem("id")

    // REDIRECTION
    const newOrganization = () => Navigate('/organizations/new')
    const newCompany = () => Navigate('/companies/new')
    const newSurvey = () => Navigate('/surveys/new')
    const newUser = () => Navigate('/users/new')
    const newProduct = () => Navigate('/managers/products/new')
    const newTable = () => Navigate('/managers/tables/new')

    useEffect(() => {
        if (eventOrder !== '') {
            toast.success("Vous avez une nouvelle commande")
        }
    }, [eventOrder])


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

                    {access != 20 && (
                        <button className='Btn Success'>
                            <RemixIcons.RiAddLine />
                            {
                                location.pathname.includes('organizations') && !location.pathname.includes('new') ?
                                    <small onClick={newOrganization}>Nouvelle Organizat.</small> :
                                    location.pathname.includes('companies') && !location.pathname.includes('new') ?
                                        <small onClick={newCompany}>Nouvelle Entreprise</small> :
                                        location.pathname.includes('surveys') && !location.pathname.includes('new') ?
                                            <small onClick={newSurvey}>Nouvelle Enquête</small> :
                                            location.pathname.includes('users') && !location.pathname.includes('new') ?
                                                <small onClick={newUser}>Nouveau utilisateur</small> :
                                                location.pathname.includes('managers') && location.pathname.includes('products') ?
                                                    <small onClick={newProduct}>Ajouter un produit</small> :
                                                    location.pathname.includes('managers') && location.pathname.includes('tables') ?
                                                        <small onClick={newTable}>Ajouter une table</small> :
                                                        <small onClick={newSurvey}>Nouvelle Enquête</small>
                            }
                        </button>)}
                    {/* :
                            access === 11 ?
                                "" :
                                access === 23 ||  access === 22 ?
                                    <button className='Btn Success'>
                                        <RemixIcons.RiAddLine />
                                        {location.pathname.includes('managers') && location.pathname.includes('products') ?
                                            <small onClick={newProducts}>Ajouter un produit</small> :
                                            <small onClick={newSurveys}>Nouvelle Enquête</small>
                                        }
                                    </button> :
                                    access === 21 ?
                                        "" : "" */}



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