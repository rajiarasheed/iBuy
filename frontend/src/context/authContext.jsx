import { createContext, useContext, useState } from "react";
import { setToken } from "../utils/api";

const AuthContext=createContext();
export const AuthProvider=({children})=>{
    const [user,setUser]=useState(null);

    const login=(data)=>{
        setToken(data.token)
        setUser(data.user)
    }
    const logout=()=>{
        setToken(null);
        setUser(null)
    }
    return(
        <AuthContext.Provider value={{user,login,logout}}>{children}</AuthContext.Provider>
    )
}

export const useAuth=()=>useContext(AuthContext)