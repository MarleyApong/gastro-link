import Axios from "./caller"

const route = 'Users'

const getAll = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const add = (user) => {
   return Axios.put(`/${route}`, user)
}

const changeStatus = (id) => {
   return Axios.patch(`/${route}/${id}/status`)
}

const changeRole = (id, role) => {
   return Axios.patch(`/${route}/${id}/${role}`)
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const users = {
   getAll,
   getOne,
   add,
   changeStatus,
   changeRole,
   deleted
}