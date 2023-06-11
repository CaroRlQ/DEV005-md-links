import * as fs from 'node:fs';
// eslint-disable-next-line import/extensions

const searchlinks = (pathfiles) => {
  const matchArray = [];
  const allFiles = pathfiles.map((indexFiles) => new Promise((resolve, reject) => {
    fs.readFile(indexFiles, 'utf8', (err, data) => {
      const exRegularLinksMd = /\[([^\\[]+)\](\(.*\))/gm;
      const filterLinks = data.match(exRegularLinksMd);
      if (err) {
        reject(err);
      }
      if (filterLinks !== null) {
        filterLinks.forEach((index) => {
          const singleMatch = /\[([^\\[]+)\]\((.*)\)/;
          const text = singleMatch.exec(index);
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
      const linksObject = [].concat(matchArray);
      return linksObject;
    });
};

export default searchlinks;
