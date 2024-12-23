import { createContext, useContext } from "react";

const AuthContext=createContext('null')
const SetAuthContext=createContext('null');

const getAuthContext=()=>{
    return AuthContext;
}

const getSetAuthContext=()=>{
    return SetAuthContext;
}

const getAuth=()=>{
    return useContext(AuthContext)
}

const getSetAuth=()=>{
    return useContext(SetAuthContext)
}