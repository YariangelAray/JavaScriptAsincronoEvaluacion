import realizarPeticion from "../Helpers/realizarPeticion.js";
//Importamos la función realizarPeticion

//Función para solicitar los datos del usuarios
export const solicitarUsuarios = async () => {
    return await realizarPeticion(`/users`); // Llamamos a la función realizarPeticion que nos ayudará a realizar la solicitud, le enviamos como argumento el endpoint "users" que indicará que debe buscar todos los usuarios
}