import React, { useEffect, useState } from 'react'
import './order.scss'
import * as RemixIcons from "react-icons/ri"
import Pagination from '../../../components/Pagination'
import { Product } from '../../../services/productService'
import { Orders } from '../../../services/orderService'
import { useNavigate, useParams } from 'react-router-dom'

const Order = () => {
   const Navigate = useNavigate()
   const { company } = useParams()
   // GET PARAMS AFTER  THE (?)
   const queryString = window.location.search;
   const urlParams = new URLSearchParams(queryString);
   const idTable = urlParams.get('fkpngt44tdot')

   const [products, setProducts] = useState([])
   const [cart, setCart] = useState([])
   const [pageable, setPageable] = useState({})
   const [showCart, setShowCart] = useState(false)

   const order = 'asc'
   const filter = 'name'
   const search = ''
   const limit = 14
   const page = 0

   useEffect(() => {
      const loadProducts = async () => {
         const res = await Product.getProductByCompany(company, order, filter, search, limit, page)
         // INITIALIZE QUANTITY TO 0
         setProducts(res.data.content.data.map(product => ({ ...product, quantity: 0 })))
         setPageable(res.data.content)
      }

      loadProducts()
   }, [])

   const handleAddToCart = (product) => {
      const existingItem = cart.find(item => item.id === product.id)
      const productWithQuantity = products.find(item => item.id === product.id)

      if (existingItem) {
         // UPDATE CART ITEM QUANTITY
         const updatedCart = cart.map(item =>
            item.id === product.id ? { ...item, quantity: productWithQuantity.quantity } : item
         )
         setCart(updatedCart)
      } else {
         // ADD PRODUCT TO CART WITH QUANTITY
         const updatedCart = [...cart, { ...product, quantity: productWithQuantity.quantity }]
         setCart(updatedCart)
      }
   }

   const handleRemoveFromCart = (product) => {
      // REMOVE PRODUCT FROM CART
      const updatedCart = cart.filter(item => item.id !== product.id)
      setCart(updatedCart)
   }

   const updateProductQuantity = (productId, newQuantity) => {
      // LIMIT QUANTITY TO MINIMUM 0 AND MAXIMUM 10
      newQuantity = Math.max(0, Math.min(10, newQuantity))

      // UPDATE PRODUCT QUANTITY IN PRODUCT LIST
      const updatedProducts = products.map(product =>
         product.id === productId ? { ...product, quantity: newQuantity } : product
      )
      setProducts(updatedProducts)

      // UPDATE PRODUCT QUANTITY IN CART
      const updatedCart = cart.map(item =>
         item.id === productId ? { ...item, quantity: newQuantity } : item
      )
      setCart(updatedCart)
   }

   // SAVED ORDER
   const orderSummary = {
      orders: cart.map(item => ({
         idProduct: item.id,
         name: item.name,
         price: item.price,
         quantity: item.quantity,
         total: item.price * item.quantity
      })),
      idTable: idTable,
      webPageCompany: company
   }

   const handleSubmitOrder = async (e) => {
      e.preventDefault()
      try {
         const res = await Orders.add(orderSummary)
         // toast
         console.log("Commande enregistree")
      }
      catch (err) {
         console.log("erreur", err)
      }
   }

   console.log("company", company)

   return (
      <div className='order'>
         <div className='container-products' >
            <div className='content-title'>
               <span className='title'>Nos produits</span>
               <span className='show-cart' onClick={() => setShowCart(true)}>Afficher le panier</span>
            </div>

            <div className='content'>
               {products.length > 0 && products.map((product) => (
                  <div className='product' key={product.id} onClick={() => setShowCart(true)}>
                     <img src={'http://localhost:8000' + product.picture} alt='' />
                     <div className='details'>
                        <div className='resource'>
                           <span className='name-product'>{product.name}</span>
                        </div>
                        <div className='control'>
                           <div className='control-btn'>
                              <button onClick={() => updateProductQuantity(product.id, product.quantity - 1)}>-</button>
                              <span>{product.quantity}</span>
                              <button onClick={() => updateProductQuantity(product.id, product.quantity + 1)}>+</button>
                           </div>
                           <span>{product.price} fcfa</span>
                        </div>
                        <div className='add-btn'>
                           <button onClick={() => handleAddToCart(product)} disabled={cart.some(item => item.id === product.id)}><RemixIcons.RiShoppingCartLine /> panier</button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
            <Pagination pageable={pageable} />
         </div>

         <div className={showCart ? 'container-carts-show' : 'container-carts'}>
            <div className='content-title'>
               <span className='title'>Panier à produits</span>
               <div className='close' onClick={() => setShowCart(false)}><RemixIcons.RiCloseLine /></div>
            </div>

            <form onSubmit={handleSubmitOrder} className='content'>
               <div className="sm-cart">
                  {cart.map((item, index) => (
                     <div className="cart" key={index}>
                        <img src={'http://localhost:8000' + item.picture} alt="" />
                        <div className="details">
                           <span>{item.name}</span>
                           <span>{item.price}</span>
                           <div className="control">
                              <div className='control-btn'>
                                 <button onClick={() => updateProductQuantity(item.id, item.quantity - 1)}>-</button>
                                 <span>{item.quantity}</span>
                                 <button onClick={() => updateProductQuantity(item.id, item.quantity + 1)}>+</button>
                              </div>
                              <RemixIcons.RiCloseLine onClick={() => handleRemoveFromCart(item)} />
                           </div>
                        </div>
                     </div>
                  ))}
               </div>

               <div className='total-price'>
                  <span> Montant total: </span>
                  <span>{cart.reduce((total, item) => total + item.price * item.quantity, 0)} fcfa</span>
               </div>

               <div className='submit-order'>
                  <button onClick={() => setShowCart(false)}><RemixIcons.RiArrowLeftLine size={16} /></button>
                  <button><RemixIcons.RiTimerLine size={16} />Commander</button>
               </div>
            </form>
         </div>
      </div >
   )
}

export default Order