import Axios from "./caller"

const route = 'companies'

const getAll = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const add = (company) => {
   return Axios.put(`/${route}`, company)
}

const update = (company) => {
   return Axios.patch(`/${route}`, company)
}

const changeProfil = (company) => {
   return Axios.patch(`/${route}/${id}/profile-image`, company)
}

const changeStatus = (id) => {
   return Axios.patch(`/${route}/${id}/status`)
}

const deleted = (id) => {
   return Axios.delete(`/${route}/${id}`)
}

export const Companies = {
   getAll,
   getOne,
   add,
   update,
   changeProfil,
   changeStatus,
   deleted
}