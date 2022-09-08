import { Link } from "react-router-dom"

const AdminNav = () => {
  return (
    <nav className="m-10 flex gap-3 ">
        <Link to="/admin/perfil" className='font-bold uppercase text-gray-500' 
        >Perfil</Link>
        <Link to="/admin/cambiar-password" className='font-bold uppercase text-gray-500'
        >Cambiar Passoword</Link>

    </nav>
  )
}

export default AdminNav