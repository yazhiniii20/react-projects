import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(localStorage.getItem("token") || "");

    function login(jwtToken) {
        localStorage.setItem("token", jwtToken);
        setToken(jwtToken);
    }

    function logout() {
        localStorage.removeItem("token");
        setToken("");
    }

    return (
        <AuthContext.Provider value={{token,login,logout}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}