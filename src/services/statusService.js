import Axios from "./callerService"

const route = 'status'

const getAll = () => {
   return Axios.get(`/${route}`)
}

export const Status = {
   getAll
}