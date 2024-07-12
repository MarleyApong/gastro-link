import Swal from 'sweetalert2'
import { Account } from '../services/accountService'
import { Navigate } from 'react-router-dom'

const AuthGuard = ({ children }) => {
   const tokenValidity = Account.isLogged()

   if (!tokenValidity.isValid) {
      // IF TOKEN IS NOT VALID
      if (tokenValidity.errorCode === "TOKEN_EXPIRED") {
         Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Votre session a expiré !',
            confirmButtonText: 'Ok'
         })
      } else if (tokenValidity.errorCode === "INVALID_TOKEN_FORMAT") {
         Swal.fire({
            icon: 'error',
            title: 'Erreur',
            text: 'Echec de connexion !',
            confirmButtonText: 'Ok'
         })
      }
      return <Navigate to="/auth/login" />
   }

   // IF TOKEN IS VALID, DISPLAY PROTECTED CONTENT
   return children
}

export default AuthGuard