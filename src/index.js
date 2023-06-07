import * as fs from 'node:fs';
import * as path from 'node:path';

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

/* --------------------------Funcion sincrónica para extraer archivos Md de carpetas -------------*/
const searchFiles = (findPath) => {
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
    fileNames.forEach((fileFind) => {
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

const searchFilesMd = (arrayFile) => {
  console.log('arrayFile', arrayFile);
  const fileMd = searchFiles(arrayFile).filter((indexMd) => path.extname(indexMd) === '.md');

  return fileMd;
};

// console.log('resultado', searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez'));

/* ---------------------------------- Función para extraer links de archivos md ------------------*/

const searchlinks = (pathfiles) => {
  const matchArray = [];

  const allFiles = pathfiles.map((indexFiles) => new Promise((resolve, reject) => {
    fs.readFile(indexFiles, 'utf8', (err, data) => {
      const exRegularLinksMd = /\[([^\\[]+)\](\(.*\))/gm;
      const filterLinks = data.match(exRegularLinksMd);
     // console.log('filterLinks', filterLinks);
      if (err) {
       // console.log(err);
        reject(err);
      }
      if (filterLinks !== null) {
        filterLinks.forEach((index) => {
          const singleMatch = /\[([^\\[]+)\]\((.*)\)/;
          const text = singleMatch.exec(index);
        //  console.log('text', text);
          const matchLinks = {
            href: text[2],
            text: text[1],
            file: `${indexFiles}`,
          };
          matchArray.push(matchLinks);
        });
      }
      resolve();
    });
  }));
  return Promise.all(allFiles)
    .then(() => {
      //  console.log('res', res);
      const linksObject = [].concat(matchArray);
      return linksObject;
    });
};
searchlinks(searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md.md'))
  .then((resul) => {
    console.log('resul', resul);
  })
  .catch((err) => console.log(err));
