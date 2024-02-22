import Access from "../utils/utilsAccess"

const saveToken = (token, id, role, env, status) => {
    localStorage.setItem('lkiy-', token)
    localStorage.setItem('id', id)
    localStorage.setItem('lero', role)
    localStorage.setItem('env', env)
    localStorage.setItem('status', status)
}

let logoutAlreadyTriggered = false

const logout = (code) => {
    // if (code === 300 && !logoutAlreadyTriggered) {
    //     logoutAlreadyTriggered = true
    //     toast.error("Déconnexion ! Les données de connexion ont été corrompues.")
    // }
    localStorage.removeItem('lkiy-')
    localStorage.removeItem('id')
    localStorage.removeItem('status')
    localStorage.removeItem('env')
    localStorage.removeItem('lero')
}

const isLogged = () => {
    const access = Access
    const token = localStorage.getItem('lkiy-')
    if (access !== 0 && token) {
        return token
    }
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