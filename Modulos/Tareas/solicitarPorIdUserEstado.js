import realizarPeticion from "../Helpers/realizarPeticion.js";//Importamos la función

//Función para solicitar las tareas pendientes de un usuario, recibe como parámetro el id del usuario y el estado de la tarea
export const solicitarTareasEstado = async (idUser, pendiente) => await realizarPeticion(`/todos?userId=${idUser}&completed=${pendiente}`); 
// Llamamos a la función realizarPeticion que nos ayudará a realizar la solicitud, le enviamos como argumento el endpoint "todos" con las query params "userId" y "completed" para filtrar la busqueda de las tareas pendientes del usuario indicado y solo mostrar las que esten pendientes (false)