import { promises } from 'node:dns';
import * as fs from 'node:fs';
import * as path from 'node:path';
/* module.exports = () => {

}; */
// eslint-disable-next-line no-useless-escape
// console.log('probando', path.resolve('C:\Users\ASUS\DesktopsoyUnaCarpeta'));

// Leer ruta
/* fs.stat('soy un word.docx', (error, stats) => {
  if (error) {
    console.log(error);
  } else {
    console.log('path is file:', stats.isFile());
    console.log('path is directory:', stats.isDirectory());
  }
}); */
/*
function searchFiles(urlPath) {
  // const pathToAbsolute = path.resolve(urlPath);
  // console.log('probando1', pathToAbsolute);
  const pathNormalize = path.normalize(path.join(urlPath));
  // console.log('probando1', pathNormalize);
  const filesFound = [];

  if (!fs.existsSync(pathNormalize)) {
    console.log(`La ruta ${pathNormalize} no existe.`);
    return filesFound;
  }
  const stats = fs.statSync(pathNormalize);
  if (stats.isFile()) { // Es un archivo
    filesFound.push(pathNormalize);
    return filesFound;
  } // Es un directorio
  const directory = fs.readdirSync(pathNormalize);
  directory.forEach((file) => {
    const pathAbsolute = path.join(pathNormalize, file);
    const fileStats = fs.statSync(pathAbsolute);
    if (fileStats.isFile()) {
      filesFound.push(fileStats);
    } else {
      const filesFoundAnother = searchFiles(urlPath);
      filesFound.push(...filesFoundAnother);
    }
  });

  return filesFound;
}
// eslint-disable-next-line no-useless-escape
const probando = 'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta';

const probando1 = searchFiles(probando);
probando1.forEach((index) => console.log(index)); */

// const probando2 = 'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy un word.docx';
// console.log('hola', fs.readFileSync(probando2, 'utf8'));
// Verificar si es un archivo o carpeta
// Si es una carpeta, ingresar y buscar archivos y extraerlos en un array.
// Si se encuentra varios archivos y subcarpetas, ingresar los archivos en una variable "fileFind".
// Luego, se procedará a ingresar a las subcarpetas encontradas y se realizará la misma operación.
// Se guardará los archivos con su ruta absoluta.
// Si es un archivo, iniciar a leer y extraer los archivos Markdown
//
/* const rutaPrueba = 'C:\Users\ASUS\Desktop\MANZANAS IMPRIMIR';

const rutaConvertida = rutaPrueba.replace(/\//g, '\\');
console.log(rutaConvertida);
const rutaProcesada = path.normalize(path.join(rutaConvertida));
console.log(rutaProcesada); */
console.log('hola');

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
suma(7, 5)
  .then((result) => console.log(result))

  .catch((error) => console.log(error));

/* const searchFiles = (findPath) => new Promise((resolve, reject) => {
  const pathNormalize = path.normalize(path.join(findPath));
  const pathFound = [];
  if (!fs.existsSync(pathNormalize)) {
    reject(new Error('La ruta no existe'));
    return;
  }
  fs.stat(pathNormalize, (error, stats) => {
    if (error) {
      reject(error);
    }
    if (stats.isFile()) {
      pathFound.push(pathNormalize);
    } else {
      // Leer todo el directorio
      fs.readdir(pathNormalize, (err, allfiles) => {
        if (err) {
          reject(err);
          return;
        }
        const promisesToDirectory = allfiles.map((fileFind) => {
          console.log(fileFind);
          const pathAbsolute = path.join(pathNormalize, fileFind);
          return new Promise((resolveFile) => {
            fs.stat(pathAbsolute, (e, sta) => {
              if (e) {
                reject(e);
                return;
              }
              if (sta.isFile()) {
                pathFound.push(pathAbsolute);
                resolveFile(pathAbsolute);
                console.log('resolvefile', resolveFile(pathAbsolute));
              } else {
                searchFiles(pathAbsolute)
                  .then((resultDirectory) => {
                    pathFound.push(...resultDirectory);
                    resolveFile(resultDirectory);
                  })
                  .catch(reject);
              }
            });
          });
        });
        Promise.all(promisesToDirectory)
          .then(() => resolve(pathFound))
          .catch(reject);
      });
    }
  });
}); */

