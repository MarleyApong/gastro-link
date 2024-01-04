import { Account } from '../services/accountService'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {
   let token = localStorage.getItem('lkiy-')
   if (!Account.isLogged() || !token) {
      return <Navigate to="/auth/login" />
   }
   else if (Account.isLogged()) {
      return children
   }
}

export default AuthGuard