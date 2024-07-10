import { jwtDecode } from "jwt-decode"
import { KEY_TOKEN, KEY_USER_ENV, KEY_USER_ID, KEY_USER_ROLE, KEY_USER_STATUS } from "../constants"
import { cryptoData } from "../utils"
// import { decryptData, encryptData } from "../utils"

const isValidToken = () => {
    const token = sessionStorage.getItem(KEY_TOKEN)
    try {
        const decoded = jwtDecode(cryptoData.decryptData(token))
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
    sessionStorage.setItem(KEY_TOKEN, cryptoData.encryptData(token))
    sessionStorage.setItem(KEY_USER_ID, cryptoData.encryptData(id))
    sessionStorage.setItem(KEY_USER_ROLE, cryptoData.encryptData(role))
    sessionStorage.setItem(KEY_USER_ENV, cryptoData.encryptData(env))
    sessionStorage.setItem(KEY_USER_STATUS, cryptoData.encryptData(status))
}

const logout = () => {
    sessionStorage.removeItem(KEY_TOKEN)
    sessionStorage.removeItem(KEY_USER_ID)
    sessionStorage.removeItem(KEY_USER_ROLE)
    sessionStorage.removeItem(KEY_USER_ENV)
    sessionStorage.removeItem(KEY_USER_STATUS)
}

const isLogged = () => {
    const token = sessionStorage.getItem(KEY_TOKEN)
    if (token) {
        const tokenValidity = isValidToken(cryptoData.decryptData(token))
        if (tokenValidity.isValid) {
            return { isValid: true }
        }
        else {
            return { isValid: false, errorCode: tokenValidity.errorCode }
        }
    }
    return { isValid: false, errorCode: "TOKEN_NOT_FOUND" }
}

const getUserToken = () => {
    const token = sessionStorage.getItem(KEY_TOKEN)
    return token ? cryptoData.decryptData(token) : null
}

const getUserRole = () => {
    const role = sessionStorage.getItem(KEY_USER_ROLE)
    return role ? cryptoData.decryptData(role) : null
}

const getUserEnv = () => {
    const env = sessionStorage.getItem(KEY_USER_ENV)
    return env ? cryptoData.decryptData(env) : null
}

const getUserStatus = () => {
    const status = sessionStorage.getItem(KEY_USER_STATUS)
    return status ? cryptoData.decryptData(status) : null
}

const getUserId = () => {
    const userId = sessionStorage.getItem(KEY_USER_ID)
    return userId ? cryptoData.decryptData(userId) : null
}
export const Account = {
    saveToken,
    logout,
    isLogged,
    getUserToken,
    getUserRole,
    getUserEnv,
    getUserStatus,
    getUserId
}
