import Axios from "./callerService"

const route = 'roles'

const getAll = () => {
   return Axios.get(`/${route}`)
}

// const add = (data) => {
//    return Axios.put(`/${route}`, data)
// }

// const deleted = (id) => {
//    return Axios.delete(`/${route}/${id}`)
// }

export const Role = {
   getAll,
   // add,
   // deleted
}