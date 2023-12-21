const saveToken = (token) => {
    localStorage.setItem('lkiy-', token)
}

const logout = () => {
    localStorage.removeItem('lkiy-')
}

const isLogged = () => {
    const token = localStorage.getItem('lkiy-')
    return token
}

const getToken = () => {
    const token = JSON.parse(localStorage.getItem('lkiy-'))
    return token[0].token
}

export const account = {
    saveToken,
    logout,
    isLogged,
    getToken
}