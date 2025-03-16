// Archivo barril que agrupa y exporta todos los módulos del proyecto
// Se usa "export * as nombreMod para importar todo el contenido de cada módulo como un objeto 
// para asi no tener que listar cada función por separado al importarlas en otros archivos.

export * as usersMod from "./Usuarios/index.js"; // Objeto que contiene todas las funciones del módulo de usuarios
export * as tareasMod from "./Tareas/index.js"; // Objeto que contiene todas las funciones del módulo de tareas
export * as albumsMod from "./Albums/index.js"; // Objeto que contiene todas las funciones del módulo de álbumes
export * as fotosMod from "./Fotos/index.js"; // Objeto que contiene todas las funciones del módulo de fotos
export * as postsMod from "./Posts/index.js"; // Objeto que contiene todas las funciones del módulo de publicaciones
export * as commentMod from "./Comentarios/index.js"; // Objeto que contiene todas las funciones del módulo de comentarios