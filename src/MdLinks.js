/* eslint-disable import/extensions */
import * as path from 'node:path';
import searchFilesMd from './extractFile.js';
import searchlinks from './extractLinks.js';
import validateLinks from './validateLinks.js';

const mdLinks = (pathInsert, option) => {
  const pathAbsolute = path.resolve(pathInsert);
  const filesMd = searchFilesMd(pathAbsolute);

  return searchlinks(filesMd)
    .then((resul) => {
      if (option.validate && option.stats) {
        validateLinks(resul)
          .then((validResul) => {
            const total = validResul.length;
            const unique = new Set(validResul.map((indexObject) => indexObject.href)).size;
            const statusFail = [];
            validResul.forEach((validIndex) => {
              if (validIndex.validate !== 'ok') {
                statusFail.push(validIndex.validate);
              }
            });

            console.log('total :', total);
            console.log('unique :', unique);
            console.log('broken :', statusFail.length);
          });
      }

      if (option.validate) {
        return validateLinks(resul);
      }
      if (option.stats) {
        const obj = {
          total: resul.length,
          unique: new Set(resul.map((indexObject) => indexObject.href)).size,
        };
        return obj;
      }
      return resul;
    })
    .catch((err) => {
      console.log('err', err);
    });
};

// CLI
const argument02 = process.argv; // Ingreso de validate
const argument03 = argument02[2].trim();

const options = {
  validate: argument02.includes('--validate'),
  stats: argument02.includes('--stats'),
};

mdLinks(argument03, options)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

export default mdLinks;
