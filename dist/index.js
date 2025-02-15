"use strict";

var fs = _interopRequireWildcard(require("node:fs"));
var path = _interopRequireWildcard(require("node:path"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
// Función para extraer archivos de carpetas y subcarpetas
function suma(a, b) {
  return new Promise((resolve, reject) => {
    const sumar = a + b;
    if (sumar < 10) {
      reject(new Error('La suma es menor a lo establecido'));
    } else {
      resolve(sumar);
    }
  });
}
suma(7, 5).then(result => console.log(result)).catch(error => console.log(error));

/* --------------------------Funcion sincrónica para extraer archivos Md de carpetas -------------*/
const searchFiles = findPath => {
  const pathNormalize = path.normalize(path.join(findPath));
  console.log('pathNormalize', pathNormalize);
  // const pathFound = [];
  // console.log('pathFound', pathFound);
  const pathFound = [];
  if (!fs.existsSync(pathNormalize)) {
    console.log('La ruta insertada no existe');
    return pathFound;
  }
  const statsPath = fs.statSync(pathNormalize);
  if (statsPath.isFile()) {
    pathFound.push(pathNormalize);
  } else if (statsPath.isDirectory()) {
    const fileNames = fs.readdirSync(pathNormalize);
    // console.log(fileNames);
    fileNames.forEach(fileFind => {
      const pathAbsolute = path.join(pathNormalize, fileFind);
      const statFileFind = fs.statSync(pathAbsolute);
      if (statFileFind.isFile()) {
        pathFound.push(pathAbsolute);
      } else {
        pathFound.push(...searchFiles(pathAbsolute));
      }
    });
  }
  return pathFound;
};
const searchFilesMd = arrayFile => {
  console.log('arrayFile', arrayFile);
  const fileMd = searchFiles(arrayFile).filter(indexMd => path.extname(indexMd) === '.md');
  return fileMd;
};

// console.log('resultado', searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez'));

/* ---------------------------------- Función para extraer links de archivos md ------------------*/

const searchlinks = pathfiles => {
  const matchArray = [];
  const allFiles = pathfiles.map(indexFiles => new Promise((resolve, reject) => {
    fs.readFile(indexFiles, 'utf8', (err, data) => {
      const exRegularLinksMd = /\[([^\\[]+)\](\(.*\))/gm;
      const filterLinks = data.match(exRegularLinksMd);
      // console.log('filterLinks', filterLinks);
      if (err) {
        // console.log(err);
        reject(err);
      }
      if (filterLinks !== null) {
        filterLinks.forEach(index => {
          const singleMatch = /\[([^\\[]+)\]\((.*)\)/;
          const text = singleMatch.exec(index);
          //  console.log('text', text);
          const matchLinks = {
            href: text[2],
            text: text[1],
            file: `${indexFiles}`
          };
          matchArray.push(matchLinks);
        });
      }
      resolve();
    });
  }));
  return Promise.all(allFiles).then(() => {
    //  console.log('res', res);
    const linksObject = [].concat(matchArray);
    return linksObject;
  });
};
searchlinks(searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md.md')).then(resul => {
  console.log('resul', resul);
}).catch(err => console.log(err));