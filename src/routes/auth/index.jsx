import { Route, Routes } from 'react-router-dom'
import Login from '../../pages/auth/'

const AuthRoute = () => {
   return (
      <Routes>
         <Route path='login' element={<Login />} />
         <Route path='*' element={<Login />} />
      </Routes>
   )
}

export default AuthRoute