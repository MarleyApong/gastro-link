import Axios from "./caller"

const login = (email, password) => {
   return Axios.post('/auth/login', {email, password})
}

export const authentification = {
   login
}