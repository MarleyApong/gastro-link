import Axios from "./callerService"

const route = 'users'

const getAll = (order, filter, status, role, env, search, limit, page) => {
   return Axios.get(`/${route}?limit=${limit}&page=${page}&sort=${order}&status=${status}&role=${role}&env=${env}&filter=${filter}&k=${search}`)
}

const getCount = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const getOrganizationCompany = (id) => {
   return Axios.get(`/${route}/organization-company/${id}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
}

const update = (id, data) => {
   return Axios.patch(`/${route}/${id}`, data)
}

const changeStatus = (id) => {
   return Axios.patch(`/${route}/${id}/status`)
}

const changeRole = (id, data) => {
   return Axios.patch(`/${route}/${id}/${data}`)
}
const changePassword = (id, data) => {
   return Axios.patch(`/${route}/${id}/password`, data)
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const User = {
   getAll,
   getCount,
   getOne,
   getOrganizationCompany,
   add,
   update,
   changeStatus,
   changeRole,
   changePassword,
   deleted
}