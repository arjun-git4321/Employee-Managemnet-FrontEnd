import React, {createContext, useContext, useState} from "react";
import axios from 'axios';
// import {useNavigate} from 'react-router-dom'
import { useEffect } from "react";


const userContext=createContext()
const AuthContext=({children})=>{
    const [user,setUser]=useState(null)
    const [loading,setLoading]=useState(true)

    useEffect(()=>{
        const verify=async()=>{
            try{
                const token=localStorage.getItem("token")
                if(token){
                    const response=await axios.get("http://localhost:3000/api/v1/auth/verify",{
                        headers:{
                            "Authorization":`Bearer ${token}`
                        }
                    })
                    if(response.data.success){
                        setUser(response.data.user)
                    }
                }
                else{
                    setUser(null)
                    setLoading(false)
                }
                

            }
            catch(error){
                if(error.response && !error.response.data.error){
                    setUser(null)

                }

            }
            finally{
                setLoading(false)
            }
        }
        verify();
    },[])

    const login=(user)=>{
        setUser(user);
        setLoading(false)

    }
    const logout=()=>{
        setUser(null);
        setLoading(false)
        localStorage.removeItem("token");

    }

    return(
        <userContext.Provider value={{user,login,logout,loading}}>
            {children}

        </userContext.Provider>
    )
}

export const useAuth=()=>useContext(userContext)

export default AuthContext;