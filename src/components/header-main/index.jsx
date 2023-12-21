import React from 'react'
import './headerMain.scss'

const HeaderMain = ({patch, total}) => {
    return (
        <div className='HeaderMain'>
            <h5>{patch}</h5>
            <h5>{total ? `Total : ${total}` : ""}</h5>
        </div>
    )
}

export default HeaderMain