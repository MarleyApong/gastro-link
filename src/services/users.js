import Axios from "./caller";

const getAll = () => {
   return Axios.get('/users')
}

const getOne = () => {
   return Axios.get(`/users/${id}`)
}

const add = (user) => {
   return Axios.post(`/users`, user)
}

const changeStatus = (id, status) => {
   return Axios.get(`/api/v1.0/users/lockAndUnlockAccount/${id}/${status}`)
}

const deleteUser = (id) => {
   return Axios.delete(`/api/v1.0/users/${id}`)
}

export const users = {
   getAll,
   getOne,
   add,
   signUp,
   changeStatus,
   deleteUser
}