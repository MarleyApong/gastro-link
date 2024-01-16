import Axios from "./callerService"

const route = 'averages'

const averageQuestion = (id) => {
   return Axios.get(`/${route}/questions/${id}`)
}
const averageSurvey = (id) => {
   return Axios.get(`/${route}/surveys/${id}`)
}
const averageCompany = (id) => {
   return Axios.get(`/${route}/companies/${id}`)
}

export const Average = {
   averageQuestion,
   averageSurvey,
   averageCompany
}