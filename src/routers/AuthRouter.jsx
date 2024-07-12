import { Route, Routes, Navigate } from 'react-router-dom'
import Login from '../pages/Auth'
import InitiatePassword from '../pages/Auth/InitiatePassword'
import { Account } from '../services/accountService'

const AuthRouter = () => {
   const getInitiatePassword = Account.getInitiatePassword()

   return (
      <Routes>
         <Route path='login' element={<Login />} />
         <Route path='set-password' element={getInitiatePassword ? <InitiatePassword /> : <Navigate to="/auth/login" />} />
         <Route path='*' element={<Login />} />
      </Routes>
   )
}

export default AuthRouter