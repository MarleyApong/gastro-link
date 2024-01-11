import { Route, Routes } from 'react-router-dom'
import { Website } from '../pages'

const PublicRoute = () => {
   return (
      <Routes>
         <Route path=':id' element={<Website />} />
         {/* <Route path='*' element={<Login />} /> */}
      </Routes>
   )
}

export default PublicRoute