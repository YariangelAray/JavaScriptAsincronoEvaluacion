import realizarPeticion from "../Helpers/realizarPeticion.js";//Importamos la función

//Función para solicitar los comentarios de un post, recibe como parámetro el id del post
export const solicitarComentariosId = async (idPost) => await realizarPeticion(`/comments?postId=${idPost}`);// Llamamos a la función que nos ayudará a realizar la petición, le enviamos como argumento el endpoint "comments" con el query params "postId" para filtrar la busqueda de los comentarios por id de post

