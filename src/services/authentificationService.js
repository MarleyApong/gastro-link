import Axios from "./callerService"

const login = (email, password) => {
   return Axios.post('/auth/login', {email, password})
}

export const Authentification = {
   login
}