import axios from "axios"
import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"
const ConfirmarCuenta = () => {
const [cuentaConfirmada, setCuentConfirmada] = useState(false)
const [cargando, setCargando] = useState(true)
const [alerta,setAlerta]= useState({})
  const params= useParams()
  const { id } = params

  useEffect(()=> {
    const  confirmarCuenta = async() =>{
      try {
        const url =`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/confirmar/${id}`
        const { data } = await axios.get(url)
        setCuentConfirmada(true)
        setAlerta({
          msg:data.msg,
        })
      } catch (error) {
        setAlerta({
          msg:error.response.data.msg,
          error:true

        })
      }
      setCargando(false)
    }
    confirmarCuenta();
  }, [])


  return (
    <>
     <div>
       <h1 className="text-indigo-600 font-black text-5xl"> 
       Confirma tu cuenta para empezar a Adminsitra tus 
       <span className="text-black text-5xl"> Pacientes</span> 
       </h1>
      </div>

    
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
   
   {!cargando &&  <Alerta alerta={alerta}/>}
 
   {cuentaConfirmada&&( <Link className="block text-center my-5 text-gray-500"
    to="/">Ya puedes iniciar sesión</Link>)}
  
  
    </div>
    </>
  )
}

export default ConfirmarCuenta