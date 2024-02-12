import { Route, Routes } from 'react-router-dom'
import { Website } from '../pages'
import NotFound from '../pages/NotFound'
import Note from '../pages/Website/Note'
import Order from '../pages/Website/Order'

const PublicRouter = () => {
   return (
      <Routes>
         <Route path=':organization/:company' element={<Website />} />
         <Route path=':organization/:company/note' element={<Note />} />
         <Route path=':organization/:company/order' element={<Order />} />
         <Route path='*' element={<NotFound />} />
      </Routes>
   )
}

export default PublicRouter