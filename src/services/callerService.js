import axios from "axios"
import { Account } from "./accountService"
import config from "../config"

const Axios = axios.create({
    baseURL: config.serverUrl,
    headers: {
        'Access-Control-Allow-Origin': '*'
    }
})

// INTERCEPTOR OF TOKEN
Axios.interceptors.request.use(request => {
    if (Account.isLogged()) {
        const token = localStorage.getItem('lkiy-')
        request.headers.Authorization = 'Bearer ' + token
    }
    return request
})

export default Axios