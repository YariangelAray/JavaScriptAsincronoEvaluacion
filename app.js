// Importamos los módulos exportados del archivo barril para acceder a las funciones que necesitaremos
import { usersMod, commentMod, postsMod, albumsMod, tareasMod, fotosMod } from "./Modulos/index.js";

// Función para listar tareas pendientes por usuario.
const listarTareasUsuarios = async () => {
    try {
        const datosUsuarios = await usersMod.solicitarUsuarios(); // Se obtienen los usuarios

        return await Promise.all(datosUsuarios.map( async (usuario) => {
             // Para cada usuario, se buscan sus tareas pendientes
            const tareasPendientes = await tareasMod.solicitarTareasIdEstado(usuario.id, false);
            return {...usuario, tareasPendientes};
        }))    
    } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

// Función para listar los álbumes y fotos de un usuario ingresado por teclado.
const listarAlbumsUsuario = async () => {

    let username = prompt("Ingrese el username del usuario: "); // Se le solicita el username al usuario

    try {
        const datosUsuarios = await usersMod.solicitarUsuarioPorUsername(username);    

        if (datosUsuarios.length === 0) return `El usuario con el username ${username} no existe.`;
        const usuario = datosUsuarios[0];        
          // Se buscan los álbumes del usuario
        const albums = await albumsMod.solicitarAlbumsId(usuario.id);

        const datosAlbums = await Promise.all(albums.map(async (album) => {
            // Se obtienen las fotos de cada álbum
            const fotos = await fotosMod.solicitarFotosId(album.id);    
            return { ...album, fotos }
        }));

        return {...usuario, albums: datosAlbums};

    } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

// Función para filtrar posts según el título ingresado por el usuario.
const filtrarPosts = async () => {

    let titulo;
    do {
        titulo = prompt("Ingrese una palabra, una frase del titulo o el titulo completo del post que quiera buscar:");
        if (!titulo) alert("No ha ingresado ninguna frase.")
        else break;        
    } while (true);

    let regex = new RegExp(titulo, "i"); // Expresión regular para buscar coincidencias en el título

    try {
        const posts = await postsMod.solicitarPosts();    
    
        // Se filtran los posts según el título ingresado
        const postEncontrados = posts.filter((post) => regex.test(post.title));
    
        return await Promise.all(postEncontrados.map(async (post) => {
            //Se añaden los comentarios a cada post encontrado
            const comentarios = await commentMod.solicitarComentariosId(post.id);
            return { ...post, comentarios };
        }));

    } catch (error) {
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

// Función que obtiene solo el nombre y teléfono de cada usuario.
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

                // Se retorna un objeto con las propiedades del posts, agregando los comentarios del mismo
                return {...post, comentarios};
            }));

        // Se solicitan los álbumes del usuario
        const albumes = await albumsMod.solicitarAlbumsId(usuario.id);

        // Se recorre el arreglo de álbumes del usuario de manera asíncrona
        const datosAlbumes = await Promise.all(albumes.map(async (album) => {

            // Para cada álbum, se solicitan las fotos correspondientes
            const fotos = await fotosMod.solicitarFotosId(album.id);

            // Se retorna un objeto con las propiedades del álbum y una nueva con el arreglo de las fotos de ese album
            return {...album, fotos};
        }));

        // Se retorna un objeto que contiene la información del usuario, sus posts y álbumes
        return {...usuario,
            posts: datosPosts,
            albumes: datosAlbumes};        
        }));

    } catch (error) {
        // Si ocurre algún error durante el proceso, se lanza un error con el mensaje correspondiente 
        console.error("Ha ocurrido un error en las peticiones: " + error);
    }
}

// Función principal que ejecuta el programa y maneja el menú interactivo.

const ejecutarPrograma = async () => {
    while (true) {        
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

}

ejecutarPrograma();