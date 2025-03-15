import realizarPeticion from "../Helpers/realizarPeticion.js";//Importamos la función

//Función para solicitar las fotos de un album, recibe como parámetro el id del album
export const solicitarFotosId = async (idAlbum) => await realizarPeticion(`/photos?albumId=${idAlbum}`);// Llamamos a la función que nos ayudará a realizar la petición, le enviamos como argumento el endpoint "photos" con el query params "idAlbum" para filtrar la busqueda de las fotos por id de album

