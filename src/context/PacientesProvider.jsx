import { createContext, useState, useEffect} from "react";
import axios from "axios";



const PacientesContext = createContext()

const PacientesProvider = ({children})=> {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})

    useEffect(()=>{
      const obtenerPacientes = async() =>{
        try {
          const token = localStorage.getItem('token')
          if(!token) return

          const config={
            headers:{
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
          }
          }
          const { data } = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes`,config)
          setPacientes(data)
        } catch (error) {
          console.log(error)
        }

      }
      obtenerPacientes()

    },[])

    const guardarPaciente =  async(paciente) =>{
      const token = localStorage.getItem('token')
      const config = {
        headers:{
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
      }
      if(paciente.id){
       try {
        const {data}= await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${paciente.id}`,paciente,config)
        
        const pacientesActualizados= pacientes.map( pacienteState => pacienteState._id===
          data._id ? data : pacienteState)
          setPacientes(pacientesActualizados)
       } catch (error) {
        console.log(error)
       }

      }else{
        try {
       
          const { data} = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes`,paciente,config)
          const{ createdAt, updatedAt, __v, ...pacienteAlmacenado} = data
          setPacientes ([pacienteAlmacenado, ...pacientes])
      
      } catch (error) {
        console.log(error.response.data.msg)
      }
      }
   
    }
    const setEdicion = (paciente) => {
      setPaciente(paciente)
    }

    const eliminarPaciente =  async id => {
      const confirmar = confirm('Deseas eliminar este registro?')

      if(confirmar){
        try{
          const token = localStorage.getItem('token')
          const config = {
            headers:{
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
          }
          const {data} = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/pacientes/${id}`,config)
          const pacientesActualizados = pacientes.filter(pacientesState => pacientesState._id !== id)
          setPacientes(pacientesActualizados)

        }catch(error){
             console.log(error)
        }
      }

    }

return(
<PacientesContext.Provider
value={{
pacientes,
guardarPaciente,
setEdicion,
paciente,
eliminarPaciente

}}
>
    {children}
</PacientesContext.Provider>
)

}

export {
    PacientesProvider
}

export default PacientesContext;