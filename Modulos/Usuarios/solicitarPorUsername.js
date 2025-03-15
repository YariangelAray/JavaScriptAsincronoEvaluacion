import realizarPeticion from "../Helpers/realizarPeticion.js"; //Importamos la función

//Función para solicitar un usuario según su username
export const solicitarUsuarioPorUsername = async (username) => {
    return await realizarPeticion(`/users?username=${username}`); // Llamamos a la función realizarPeticion que nos ayudará a realizar la solicitud, le enviamos como argumento el endpoint "users" con el query params "username" para filtrar la busqueda de los usuarios por username
}