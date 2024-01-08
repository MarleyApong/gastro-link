import React from 'react'

const SelectOption = ({ label, id, name, value, onChange, options }) => {
  return (
    <div className="AllOptionBox">
      <label htmlFor={id}>{label}: </label>
      <select className="input ml-2" id={id} name={name} onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}

export default SelectOption
