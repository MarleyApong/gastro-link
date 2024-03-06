import axios from "axios"
import { Account } from "./accountService"

const Axios = axios.create({
    baseURL: 'https://deploy-api-customer.onrender.com',
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
    }
})

// INTERCEPTOR OF TOKEN
Axios.interceptors.request.use((request) => {
    if (Account.isLogged()) {
        const token = localStorage.getItem('lkiy-')
        request.headers.Authorization = 'Bearer ' + token
    }
    request.headers["Accept"] = 'application/json'
    request.headers["Content-Type"] = 'application/json'
    request.headers["Access-Control-Allow-Origin"] = '*'
    request.headers["Access-Control-Allow-Methods"] = '*'
    request.headers["Access-Control-Allow-Headers"] = '*'
    request.headers["Access-Control-Max-Age"] = 86400
    request.headers["Access-Control-Allow-Credentials"] = 'true'
    return request
})

Axios.interceptors.request.use((request) => {
    request.headers["Accept"] = 'application/json'
    request.headers["Content-Type"] = 'application/json'
    request.headers["Access-Control-Allow-Origin"] = '*'
    request.headers["Access-Control-Allow-Methods"] = '*'
    request.headers["Access-Control-Allow-Headers"] = '*'
    request.headers["Access-Control-Max-Age"] = 86400
    request.headers["Access-Control-Allow-Credentials"] = 'true'
    return request
})

export default Axios