// Importamos todo lo exportado por el modulo de Usuarios para hacer uso de ello en nuestro programa 
import * as usersMod from "./Modulos/Usuarios/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Tareas para hacer uso de ello en nuestro programa 
import * as tareasMod from "./Modulos/Tareas/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Albums para hacer uso de ello en nuestro programa 
import * as albumsMod from "./Modulos/Albums/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Fotos para hacer uso de ello en nuestro programa 
import * as fotosMod from "./Modulos/Fotos/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 


const usuariosTareas = async () => {
    try {
        const datosUsuarios = await usersMod.solicitarUsuarios();

        return await Promise.all(datosUsuarios.map( async (usuario) => {
            const tareasPendientes = await tareasMod.solicitarTareasIdEstado(usuario.id, false);
            return {...usuario, tareasPendientes};
        }))    
    } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

const usuarioAlbums = async () => {

    let username = prompt("Ingrese el username del usuario: ");

    try {
        const datosUsuarios = await usersMod.solicitarUsuarioPorUsername(username);    

        if (datosUsuarios.length === 0) return `El usuario con el username ${username} no existe.`;

        const usuario = datosUsuarios[0];
        
        const albums = await albumsMod.solicitarAlbumsId(usuario.id);

        const datosAlbums = await Promise.all(albums.map(async (album) => {

            const fotos = await fotosMod.solicitarFotosId(album.id);    
            return { ...album, fotos }
        }));

        return {...usuario, albums: datosAlbums};

    } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

const ejecutarPrograma = async () => {

    let opcion = prompt("Ingrese el número del ejercicio a dar solución o ingrese cualquier otro caracter para salir: ");
    try {
        switch (opcion) {
            case "1":
                console.log(await usuariosTareas());
                break;
            
            case "2":
                console.log(await usuarioAlbums());
                break;
    
            default:
                alert("Terminando programa...");
                return;
        }                    
    } catch (error) {
        console.error("Error en la ejecución del programa:" + error);
    }
}

ejecutarPrograma();