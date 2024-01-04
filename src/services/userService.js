import Axios from "./callerService"

const route = 'Users'

const getAll = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
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

export const User = {
   getAll,
   getOne,
   add,
   changeStatus,
   changeRole,
   deleted
}