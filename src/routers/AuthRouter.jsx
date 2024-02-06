import { Route, Routes } from 'react-router-dom'
import Login from '../pages/Auth'

const AuthRouter = () => {
   return (
      <Routes>
         <Route path='login' element={<Login />} />
         <Route path='*' element={<Login />} />
      </Routes>
   )
}

export default AuthRouter