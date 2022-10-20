const { createContext, useState } = require("react");


export const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(window.localStorage.getItem('token'))
    const [loggedIn, setLoggedIn] = useState(!!token)
    const [admin, setAdmin] = useState({})
    const login = (token) => {
        setToken(token)
        setLoggedIn(true)
        localStorage.setItem('token', token)
    }
    const logout = () => {
        setToken(null)
        setLoggedIn(false)
        localStorage.removeItem('token')
    }
    return (
        <AuthContext.Provider value={{
            token,
            loggedIn,
            login,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}