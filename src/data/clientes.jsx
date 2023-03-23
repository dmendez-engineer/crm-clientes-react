export async function obtenerClientes(){
    const url="http://localhost:3000/clientes";
    
    //const respuesta= await fetch(import.meta.env.VITE_API_URL);
    const respuesta= await fetch("http://localhost:3000/clientes");
    const resultado= await respuesta.json();

   return resultado;
}
export async function consultarUnCliente(clienteId){
    const url="http://localhost:3000/clientes";

    const respuesta=await fetch(`${url}/${clienteId}`);
    const resultado= await respuesta.json();
    return resultado;
}
export async function editarCliente(id,cliente){
    const url="http://localhost:3000/clientes";
    try{
        const respuesta=await fetch(`${url}/${id}`,{
            method:'PUT',
            body:JSON.stringify(cliente),
            headers:{
                'Content-Type':'application/json'
            }
        });
        await respuesta.json();
    
    }catch(err){

    }
}
export async function agregarCliente(datos){
    console.log("Cliente a agregar:",datos);
    const url="http://localhost:3000/clientes";
    
    try{
        const respuesta=await fetch(url,{
            method:'POST',
            body:JSON.stringify(datos),
            headers:{
                'Content-Type':'application/json'
            }
        });
        await respuesta.json();
    }catch(error){

    }
}
export async function eliminarCliente(id){
    console.log(id);

    const url="http://localhost:3000/clientes";
    try{
        const respuesta=await fetch(`${url}/${id}`,{
            method:'DELETE'
        });
        await respuesta.json();
    }catch(error){
        
    }
}