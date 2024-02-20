import React, { useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import HeaderMain from '../../components/HeaderMain'
import { Product } from "../../services/productService"
import Pagination from "../../components/Pagination"
import { sortOption } from "../../data/optionFilter"
import SelectOption from "../../components/SelectOption"
import SearchInput from "../../components/SearchInput"
import './menu.scss'

const Menu = () => {
   const idUser = localStorage.getItem('id')

   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(14)
   const [page, setPage] = useState(1)
   const [allCount, setAllCount] = useState(0)
   const [products, setProducts] = useState([])
   const [pageable, setPageable] = useState({})

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

   useEffect(() => {
      const loadProducts = async () => {
         const res = await Product.getProductsByUser(idUser, order, filter, search, limit, page)
         // INITIALIZE QUANTITY TO 0
         setProducts(res.data.content.data.map(product => ({ ...product, quantity: 0 })))
         setPageable(res.data.content)
      }

      loadProducts()
   }, [idUser, order, filter, search, limit, page])

   // FILTER SELECT TAG DATA
   const filterOptions = [
      { value: 'name', label: 'produit' },
      // { value: 'price', label: 'prix' },
      { value: 'createdAt', label: 'date de créat.' },
   ]

   return (
      <div className="menu">
         <HeaderMain/>
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
         <div className='content'>
            {products.length > 0 && products.map((product) => (
               <div className='product' key={product.id} onClick={() => setShowCart(true)}>
                  <img src={'http://localhost:8000' + product.picture} alt='' />
                  <div className='details'>
                     <div className='resource'>
                        <span className='name-product'>{product.name}</span>
                     </div>
                     <span>{product.price} fcfa</span>
                  </div>
               </div>
            ))}
         </div>
         <div className='d-flex justify-content-center align-items-center'>
            <Pagination
               pageable={pageable}
               setPage={setPage}
            />
         </div>

      </div>
   )
}

export default Menu