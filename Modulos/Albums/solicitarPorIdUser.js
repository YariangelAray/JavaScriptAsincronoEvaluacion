import realizarPeticion from "../Helpers/realizarPeticion.js";//Importamos la función

//Función para solicitar los albumes de un usuario, recibe como parámetro el id del usuario
export const solicitarAlbumsId = async (idUser) => await realizarPeticion(`/albums?userId=${idUser}`);// Llamamos a la función que nos ayudará a realizar la petición, le enviamos como argumento el endpoint "albums" con el query params "userId" para filtrar la busqueda de los albums por id de usuario

