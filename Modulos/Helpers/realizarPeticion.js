//Constante en la cual se almacena la url de la api a la cual se harán las solicitudes
const urlAPI = "https://jsonplaceholder.typicode.com";

// Función asíncrona para realizar peticiones, recibe como parámetro el endpoint que se concatena a la url de la api para realizar la solicitud
const realizarPeticion = async (endpoint) => {
    let respuesta = await fetch(`${urlAPI}${endpoint}`); // Se realiza la solicitud utilizando la API fetch, que devuelve una promesa en respuesta a la petición
    return await respuesta.json(); // Retorna la respuesta de la petición convertida en formato JSON para poder trabajar con los datos como objetos JavaScript
}

export default realizarPeticion; //Se exporta la función por defecto, para poder trabajar con ella como valor predeterminado al importarla en otros modulos