import axios from "axios";
import { account } from "./account";

const Axios  = axios.create ({
    baseURL: 'http://localhost:8000',
    withCredentials: false,
})

// INTERCEPTOR OF TOKEN
Axios.interceptors.request.use(request => {
    if (account.isLogged()) {
        const token = localStorage.getItem('lkiy-')
        request.headers.Authorization = 'Bearer ' + token
    }
    return request
})

export default Axios