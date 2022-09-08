import { useState, useEffect, createContext } from "react";
import axios from "axios";

const AuthContext = createContext()

const AuthProvider = ({children})=>{
const [cargando, setCargando] = useState(true)
    const [auth, setAuth] = useState({})
 useEffect(()=>{
    const autenticarUsuario = async() =>{
        const token = localStorage.getItem('token')
        if(!token){
            setCargando(false)
            return

        } 

        const config ={

            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil`,config)
            setAuth(data)
        } catch (error) {
            console.log(error.response.data.msg)
            setAuth({})
        }

        setCargando(false)
    }
    autenticarUsuario()

 }, [])

const cerrarSesion = () =>{
    localStorage.removeItem('token')
    setAuth({})
}

const actualizarPerfil = async datos =>{

    const token = localStorage.getItem('token')
    if(!token){
        setCargando(false)
        return

    } 

    const config ={

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }

    try {
        const { data }= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/perfil/${datos._id}`,datos,config)
        console.log(data)
        return{
            msg: data.msg
        }
  
    } catch (error) {
        return{
            msg: error.response.data.msg,
            error:true
        }
    }
}

const guardarPassword = async (datos) => {

    const token = localStorage.getItem('token')
    if(!token){
        setCargando(false)
        return

    } 

    const config ={

        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        }
    }

    try {
        const { data }= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/actualizar-password`,datos,config)
        console.log(data)
        return{
            msg: data.msg
        }

    } catch (error) {
        return{
            msg: error.response.data.msg,
            error:true
        }
    }

}


    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth, 
            cargando,
            cerrarSesion,
            actualizarPerfil,
            guardarPassword
        }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export {
    AuthProvider
}

export default AuthContext