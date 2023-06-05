import * as fs from 'node:fs';
import * as path from 'node:path';
import searchFilesMd from './extractFile.js';
/* ---------------------------------- Función para extraer links de archivos md ------------------*/
console.log('searchFilesMd', searchFilesMd);
const searchlinks = (pathfiles) => {
  const matchArray = [];

  const allFiles = pathfiles.map((indexFiles) => new Promise((resolve, reject) => {
    fs.readFile(indexFiles, 'utf8', (err, data) => {
      const exRegularLinksMd = /\[([^\\[]+)\](\(.*\))/gm;
      const filterLinks = data.match(exRegularLinksMd);
      //  console.log('filterLinks', filterLinks);
      if (err) {
        console.log(err);
        reject(err);
      }
      if (filterLinks !== null) {
        filterLinks.forEach((index) => {
          const singleMatch = /\[([^\\[]+)\]\((.*)\)/;
          const text = singleMatch.exec(index);
          // console.log('text', text);
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
searchlinks(searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta'))
  .then((resul) => {
    console.log(resul);
  })
  .catch((err) => console.log(err));

export default searchlinks;
