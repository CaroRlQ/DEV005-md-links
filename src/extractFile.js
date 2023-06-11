import * as fs from 'node:fs';
import * as path from 'node:path';

/* -------------------------Funcion sincrónica para extraer archivos Md de carpetas -------------*/
const searchFiles = (findPath) => {
  const pathNormalize = path.normalize(path.join(findPath));
  const pathFound = [];
  if (!fs.existsSync(pathNormalize)) {
    throw new Error('La ruta insertada no existe');
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
const searchFilesMd = (findPathMd) => {
  const fileMd = searchFiles(findPathMd).filter((indexMd) => path.extname(indexMd) === '.md');
  return fileMd;
};
export default searchFilesMd;
