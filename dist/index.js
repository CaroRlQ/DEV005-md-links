"use strict";

var fs = _interopRequireWildcard(require("node:fs"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
module.exports = () => {
  console.log('probando', fs);
};

// Leer ruta

// Verificar si es un archivo o carpeta
// Si es una carpeta, ingresar y buscar archivos y extraerlos en una carpeta.
// Si se encuentra varios archivos y subcarpetas, ingresar los archivos en una variable "fileFind".
// Luego, se procedará a ingresar a las subcarpetas encontradas y se realizará la misma operación.
// Se guardará los archivos con su ruta absoluta.
// Si es un archivo, iniciar a leer y extraer los archivos Markdown
//