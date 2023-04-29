import React, { useState } from "react";

const AdminContext = React.createContext()

const AdminIsLoggedProvider = ({ children }) => {

    const [logged, setLogged] = useState()

    const adminIsLogged = () => {
        setLogged(true)
    }

    return(
        <AdminContext.Provider value={{ adminIsLogged, logged }}>
            {children}
        </AdminContext.Provider>
    )
}

export { AdminContext, AdminIsLoggedProvider }