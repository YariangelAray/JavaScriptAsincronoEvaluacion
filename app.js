// Importamos todo lo exportado por el modulo de Usuarios para hacer uso de ello en nuestro programa 
import * as usersMod from "./Modulos/Usuarios/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Tareas para hacer uso de ello en nuestro programa 
import * as tareasMod from "./Modulos/Tareas/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Albums para hacer uso de ello en nuestro programa 
import * as albumsMod from "./Modulos/Albums/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Fotos para hacer uso de ello en nuestro programa 
import * as fotosMod from "./Modulos/Fotos/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Posts para hacer uso de ello en nuestro programa 
import * as postsMod from "./Modulos/Posts/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 
// Importamos todo lo exportado por el modulo de Comentarios para hacer uso de ello en nuestro programa 
import * as commentMod from "./Modulos/Comentarios/index.js"; //Se importa todo como un objeto y asi no tenemos que listar una por una las funciones 

const listarTareasUsuarios = async () => {
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

const listarAlbumsUsuario = async () => {

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

const filtrarPosts = async () => {

    let titulo;
    do {
        titulo = prompt("Ingrese una palabra, una frase del titulo o el titulo completo del post que quiera buscar:");
        if (!titulo) alert("No ha ingresado ninguna frase.")
        else break;        
    } while (true);

    let regex = new RegExp(titulo);

    try {
        const posts = await postsMod.solicitarPosts();    
    
        const postEncontrados = posts.filter((post) => regex.test(post.title));
    
        return await Promise.all(postEncontrados.map(async (post) => {
            const comentarios = await commentMod.solicitarComentariosId(post.id);
            return { ...post, comentarios };
        }));

    } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

const listarUsuariosContacto = async () => {
    try {
        const datosUsuarios = await usersMod.solicitarUsuarios();

        return datosUsuarios.map((usuario) => {
          return {nombre: usuario.name, telefono: usuario.phone}
        });
      } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
      }
}

// Función para obtener toda la información solicitada
export const obtenerInformacion = async () => {
    //Bloque try..catch para manejar errores que puedan surgir durante las peticiones
    try {
        //Solicitamos los datos de los usuarios
        const usuarios = await usersMod.solicitarUsuarios();

        // Se recorre el arreglo de usuarios con el método map, en donde cada elemento es procesado de manera asíncrona
        return await Promise.all( usuarios.map( async (usuario) => { //Se utiliza Promise.all para esperar a que todas las promesas retornadas por la función map se cumplan.
            
            // Para cada usuario, se solicitan los posts de dicho usuario
            const posts = await postsMod.solicitarPostsId(usuario.id);

            // Se recorre el arreglo de posts de cada usuario, nuevamente usando 'map' de forma asíncrona
            const datosPosts = await Promise.all( posts.map ( async (post) => {

                // Para cada post, se solicitan los comentarios correspondientes a dicho post
                const comentarios = await commentMod.solicitarComentariosId(post.id);

                // Se retorna un objeto con las propiedades que indiquemos, que incluye el título, contenido del post y los comentarios correspondientes (con su nombre y contenido)
                return {
                titulo: post.title,
                contenido: post.body,
                comentarios: comentarios.map((comentario) => (
                    {nombre: comentario.name,
                    comentario: comentario.body}))};
            }));

        // Se solicitan los álbumes del usuario
        const albumes = await albumsMod.solicitarAlbumsId(usuario.id);

        // Se recorre el arreglo de álbumes del usuario de manera asíncrona
        const datosAlbumes = await Promise.all(albumes.map(async (album) => {

            // Para cada álbum, se solicitan las fotos correspondientes
            const fotos = await fotosMod.solicitarFotosId(album.id);

            // Se retorna un objeto con el título del álbum y un arreglo de las fotos con sus datos
            return {
            titulo: album.title,
            fotos: fotos.map((foto) => (
                {titulo: foto.title,
                url: foto.url,
                urlMiniatura: foto.thumbnailUrl}))};
        }));

        // Se retorna un objeto que contiene la información del usuario, sus posts y álbumes
        return {
            id: usuario.id,
            nombre: usuario.name,
            posts: datosPosts,
            albumes: datosAlbumes};        
        }));

    } catch (error) {
        // Si ocurre algún error durante el proceso, se lanza un error con el mensaje correspondiente 
        console.error("Ha ocurrido un error en las peticiones: " + error);
    }
}

const ejecutarPrograma = async () => {

    let opcion = prompt("Ingrese el número del ejercicio a dar solución o ingrese cualquier otro caracter para salir: ");
    try {
        switch (opcion) {
            case "1":
                console.log(await listarTareasUsuarios());
                break;
            
            case "2":
                console.log(await listarAlbumsUsuario());
                break;

            case "3":
                console.log(await filtrarPosts());
                break;
            case "4":
                console.log(await listarUsuariosContacto());
                break;
            case "5":
                console.log( await obtenerInformacion());
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