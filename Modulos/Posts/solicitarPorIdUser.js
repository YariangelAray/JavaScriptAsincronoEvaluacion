import realizarPeticion from "../Helpers/realizarPeticion.js";
//Importamos la función realizarPeticion

//Función para solicitar todos los posts de un usuario, recibe como parametros el id del usuario
export const solicitarPostsId = async (isUser) => await realizarPeticion(`/posts?userId=${isUser}`);// Llamamos a la función que nos ayudará a realizar la petición, le enviamos como argumento el endpoint "posts" con el query params "idUser" para filtrar la busqueda de las fotos por id de usuario