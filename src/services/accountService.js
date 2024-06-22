import { jwtDecode } from "jwt-decode"

const isValidToken = (token) => {
    try {
        const decoded = jwtDecode(token)
        const currentTimestamp = Math.floor(Date.now() / 1000)
        if (decoded.exp && decoded.exp < currentTimestamp) {
            return { isValid: false, errorCode: "TOKEN_EXPIRED" }
        }
        return { isValid: true }
    } catch (err) {
        return { isValid: false, errorCode: "INVALID_TOKEN_FORMAT" }
    }
}

const saveToken = (token, id, role, env, status) => {
    sessionStorage.setItem('lkiy-', token)
    sessionStorage.setItem('id', id)
    sessionStorage.setItem('lero', role)
    sessionStorage.setItem('env', env)
    sessionStorage.setItem('status', status)
}

const logout = () => {
    sessionStorage.removeItem('lkiy-')
    sessionStorage.removeItem('id')
    sessionStorage.removeItem('status')
    sessionStorage.removeItem('env')
    sessionStorage.removeItem('lero')
}

const isLogged = () => {
    const token = sessionStorage.getItem('lkiy-')
    if (token) {
        const tokenValidity = isValidToken(token)
        if (tokenValidity.isValid) {
            return { isValid: true }
        } 
        else {
            return { isValid: false, errorCode: tokenValidity.errorCode }
        }
    }
    return { isValid: false, errorCode: "TOKEN_NOT_FOUND" }
}

const getToken = () => {
    const token = sessionStorage.getItem('lkiy-')
    return token
}

export const Account = {
    saveToken,
    logout,
    isLogged,
    getToken
}
