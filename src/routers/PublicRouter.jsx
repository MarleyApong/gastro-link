import { Route, Routes } from 'react-router-dom'
import { Website } from '../pages'

const PublicRouter = () => {
   return (
      <Routes>
         <Route path=':organization/:company/home' element={<Website />} />
         {/* <Route path='*' element={<Login />} /> */}
      </Routes>
   )
}

export default PublicRouter