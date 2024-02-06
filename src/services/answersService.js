import Axios from "./callerService"

const route = 'answers'

const getAll = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}

const getAnswersByOrganization = (id) => {
   return Axios.get(`/${route}/organizations/${id}`)
}

const add = (data) => {
   return Axios.put(`/${route}`, data)
}

export const Answer = {
   getAll,
   getOne,
   getAnswersByOrganization,
   add
}