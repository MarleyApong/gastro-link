import axios from "axios";
import { account } from "./account";

const Axios  = axios.create ({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
})

// INTERCEPTOR OF TOKEN
Axios.interceptors.request.use(request => {
    if (account.isLogged()) {
        const token = JSON.parse(localStorage.getItem('lkiy-'))
        request.headers.Authorization = 'Bearer ' + token[0].token
        alert()
    }
    return request
})

export default Axios