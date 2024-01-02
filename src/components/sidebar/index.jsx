import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import * as RemixIcons from "react-icons/ri"
import SubMenu from './sub-menu'
import { ItemsInternalAdmin, ItemsInternalUser } from '../../data/itemsNav'
import './sidebar.scss'
import avatar from '../../assets/imgs/avatar/Marley.jpg'
import Access from '../../services/access'
import { account } from '../../services/account'

const Sidebar = ({ profil, setProfil, sidebar }) => {
    const access = Access()
    const Navigate = useNavigate()

    const logout = (e) => {
        e.preventDefault()
        if (window.confirm("Attention, vous êtes sur le point de vous déconnecter !") === true) {
            account.logout()
            Navigate('/auth/login')
        }
    }

    return (
        <aside className={sidebar ? "SidebarMin" : "Sidebar"}>
            <div className="User" onClick={() => setProfil(!profil)}>
                <div className="Avatar">
                    <img src={avatar} alt="" />
                </div>
                <div className="InfoUser">
                    <span>Marley Apong</span>
                    <small>Manager</small>
                </div>
                {profil ? <RemixIcons.RiArrowDropDownLine className='IconText' /> : <RemixIcons.RiArrowDropRightLine className='IconText' />}
            </div>

            <div className="Navigation">
                {
                    access === 11 ? ItemsInternalUser.map((item, index) => {
                        return <SubMenu item={item} key={index} />
                    }) :
                        access === 12 ? ItemsInternalAdmin.map((item, index) => {
                            return <SubMenu item={item} key={index} />
                        }) :
                            access === 13 ? ItemsInternalAdmin.map((item, index) => {
                                return <SubMenu item={item} key={index} />
                            }) :
                                access === 21 ? ItemsInternalUser.map((item, index) => {
                                    return <SubMenu item={item} key={index} />
                                }) :
                                    access === 22 ? ItemsInternalAdmin.map((item, index) => {
                                        return <SubMenu item={item} key={index} />
                                    }) : ""
                }

                <NavLink to={'/auth/login'} onClick={logout}>
                    <i><RemixIcons.RiLogoutBoxLine /></i>
                    <span>Exit</span>
                </NavLink>
            </div>

        </aside>
    )
}

export default Sidebar