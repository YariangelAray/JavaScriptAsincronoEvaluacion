// Importamos los módulos exportados del archivo barril para acceder a las funciones que necesitaremos
import { usersMod, commentMod, postsMod, albumsMod, tareasMod, fotosMod } from "./Modulos/index.js";

// -------------------- EJERCICIO 1 --------------------

// Función para listar tareas pendientes por usuario.
const listarTareasUsuarios = async () => {
    // Bloque Try...catch para manejo de errores
    try {
        // Se obtienen los usuarios
        const datosUsuarios = await usersMod.solicitarUsuarios(); 
        
        // Se usa Promise.all() para realizar múltiples peticiones en paralelo y mejorar la eficiencia.
        return await Promise.all(datosUsuarios.map( async (usuario) => {

             // Para cada usuario, se buscan sus tareas pendientes
            const tareasPendientes = await tareasMod.solicitarTareasIdEstado(usuario.id, false);

            // Se retorna un nuevo objeto con los datos del usuario y sus tareas pendientes
            return {...usuario, tareasPendientes};
        }))    
    } catch (error) {
        // Se captura y muestra cualquier error ocurrido durante la ejecución
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

// -------------------- EJERCICIO 2 --------------------

// Función para listar los álbumes y fotos de un usuario ingresando por teclado el username
const listarAlbumsUsuario = async () => {

    // Se le solicita el username al usuario
    let username = prompt("Ingrese el username del usuario: "); 

    // Bloque Try...catch para manejo de errores
    try {

        // Se obtienen los datos del usuario con el username ingresado
        const datosUsuarios = await usersMod.solicitarUsuarioPorUsername(username);    

        // Si el usuario no existe, se muestra un mensaje y se retorna la función
        if (datosUsuarios.length === 0) return `El usuario con el username ${username} no existe.`;

        // Se obtiene el primer (y único) usuario encontrado
        const usuario = datosUsuarios[0];

        // Se buscan los álbumes del usuario
        const albums = await albumsMod.solicitarAlbumsId(usuario.id);

        const datosAlbums = await Promise.all(albums.map(async (album) => {
            // Se obtienen las fotos de cada álbum
            const fotos = await fotosMod.solicitarFotosId(album.id);    
            // Se retorna un objeto con el álbum y sus fotos
            return { ...album, fotos } 
        }));

        // Se retorna un objeto con la información del usuario y sus álbumes
        return {...usuario, albums: datosAlbums}; 

    } catch (error) {
        // Se captura y muestra cualquier error
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

// -------------------- EJERCICIO 3 --------------------

// Función para filtrar posts según el título ingresado por el usuario.
const filtrarPosts = async () => {

    //Se inicializa la variable para poder hacer uso de ella fuera del ciclo do..while
    let titulo;
    do {
        // Se solicita al usuario ingresar una palabra o frase del título que desea buscar
        titulo = prompt("Ingrese una palabra, una frase del titulo o el titulo completo del post que quiera buscar:");
        // Se muestra un mensaje si el usuario no ingresa nada
        if (!titulo) alert("No ha ingresado ninguna frase.");
        // Si el usuario ingresó un título válido, se rompe el bucle
        else break;        
    } while (true);

    // Expresión regular para buscar coincidencias en el título
    let regex = new RegExp(titulo, "i"); 

    try {
        // Se obtienen todos los posts
        const posts = await postsMod.solicitarPosts();    
    
        // Se filtran los posts según el título ingresado
        const postEncontrados = posts.filter((post) => regex.test(post.title));
    
        return await Promise.all(postEncontrados.map(async (post) => {
            //Se añaden los comentarios a cada post encontrado
            const comentarios = await commentMod.solicitarComentariosId(post.id);
            // Se retorna un objeto con el post y sus comentarios
            return { ...post, comentarios };
        }));

    } catch (error) {
        // Se captura y muestra cualquier error
        console.error("Ha ocurrido un error en la petición: " + error);
    }
}

// -------------------- EJERCICIO 4 --------------------

// Función que obtiene solo el nombre y teléfono de cada usuario.
const listarUsuariosContacto = async () => {
    try {
        // Se obtienen los datos de los usuarios
        const datosUsuarios = await usersMod.solicitarUsuarios();

        // Se usa el método map() para crear un nuevo array con solo el nombre y teléfono de cada usuario
        return datosUsuarios.map((usuario) => {
            // Se retorna un nuevo objeto que solo contiene el nombre y el teléfono del usuario
            return {nombre: usuario.name, telefono: usuario.phone}
        });
      } catch (error) {
        // Se captura y muestra cualquier error
        console.error("Ha ocurrido un error en la petición: " + error);
      }
}

// -------------------- EJERCICIO 5 --------------------

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

// Función principal que ejecuta el programa y maneja el menú
const ejecutarPrograma = async () => {
    // Bucle infinito para mantener el menú activo hasta que el usuario decida salir
    while (true) {        
        // Se solicita al usuario que ingrese una opción
        let opcion = prompt("Ingrese el número del ejercicio a dar solución o ingrese cualquier otro caracter para salir: ");
        //Bloque try..catch para manejar errores que puedan surgir durante la ejecución de la función
        try {
            switch (opcion) {
                case "1":
                    console.log("Listado de tareas pendiente de cada usuario:")
                    console.log(await listarTareasUsuarios());
                    break;
                
                case "2":
                    console.log("Albums y fotos del usuario ingresado:")
                    console.log(await listarAlbumsUsuario());
                    break;
    
                case "3":
                    console.log("Posts filtrados con sus comentarios:")
                    console.log(await filtrarPosts());
                    break;
                case "4":
                    console.log("Usuarios con nombre y teléfono:")
                    console.log(await listarUsuariosContacto());
                    break;
                case "5":
                    console.log("Información completa de todos los usuarios (Posts>Comentarios - Albums>Fotos):")
                    console.log( await obtenerInformacion());
                    break;
                default:
                    // Mensaje de salida
                    alert("Terminando programa...");
                    // Finaliza la ejecución del programa
                    return;
            }                    
        } catch (error) {
            // Captura y muestra cualquier error inesperado
            console.error("Error en la ejecución del programa:" + error);
        }
    }
}
//Se ejecuta la función principal para iniciar el programa
ejecutarPrograma();