/* searchFiles('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta')
  .then((result) => {
    console.log(result);
    console.log(result.length);
    const filesMd = result.filter((index) => path.extname(index) === '.md');
    console.log(filesMd);
    return filesMd;
  })
  .catch((e) => console.log('probando', e));
*/
/* ------------------------------Función para extraer links -------------------------*/

const rutaPrueba = 'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md.md';
const pruebaArray = [['C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md.md'],
  ['C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md1 - copia.md']];
const searchlinks = (pathfiles) => new Promise((res, rej) => {
  const matchArray = [];
  const allLinks = pathfiles.map((indexFiles) => new Promise((resolve, reject) => {
    console.log('indexFiles', indexFiles);

    fs.readFile(indexFiles[0], 'utf8', (er, data) => {
      const exRegularLinksMd = /\[([^\\[]+)\](\(.*\))/gm;
      const filterLinks = data.match(exRegularLinksMd);
      console.log('filterLinks', filterLinks);
      if (er) {
        reject(er);
      }
      if (filterLinks === null) {
        console.log(`No se han encontrado Links en ${indexFiles} `);
      }
      filterLinks.forEach((index) => {
        const singleMatch = /\[([^\\[]+)\]\((.*)\)/;
        const text = singleMatch.exec(index);
        const matchLinks = {
          href: text[2],
          text: text[1],
          file: `${indexFiles}`,
        };

        matchArray.push(matchLinks);
        resolve(matchArray);
      });
    });
  }));

  /* matchArray.forEach((index) => { arrayUnido = arrayUnido.concat(index); });
  console.log('arrayUnido', arrayUnido); */

  Promise.all(allLinks)
    .then((resu) => {
      const arrayJoin = [].concat(...resu);
      console.log(arrayJoin);
      res(arrayJoin);
    })
    .catch((err) => console.log(err));

});
console.log('pro', searchlinks(pruebaArray));
/* const filesMd = (pathFile) => {
  const filesMdFind = [];
  console.log('md', filesMdFind[0]);
  fs.readdir(pathFile, (e, files) => {
    files.forEach((index) => {
      if (path.extname(index) === '.md') {
        filesMdFind.push(index);
      } else {
        console.log('no se ha encontrado nada');
      }
    });
  });
  return filesMdFind;
};
console.log(filesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta')); */
/* const searchFiles = (findPath) => new Promise((resolve, reject) => {
  const pathNormalize = path.normalize(path.join(findPath));
  const pathFound = [];
  if (!fs.existsSync(pathNormalize)) {
    reject(new Error('La ruta no existe'));
    return;
  }
  fs.stat(pathNormalize, (error, stats) => {
    if (error) {
      reject(error);
    }
    if (stats.isFile()) {
      pathFound.push(pathNormalize);
    } else {
      // Leer todo el directorio
      fs.readdir(pathNormalize, (err, allfiles) => {
        let counter = allfiles.length;
        if (err) {
          reject(err);
          return;
        }
        allfiles.forEach((fileFind) => {
          const pathAbsolute = path.join(pathNormalize, fileFind);
          if (fs.stat(pathAbsolute, (er, stats1) => {
            if (er) {
              reject(er);
              return;
            }
            // Si es un archivo, se enviará en la carpeta fileFound
            if (stats1.isFile()) {
              pathFound.push(pathAbsolute);
              counter -= 1;
              if (counter === 0) {
                resolve(pathFound);
              }
            } else { // Es un directorio
              searchFiles(pathAbsolute)
                .then((result) => {
                  pathFound.push(...result);
                  counter -= 1;
                  if (counter === 0) {
                    resolve(pathFound);
                  }
                })
                .catch(reject);
            }
          }));
        });
      });
    }
  });
});

searchFiles('D:\\0 LABORATORIA')
  .then((result) => console.log(result))

  .catch((e) => console.log('probando', e)); */
