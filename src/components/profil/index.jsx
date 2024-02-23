import React from 'react'
import * as RemixIcons from "react-icons/ri"
import './profil.scss'
import { useNavigate } from 'react-router-dom'

const Profil = ({ profil }) => {
    const Navigate = useNavigate()
    const logout = (e) => {
        e.preventDefault()
        if (window.confirm("Attention, vous êtes sur le point de vous déconnecter !") === true) {
            Account.logout()
            Navigate('/auth/login')
        }
    }
    return (
        <div className={profil ? "Profil" : "Hidden"}>
            <span onClick={() => Navigate('/settings')}><RemixIcons.RiUserLine /> Mon profil</span>
            <span onClick={logout}><RemixIcons.RiLogoutBoxLine /> Se déconnecter</span>
        </div>
    )
}

export default Profil