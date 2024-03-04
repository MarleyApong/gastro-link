import Axios from "./callerService"

const route = 'orders'

const getAll = (order, filter, search, limit, page) => {
   return Axios.get(`/${route}?limit=${limit}&page=${page}&sort=${order}&filter=${filter}&k=${search}`)
}

const getOrder = (idUser, order, filter, search, limit, page) => {
   return Axios.get(`/${route}/users/${idUser}?limit=${limit}&page=${page}&sort=${order}&filter=${filter}&k=${search}`)
}

const getOrderByCompany = (Company, order, filter, search, status, limit, page) => {
   return Axios.get(`/${route}/companies/${Company}?limit=${limit}&page=${page}&status=${status}&sort=${order}&filter=${filter}&k=${search}`)
}

const getOrderByUser = (Company, user, status, limit, page) => {
   return Axios.get(`/${route}/companies/${Company}/users/${user}?limit=${limit}&page=${page}&status=${status}`)
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

const underTreatment = (id, user) => {
   return Axios.patch(`/${route}/${id}/underTreatment`, { user: user })
}

const cancelOrder = (id, user) => {
   return Axios.patch(`/${route}/${id}/cancelOrder`, { user: user })
}

const finalizeOrder = (id, user) => {
   return Axios.patch(`/${route}/${id}/finalizeOrder`, { user: user })
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const Orders = {
   getAll,
   getOrder,
   getOrderByCompany,
   getOrderByUser,
   getOne,
   add,
   update,
   underTreatment,
   cancelOrder,
   finalizeOrder,
   deleted
}