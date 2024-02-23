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
    localStorage.setItem('lkiy-', token)
    localStorage.setItem('id', id)
    localStorage.setItem('lero', role)
    localStorage.setItem('env', env)
    localStorage.setItem('status', status)
}

const logout = () => {
    localStorage.removeItem('lkiy-')
    localStorage.removeItem('id')
    localStorage.removeItem('status')
    localStorage.removeItem('env')
    localStorage.removeItem('lero')
}

const isLogged = () => {
    const token = localStorage.getItem('lkiy-')
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
    const token = localStorage.getItem('lkiy-')
    return token
}

export const Account = {
    saveToken,
    logout,
    isLogged,
    getToken
}
