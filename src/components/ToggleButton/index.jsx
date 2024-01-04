import React from 'react'
import './toggleButton.scss'

const ToggleButton = ({ checked, onChange }) => {

   return (
      <div className='ToggleButton'>
         <input type="checkbox"
            checked={checked}
            onChange={onChange}
            id='check-button'
         />
         <label htmlFor="check-button" className='slide-button'></label>
      </div>
   )
}

export default ToggleButton