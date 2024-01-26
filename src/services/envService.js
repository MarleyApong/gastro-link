import Axios from "./callerService"

const route = 'envs'

const getAll = () => {
   return Axios.get(`/${route}`)
}

export const Env = {
   getAll
}