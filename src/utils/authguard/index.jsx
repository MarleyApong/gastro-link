import { account } from '../../services/account'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {
   let token = JSON.parse(localStorage.getItem('lkiy-'))
   if (!account.isLogged() || !token) {
      return <Navigate to="/auth/login" />
   }
   else if (account.isLogged()) {
      return children
   }
}

export default AuthGuard