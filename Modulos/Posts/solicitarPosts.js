import realizarPeticion from "../Helpers/realizarPeticion.js";
//Importamos la función realizarPeticion

//Función para solicitar todos los posts
export const solicitarPosts = async () => await realizarPeticion(`/posts`);// Llamamos a la función que nos ayudará a realizar la petición, le enviamos como argumento el endpoint "posts" que indicará que debe buscar todos los posts