import React, { useState } from 'react'
import Select from 'react-select'
import './customSelect.scss'

const customStyles = {
   container: (provided) => ({
      ...provided,
      width: 'auto',
      padding: '0px',
      margin: '0',
      // display: 'none'
   }),
   dropdownIndicator: (provided) => ({
      ...provided,
      padding: '4px',
      display: 'none',
    }),
   control: (provided, state) => ({
      ...provided,
      backgroundColor: '#fff',
      borderColor: state.isFocused ? '#007bff' : '#ced4da',
      borderRadius: '.25rem',
      borderStyle: 'solid',
      borderWidth: '0px',
      boxShadow:'none',
      '&:hover': {
        borderColor: state.isFocused ? '#007bff' : '#ced4da',
      },
      outline: 'none',
   }),
   menu: (provided) => ({
      ...provided,
   }),
   option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? 'var(--user-color)' : 'white',
      color: state.isFocused ? 'white' : 'black',
      padding: '5px',
      fontSize: '13px',
   }),
   singleValue: (provided) => ({
      ...provided,
      color: '#333',
      fontSize: '13px'
   }),
   placeholder: (provided) => ({
      ...provided,
      color: '#999',
      fontSize: '13px'
   }),
}

const CustomSelect = ({ data, placeholder, onSelectedValue }) => {
   const [selectedData, setSelectedData] = useState(null)

   const options = data.map(data => ({
      label: data.name,
      value: data.id,
   }))

   const handleSelectChange = selectedOption => {
      setSelectedData(selectedOption)
      onSelectedValue(selectedOption)
   }

   return (
      <Select className='form-control no-focus-outline'
         options={options}
         styles={customStyles}
         placeholder={placeholder}
         value={selectedData}
         onChange={handleSelectChange}
         noOptionsMessage={() => 'Aucune option'}
      />
   )
}

export default CustomSelect