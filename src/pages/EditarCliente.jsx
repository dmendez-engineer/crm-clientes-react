import React from 'react'
import { useLoaderData,useNavigate,Form,useActionData, redirect} from 'react-router-dom'
import { consultarUnCliente,editarCliente } from '../data/clientes';
import Formulario from './Formulario';
import { Error } from '../components/Error';

export async function loader({params}){
    const cliente=await consultarUnCliente(params.clienteId);
    
    if(Object.values(cliente).length===0){
        throw new Response('',{
            status:404,
            statusText:'No hay resultados'
        });
    }

    return cliente;
}
export async function action({request,params}){
  let regex = new RegExp("([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\"\(\[\]!#-[^-~ \t]|(\\[\t -~]))+\")@([!#-'*+/-9=?A-Z^-~-]+(\.[!#-'*+/-9=?A-Z^-~-]+)*|\[[\t -Z^-~]*])");
  const formData=await request.formData();
  const datos= Object.fromEntries(formData);

  const email=formData.get('email');
  const errores=[];

  if(!regex.test(email)){
    errores.push("El email no es valido");
  }

  if(Object.values(datos).includes('')){
    errores.push("Todos los campos son obligatorios");
  }
  if(Object.keys(errores).length){
    return errores;
  }

  await editarCliente(params.clienteId,datos);
  return redirect('/');
}
function EditarCliente() {
  
  const clienteEditar=useLoaderData();
   const errores=useActionData();
    const navigate=useNavigate();
    return (
    
      <div>
      <h1 className='font-black text-4xl text-blue-900'>Editar Cliente</h1>
      <p className='mt-3'>Podrás modificar los datos de un cliente</p>
    
      <div className='flex justify-end'>
        <button
        className='bg-blue-800 text-white px-3 py-1 uppercase font-bold'
        onClick={()=>navigate(-1)}
        >
        Volver
        </button>
      </div>

      <div className='bg-white shadow rounded-md md:w-3/4 mx-auto px-5 py-10 mt-20'>
          {errores?.length && errores.map((error,i)=> <Error key={i}>{error}</Error> )}
          <Form 
            method='post'
          >
            <Formulario 
            cliente={clienteEditar}
            />
              
              <input type="submit" 
              className='mt-5 w-full bg-blue-800 p-3 uppercase font-bold text-white text-lg'
              value="Editar Cliente"
              />
          </Form>
          
      </div>

    </div>

  )
}

export default EditarCliente