// Importamos todo lo exportado por el modulo de Usuarios para hacer uso de ello en nuestro programa 
import * as users from "./Modulos/Usuarios/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Tareas para hacer uso de ello en nuestro programa 
import * as tareas from "./Modulos/Tareas/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 

const tareasUsuarios = async () => {
    try {
        const datosUsuarios = await users.solicitarUsuarios();

        return await Promise.all(datosUsuarios.map( async (usuario) => {
            const tareasPendientes = await tareas.solicitarTareasEstado(usuario.id, false);
            return {...usuario, tareasPendientes};
        }))    
    } catch (error) {
        console.error("Ha ocurrido un error en la petición: ", error);
    }
}

const ejecutarPrograma = async () => {
    while (true) {

        let opcion = prompt("Ingrese el número del ejercicio a dar solución o ingrese cualquier otro caracter para salir: ");
        try {
            switch (opcion) {
                case "1":
                    console.log(await tareasUsuarios());
                    break;
                
                case "2":
                    break;
        
                default:
                    alert("Terminando programa...");
                    return;
            }                    
        } catch (error) {
            console.error("Error en la ejecución del programa:", error);
        }
    }
}

ejecutarPrograma();