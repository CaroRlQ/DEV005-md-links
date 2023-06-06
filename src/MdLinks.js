import searchFilesMd from './extractFile.js';
import searchlinks from './extractLinks.js';
import validateLinks from './validateLinks.js';

console.log('searchFilesMd', searchFilesMd);
console.log('searchlinks', searchlinks);
console.log('validateLinks', validateLinks);

const mdLinks = (pathRelative, option) => {
  const filesMd = searchFilesMd(pathRelative);
  // console.log('filesMd', filesMd);

  return searchlinks(filesMd)
    .then((resul) => {
      if (option) {
        // console.log('resul', resul); // devuelve un array de objeto
        return validateLinks(resul);
      }
      // console.log('resul', resul);
      return resul;
    })
    .catch((err) => {
      console.log('err', err);
    });

  // console.log('linksFile', linksFile);
};
const opcionPrueba = {
  validate: true,
};
const pathPrueba = 'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md - copia.md';
mdLinks(pathPrueba, opcionPrueba)
  .then((res) => {
    console.log(res);
  });
