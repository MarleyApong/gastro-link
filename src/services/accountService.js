import toast from "react-hot-toast"
import Access from "../utils/utilsAccess"

const saveToken = (token, id, role, env) => {
    localStorage.setItem('lkiy-', token)
    localStorage.setItem('id', id)
    localStorage.setItem('lero',
        role === 1
            ? 'zg450354b-2d9cv-4a42-904b-1700f57863d5'
            : role === 2
                ? 'zg450354b-2d9cv-4a42-904b-2700f57863d5'
                : role === 3
                    ? 'zg450354b-2d9cv-4a42-904b-3700f57863d5'
                    : ''
    )

    localStorage.setItem('env',
        env === 1
            ? 'fkc76rew4-sef590kmlkm-1drds4w323-tpfz6r6'
            : 'fkc76rew4-sef590kmlkm-2drds4w323-tpfz6r6'
    )

    localStorage.setItem('status', 'gt6m06768-rq0835gdgd-bvdf56-45rds4mbvpo')
}

let logoutAlreadyTriggered = false

const logout = (code) => {
    if (code === 300 && !logoutAlreadyTriggered) {
        logoutAlreadyTriggered = true
        toast.error("Déconnexion ! Les données de connexion ont été corrompues.")
    }

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