"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fs = _interopRequireWildcard(require("node:fs"));
var path = _interopRequireWildcard(require("node:path"));
var _extractFile = _interopRequireDefault(require("./extractFile.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* ---------------------------------- Función para extraer links de archivos md ------------------*/
console.log('searchFilesMd', _extractFile.default);
const searchlinks = pathfiles => {
  const matchArray = [];
  const allFiles = pathfiles.map(indexFiles => new Promise((resolve, reject) => {
    fs.readFile(indexFiles, 'utf8', (err, data) => {
      const exRegularLinksMd = /\[([^\\[]+)\](\(.*\))/gm;
      const filterLinks = data.match(exRegularLinksMd);
      //  console.log('filterLinks', filterLinks);
      if (err) {
        console.log(err);
        reject(err);
      }
      if (filterLinks !== null) {
        filterLinks.forEach(index => {
          const singleMatch = /\[([^\\[]+)\]\((.*)\)/;
          const text = singleMatch.exec(index);
          // console.log('text', text);
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
searchlinks((0, _extractFile.default)('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta')).then(resul => {
  // console.log(resul);
}).catch(err => console.log(err));
var _default = searchlinks;
exports.default = _default;