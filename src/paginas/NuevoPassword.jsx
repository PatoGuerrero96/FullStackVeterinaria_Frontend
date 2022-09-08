import axios from "axios"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Alerta from "../components/Alerta"

const NuevoPassword = () => {
  const [password, setPassword] = useState('')
  const [alerta, setAlerta] = useState({})
  const [tokenValido, setTokenValido] = useState(false);
  const [passwordModificado, setPasswordModificado] = useState(false)

  const params = useParams()
  const { token } = params
  useEffect(()=>{
    const comprobarToken = async ()=>{

      try {
        await axios(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password/${token}`)
        setAlerta({
          msg:'Coloca tu nuevo password'
        })
        setTokenValido(true)
      } catch (error) {
        setAlerta({msg:'Error con el enlace',
          error:true})
      }


    }
    comprobarToken()

  }, [])

  const handleSubmit = async(e)=>{
    e.preventDefault()

    if(password.length<6 ){
      setAlerta({
        msg:'El Password debe tener mínimo 6 caracteres',
        error: true
      })
      return
    }

    try {
      const url =`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password/${token}`
      const  { data } = await axios.post(url,{password})
      setAlerta({
        msg:data.msg
      })

      setPasswordModificado(true)
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }
  }
   

const {msg} = alerta
  return (
    <>
    <div>
    <h1 className="text-indigo-600 font-black text-5xl"> 
    Recupera tu contraseña y administra tus
    <span className="text-black text-5xl"> Pacientes</span> 
    </h1>
   </div>
   <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
    {//Si en el mensaje hay algo , muestra el componente de alerta
      msg &&<Alerta
      alerta={alerta}
      />
    }

    { tokenValido && ( 
    <form onSubmit={handleSubmit} >
      
      <div className="my-5">
      <label className="uppercase text-gray-600 block text-xl font-bold py-2">
      Nueva contraseña
     </label>
     <input
     type="password" placeholder="Tu nueva contraseña"
     className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
     value={password}
     onChange={e => setPassword(e.target.value)}
     />
      </div>
      <input type="submit"  value="Cambiar contraseña" 
    className="bg-indigo-600  w-full py-3 px-10 rounded-xl text-white 
    uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-700 md:w-auto"/>

    </form>
     )}

     {passwordModificado && 
     <nav>

     <Link
     className="block text-center my-5 text-gray-500"
     to="/"
     >¿Ya tienes cuenta? Inicia Sesión</Link>
     </nav>
     }

   
   
  </div>

   </>
  )
}

export default NuevoPassword