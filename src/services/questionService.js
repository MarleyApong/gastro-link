import Axios from "./callerService"

const route = 'questions'

const getAll = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
}

const update = (data) => {
   return Axios.patch(`/${route}`, data)
}

const changeProfil = (data) => {
   return Axios.patch(`/${route}/${id}/profile-image`, data)
}

const changeStatus = (id) => {
   return Axios.patch(`/${route}/${id}/status`)
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const Question = {
   getAll,
   getOne,
   add,
   update,
   changeProfil,
   changeStatus,
   deleted
}