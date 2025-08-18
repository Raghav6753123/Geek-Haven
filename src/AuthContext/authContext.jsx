import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();
export const AuthProvider = ({ children }) => {

    const [authUser, setAuthuser] = useState(() => {
        try {
            const stored = localStorage.getItem("isValid");
            if (stored) {
                return true;
            }
            const authUserStored = localStorage.getItem("authuser");
            if (authUserStored === "true") return true;
            if (authUserStored === "false") return false;
        } catch (error) {
            return false;
        }
        return false;
    });

    useEffect(() => {
        // Keep the state in sync with localStorage
        localStorage.setItem("authuser", authUser ? "true" : "false");
    }, [authUser]);

    return (
        <AuthContext.Provider value={{ authUser, setAuthuser }}>
            {children}
        </AuthContext.Provider>
    )
}
export const useAuth = () => {
    return useContext(AuthContext);
}