import React, { useEffect, useState } from "react"
import * as RemixIcons from "react-icons/ri"
import HeaderMain from '../../components/HeaderMain'
import { Product } from "../../services/productService"
import { sortOption } from "../../data/optionFilter"
import Pagination from "../../components/Pagination"
import SelectOption from "../../components/SelectOption"
import SearchInput from "../../components/SearchInput"
import { Account } from "../../services/accountService"
import './menu.scss'

const Menu = () => {
   const idUser = Account.getUserId()

   const [order, setOrder] = useState('asc')
   const [filter, setFilter] = useState('name')
   const [search, setSearch] = useState('')
   const [limit, setLimit] = useState(14)
   const [page, setPage] = useState(1)
   const [allCount, setAllCount] = useState(0)
   const [products, setProducts] = useState([])
   const [pageable, setPageable] = useState({})
   const [mode, setMode] = useState(true)

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
         const status = 'actif'
         const res = await Product.getProductsByUser(idUser, order, filter, status, search, limit, page)
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
         <HeaderMain />

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

            <button className='Btn Update Btn-size me-1' onClick={() => setMode(!mode)}>
               {mode ? <RemixIcons.RiMenu5Line size={15} /> : <RemixIcons.RiListCheck2 size={15} />}
               {/* <span className='btn-text'>Mode d'affichage</span> */}
            </button>
         </div>

         <div className="container-products">
            {mode ?
               <div className='content-menu'>
                  {products.length > 0 ? products.map((product) => (
                     <div className='product' key={product.id} onClick={() => setShowCart(true)}>
                        <img src={product.picture} alt='' />
                        <div className='details'>
                           <div className='resource'>
                              <span className='name-product'>{product.name}</span>
                           </div>
                           <div className='control'>
                              <span>{product.price} fcfa</span>
                           </div>
                        </div>
                     </div>
                  )) : <div> Aucun produit disponible !</div>}
               </div>
               :
               <div className='content-list'>
                  <table>
                     <thead>
                        <th>Produit</th>
                        <th className='text-center'>P.U</th>
                     </thead>
                     <tbody>
                        {products.length > 0 ? products.map((product) => (
                           <tr key={product.id} onClick={() => setShowCart(true)}>
                              <td >{product.name}</td>
                              <td className='text-center'>{product.price} fcfa</td>
                           </tr>
                        )) : <div> Aucun produit disponible !</div>}
                     </tbody>
                  </table>
               </div>
            }
            <div className='d-flex justify-content-center align-items-center'>
               <Pagination
                  pageable={pageable}
                  setPage={setPage}
               />
            </div>
         </div>
      </div>
   )
}

export default Menu