import Axios from "./callerService"

const login = (email, password) => {
   return Axios.post('/auth/login', {email, password})
}

const setPassword = (email, temporaryPassword, password) => {
   return Axios.put('/auth/set-password', {email, temporaryPassword, password})
}

export const AuthService = {
   login,
   setPassword
}