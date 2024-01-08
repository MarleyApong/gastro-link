import React from 'react'

const SearchInput = ({ filter, placeholder, ariaLabel, value, onChange }) => {
  return (
    <div className="AllOptionBox">
      <input
        className="input search"
        type={filter === 'createdAt' ? 'date' : 'text'}
        placeholder={placeholder}
        aria-label={ariaLabel}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchInput
