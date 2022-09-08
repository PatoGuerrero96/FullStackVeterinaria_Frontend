import { useState } from "react"
import { Link } from "react-router-dom"
import Alerta from "../components/Alerta"
import axios from 'axios'

const Registrar = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repetirPassword, setRepetirPassword] = useState('')
  
  const[alerta, SetAlerta] = useState({})
  const handleSubmit = async e=>{
    e.preventDefault()

   if([nombre,email,password,repetirPassword].includes('')){
    SetAlerta({msg:'Hay campos vacios', error:true})
    return; //Para detener el codigo 
   }
   if(password !== repetirPassword){
    SetAlerta({msg:'Las contraseñas no coinciden ', error:true})

    return
   }
   if(password.length < 6){
    SetAlerta({msg:'La contraseña debe tener almenos 6 caracteres', error:true})

    return
   }

   SetAlerta({})
   //Crear el usuario en la api
   try {
    const url =`${import.meta.env.VITE_BACKEND_URL}/api/veterinarios`
    await axios.post(url, {nombre, email, password})
    SetAlerta({msg:'Usuario Creado correctamente , revisa tu Email para la validación'})
   } catch (error) {
    SetAlerta({
      msg: error.response.data.msg,
      error:true
    })
   }


  }
const { msg } =alerta
  return (
    <>
      <div>
       <h1 className="text-indigo-600 font-black text-5xl"> 
       Crea tu cuenta y Adminsitra tus 
       <span className="text-black text-5xl"> Pacientes</span> 
       </h1>
      </div>

    
    <div className="mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white">
    {//Si en el mensaje hay algo , muestra el componente de alerta
      msg &&<Alerta
      alerta={alerta}
      />
    }
 
    <form 
    onSubmit={handleSubmit}
    >

     <label className="uppercase text-gray-600 block text-xl font-bold py-2">
      Nombre
     </label>
     <input
     type="text" placeholder="Ingresa tu nombre"
     className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
     value={nombre}
     onChange={e => setNombre(e.target.value)}
     />

<label className="uppercase text-gray-600 block text-xl font-bold py-2">
      Email
     </label>
     <input
     type="email" placeholder="Email de registro"
     className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
     value={email}
     onChange={e => setEmail(e.target.value)}
     />

<label className="uppercase text-gray-600 block text-xl font-bold py-2">
      Contraseña
     </label>
     <input
     type="password" placeholder="Tu contraseña"
     className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
     value={password}
     onChange={e => setPassword(e.target.value)}
     />

<label className="uppercase text-gray-600 block text-xl font-bold py-2">
      Repite Contraseña
     </label>
     <input
     type="password" placeholder="Repite tu contraseña"
     className=" border w-full  p-3 mt-3 bg-gray-50 rounded-xl"
     value={repetirPassword}
     onChange={e => setRepetirPassword(e.target.value)}
     />

<input type="submit"  value="Registrarse" 
    className="bg-indigo-600  w-full py-3 px-10 rounded-xl text-white 
    uppercase font-bold mt-5 hover:cursor-pointer hover:bg-indigo-700 md:w-auto"/>

      </form>

      <nav className="mt-5 lg:flex lg:justify-between">
    <Link
    className="block text-center my-5 text-gray-500"
    to="/"
    >¿Ya tienes cuenta? Inicia Sesión</Link>
    <Link className="block text-center my-5 text-gray-500"
    to="/olvide-password">Olvide mi Contraseña</Link>
   </nav>

    </div>
   
    </>
  )
}

export default Registrar