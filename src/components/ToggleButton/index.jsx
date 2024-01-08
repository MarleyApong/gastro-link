import React from 'react'
import './toggleButton.scss'

const ToggleButton = ({ checked, onChange, id }) => {

   const handleToggle = () => {
      onChange(id)
   }

   return (
      <div className='ToggleButton'>
         <input
            type="checkbox"
            checked={checked}
            onChange={handleToggle}
            id={`check-button-${id}`}
            className='check-button'
         />
         <label htmlFor={`check-button-${id}`} className='slide-button'></label>
      </div>
   )
}

export default ToggleButton