import Axios from "./callerService"

const route = 'tables'

const getAll = (order, filter, search, limit, page) => {
   return Axios.get(`/${route}?limit=${limit}&page=${page}&sort=${order}&filter=${filter}&k=${search}`)
}

const getTablesByUser = (idUser, order, filter, search, limit, page) => {
   return Axios.get(`/${route}/users/${idUser}?limit=${limit}&page=${page}&sort=${order}&filter=${filter}&k=${search}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
}

const update = (id, data) => {
   return Axios.patch(`/${route}/${id}`, data)
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const Table = {
   getAll,
   getTablesByUser,
   getOne,
   add,
   update,
   deleted
}