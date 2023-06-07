"use strict";

var _extractFile = _interopRequireDefault(require("./extractFile.js"));
var _extractLinks = _interopRequireDefault(require("./extractLinks.js"));
var _validateLinks = _interopRequireDefault(require("./validateLinks.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
console.log('searchFilesMd', _extractFile.default);
console.log('searchlinks', _extractLinks.default);
console.log('validateLinks', _validateLinks.default);
const mdLinks = (pathRelative, option) => {
  const filesMd = (0, _extractFile.default)(pathRelative);
  // console.log('filesMd', filesMd);

  return (0, _extractLinks.default)(filesMd).then(resul => {
    if (option) {
      // console.log('resul', resul); // devuelve un array de objeto
      return (0, _validateLinks.default)(resul);
    }
    // console.log('resul', resul);
    return resul;
  }).catch(err => {
    console.log('err', err);
  });

  // console.log('linksFile', linksFile);
};

const opcionPrueba = {
  validate: true
};
const pathPrueba = 'C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta';
mdLinks(pathPrueba, opcionPrueba).then(res => {
  console.log(res);
});