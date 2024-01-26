import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import * as RemixIcons from "react-icons/ri"
import toast from "react-hot-toast"
import dateFormat from 'dateformat'
import HeaderMain from "../../../components/HeaderMain"
import { Survey } from "../../../services/surveyService"
import { Account } from "../../../services/accountService"
import CustomDataTable from "../../../components/CustomDataTable"
import SelectOption from "../../../components/SelectOption"
import { sortOption, StatusOption } from "../../../data/optionFilter"
import SearchInput from "../../../components/SearchInput"
import Access from "../../../utils/utilsAccess"
import { Average } from "../../../services/average"
import { QuestionAnswer } from "../../../services/questionAnswerService"

const ListNote = () => {
   const Navigate = useNavigate()
   const access = Access
   const statusOption = StatusOption()
   const { id } = useParams()

   const [data, setData] = useState([])
   const [oneData, setOneData] = useState([])
   const [loading, setLoading] = useState(true)
   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [status, setStatus] = useState('')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(10)
   const [page, setPage] = useState(0)
   const [refresh, setRefresh] = useState(0)
   const [allCount, setAllCount] = useState(0)

   // GET ORDER VALUE
   const handleOrderChange = (e) => {
      setOrder(e.target.value)
   }

   // GET FILTER VALUE
   const handleFilterChange = (e) => {
      setFilter(e.target.value)
   }

   // GET RESEARCH VALUE
   const handleSearchChange = (e) => {
      setSearch(e.target.value)
   }

   // GET ALL DATA API
   useEffect(() => {
      const loadData = async () => {
         try {
            setLoading(true)
            // RETRIEVE ALL Note
            const res = await QuestionAnswer.getByQuestion(id)
            setData(res.data.content.data)
         } catch (err) {
            console.log("Load: ", err)
         }  finally {
            setLoading(false)
         }
      }

      loadData()
   }, [order, filter, search, refresh, id, loading])

   // SYSTEM PAGINATION
   // const handlePageChange = (newPage) => {
   //    setPage(newPage)
   // }

   // const handleLimitChange = (newLimit) => {
   //    setLimit(newLimit)
   // }

   // FORMATTING JSON DATA TO MAKE IT MORE READABLE
   const ExpandedComponent = ({ data }) => <pre>{JSON.stringify(data, null, 2)}</pre>

   // HEADING AND DISPLAY PRINCIPLE OF THE TABLE
   const columns = [
      {
         name: 'Note',
         selector: row => row.Answer.note,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Suggestion',
         selector: row => row.Answer.suggestion,
         sortable: true,
         wrap: true,
      },
      {
         name: 'Date créat.',
         selector: row => dateFormat(new Date(row.createdAt), 'dd-mm-yyyy HH:MM:ss'),
         sortable: true,
         wrap: true,
      }
   ]

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'nom' },
      { value: 'createdAt', label: 'date de créat.' },
   ]
   return (
      <div>
         <HeaderMain total={allCount} />

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

         <CustomDataTable
            loading={loading}
            columns={columns}
            data={data}
            ExpandedComponent={ExpandedComponent}
         />
      </div>
   )
}

export default ListNote