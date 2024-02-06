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

const averageMinMax = () => {
   return Axios.get(`/${route}/companies/min-max`)
}

const averageMinMaxSurvey = (id) => {
   return Axios.get(`/${route}/surveys/min-max/users/${id}`)
}

export const Average = {
   averageQuestion,
   averageSurvey,
   averageCompany,
   averageMinMax,
   averageMinMaxSurvey
}