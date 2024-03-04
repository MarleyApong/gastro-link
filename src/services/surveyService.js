import Axios from "./callerService"

const route = 'surveys'

const getCount = () => {
   return Axios.get(`/${route}`)
}

const getAll = (order, filter, status, search, limit, page) => {
   return Axios.get(`/${route}?limit=${limit}&page=${page}&sort=${order}&status=${status}&filter=${filter}&k=${search}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const getSurveysByUser = (id, order, filter, status, search, limit, page) => {
   return Axios.get(`/${route}/users/${id}?limit=${limit}&page=${page}&sort=${order}&status=${status}&filter=${filter}&k=${search}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
}

const update = (id, data) => {
   return Axios.patch(`/${route}/${id}`, data)
}

const changeStatus = (id, idCompany) => {
   return Axios.patch(`/${route}/${id}/status`, { idCompany: idCompany })
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const Survey = {
   getCount,
   getAll,
   getOne,
   getSurveysByUser,
   add,
   update,
   changeStatus,
   deleted
}