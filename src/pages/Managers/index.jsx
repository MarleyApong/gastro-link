import React from 'react'
import HeaderMain from '../../components/HeaderMain'
import { useNavigate } from 'react-router-dom'
import * as RemixIcons from "react-icons/ri"
import './manager.scss'

const Manager = () => {
   const Navigate = useNavigate()
   return (
      <>
         <HeaderMain total={0} />

         <div className='manager'>
            <button className='Btn Success' onClick={() => Navigate('/managers/products')}><RemixIcons.RiPantoneLine/>Produits</button>
            <button className='Btn Error' onClick={() => Navigate('/managers/tables')}><RemixIcons.RiKeynoteLine/>Tables</button>
         </div>
      </>
   )
}

export default Manager