import Axios from "./callerService"

const route = 'questions-answers'

const getAll = () => {
   return Axios.get(`/${route}`)
}

const getOne = (id) => {
   return Axios.get(`/${route}/${id}`)
}
const getByQuestion = (id) => {
   return Axios.get(`/${route}/questions/${id}`)
}

export const QuestionAnswer = {
   getAll,
   getOne,
   getByQuestion
}