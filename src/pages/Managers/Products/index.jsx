import React, { useEffect, useState, useRef } from "react"
import HeaderMain from '../../../components/HeaderMain'
import SelectOption from '../../../components/SelectOption'
import SearchInput from '../../../components/SearchInput'
import { sortOption } from "../../../data/optionFilter"


const Products = () => {
  const [data, setData] = useState([])
  const [oneData, setOneData] = useState([])
  const [loading, setLoading] = useState(true)
  const [order, setOrder] = useState('asc')
  const [filter, setFilter] = useState('name')
  const [status, setStatus] = useState('')
  const [search, setSearch] = useState('')
  const [limit, setLimit] = useState(10)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(0)
  const [id, setId] = useState('')
  const [showDetailCompanyModal, setshowDetailCompanyModal] = useState(false)
  const [refresh, setRefresh] = useState(0)
  const [allCount, setAllCount] = useState(0)
  const [getImage, setGetImage] = useState('')

  // RECOVERING THE ID OF THE SELECTED LINE
  const patch = (itemId) => {
    setshowDetailCompanyModal(true)
    setId(itemId)
  }

  // CLOSE THE TEMPLATE MODAL
  const hideModal = () => {
    setshowDetailCompanyModal(false)
    setGetImage('')
    setRefresh((current) => current + 1)
  }

  // GET ORDER VALUE
  const handleOrderChange = (e) => {
    setOrder(e.target.value)
  }

  // GET FILTER VALUE
  const handleFilterChange = (e) => {
    setFilter(e.target.value)
  }

  // GET STATUS VALUE
  const handleStatusChange = (e) => {
    setStatus(e.target.value)
  }

  // GET RESEARCH VALUE
  const handleSearchChange = (e) => {
    setSearch(e.target.value)
  }

   // FILTER SELECT TAG DATA
   const filterOptions = [
    { value: 'name', label: 'nom' },
    { value: 'prix', label: 'téléphone' },
    { value: 'category', label: 'ville' },
    { value: 'createdAt', label: 'date de créat.' },
 ]

  return (
    <>
      <HeaderMain total={0} />

      <div className="OptionFilter">
        <SelectOption
          label="Trier par"
          id="sort"
          name={order}
          value={order}
          onChange={handleOrderChange}
          options={sortOption}
        />

        <SelectOption
          label="Filtrer par"
          id="filter"
          name={filter}
          value={filter}
          onChange={handleFilterChange}
          options={filterOptions}
        />

        <SearchInput
          filter={filter}
          placeholder="Tapez ici.."
          ariaLabel="Search"
          value={search}
          onChange={handleSearchChange}
        />
      </div>
    </>
  )
}

export default Products