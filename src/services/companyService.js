import Axios from "./callerService"

const route = 'companies'

const getCount = () => {
   return Axios.get(`/${route}`)
}

const getAll = (order, filter, search, status, limit, page) => {
   return Axios.get(`/${route}?limit=${limit}&page=${page}&sort=${order}&status=${status}&filter=${filter}&k=${search}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const getWebpage = (id) => {
   return Axios.get(`/${route}/page/${id}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
}

const update = (id,data) => {
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

export const Company = {
   getCount,
   getAll,
   getOne,
   getWebpage,
   add,
   update,
   changeProfil,
   changeStatus,
   deleted
}