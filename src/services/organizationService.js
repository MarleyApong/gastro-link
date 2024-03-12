import Axios from "./callerService"

const route = 'organizations'

const getCount = () => {
   return Axios.get(`/${route}`)
}

const getAll = (order, filter, status, search, limit, page) => {
   return Axios.get(`/${route}?limit=${limit}&page=${page}&sort=${order}&status=${status}&filter=${filter}&k=${search}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const getOrganizationByUser = (id) => {
   return Axios.get(`/${route}/users/${id}`)
}

const add = (data) => {
   console.log("data", data)
   return Axios.put(`/${route}`, data)
}

const update = (id, data) => {
   return Axios.patch(`/${route}/${id}`, data)
}

const changeProfil = (id, data) => {
   return Axios.patch(`/${route}/${id}/profile-image`, data)
}

const changeStatus = (id) => {
   return Axios.patch(`/${route}/${id}/status`)
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const Organization = {
   getCount,
   getAll,
   getOne,
   getOrganizationByUser,
   add,
   update,
   changeProfil,
   changeStatus,
   deleted
}