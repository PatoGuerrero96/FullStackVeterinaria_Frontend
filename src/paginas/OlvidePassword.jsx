import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from "axios"

const OlvidePassword = () => {

  const [email,setEmail] = useState('')
  const [alerta, setAlerta]= useState({})
  const handleSubmit = async (e)=>{
    e.preventDefault();

    if(email ===''|| email.length < 5){
      setAlerta({msg:'El Email es obligatorio', error: true})
      return
    }

    try {
      const {data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios/olvide-password`,{email:email})
      console.log(data)
      setAlerta({msg: data.msg})
    } catch (error) {
      setAlerta({
        msg: error.response.data.msg,
        error:true
      })
    }

  }  
  const{msg} = alerta;  



  return (
    <>
    
      <div>
      <div>
       <h1 className="text-indigo-600 font-black text-5xl"> 
       Recupera tu Contraseña y administra tus
       <span className="text-black text-5xl"> Pacientes</span> 
       </h1>
      </div>
      </div>
      <div>
      <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
      {msg &&  <Alerta alerta={alerta}/>}    
    <form 
    onSubmit={handleSubmit}
    >

     <label className="uppercase text-gray-600 block text-xl font-bold py-2">
      Correo
     </label>
     <input
     type="email" placeholder="Ingresa tu Correo"
     className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
     value={email}
     onChange={e => setEmail(e.target.value)}
     />
     <input type="submit"  value="Recuperar Contraseña" 
    className="bg-indigo-600  w-full py-3 px-10 rounded-xl text-white 
    uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-700 md:w-auto"/>

      </form>
      
  <nav className="mt-5 lg:flex lg:justify-between">
    <Link
    className="block text-center my-5 text-gray-500"
    to="/"
    >¿Ya tienes cuenta? Inicia Sesión</Link>
    <Link className="block text-center my-5 text-gray-500"
    to="/registrar">¿No tienes una cuenta? Registrate</Link>
   </nav>

    
      </div>
      </div>

 
    </>
  )
}

export default OlvidePassword