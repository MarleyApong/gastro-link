import React from 'react'
import * as RemixIcons from "react-icons/ri"
import './profil.scss'

const Profil = ({profil}) => {
    return (
        <div className={profil ? "Profil" : "Hidden"}>
            <span><RemixIcons.RiUserLine/> Mon profil</span>
            <span><RemixIcons.RiLogoutBoxLine /> Se déconnecter</span>
        </div>
    )
}

export default Profil