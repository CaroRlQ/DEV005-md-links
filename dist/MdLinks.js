"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var path = _interopRequireWildcard(require("node:path"));
var _extractFile = _interopRequireDefault(require("./extractFile.js"));
var _extractLinks = _interopRequireDefault(require("./extractLinks.js"));
var _validateLinks = _interopRequireDefault(require("./validateLinks.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* eslint-disable import/extensions */

const mdLinks = (pathInsert, option) => {
  const pathAbsolute = path.resolve(pathInsert);
  const filesMd = (0, _extractFile.default)(pathAbsolute);
  return (0, _extractLinks.default)(filesMd).then(resul => {
    if (option.validate && option.stats) {
      (0, _validateLinks.default)(resul).then(validResul => {
        const total = validResul.length;
        const unique = new Set(validResul.map(indexObject => indexObject.href)).size;
        const statusFail = [];
        validResul.forEach(validIndex => {
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
      return (0, _validateLinks.default)(resul);
    }
    if (option.stats) {
      const obj = {
        total: resul.length,
        unique: new Set(resul.map(indexObject => indexObject.href)).size
      };
      return obj;
    }
    return resul;
  }).catch(err => {
    console.log('err', err);
  });
};

// CLI
const argument02 = process.argv; // Ingreso de validate
const argument03 = argument02[2].trim();
const options = {
  validate: argument02.includes('--validate'),
  stats: argument02.includes('--stats')
};
mdLinks(argument03, options).then(res => {
  console.log(res);
}).catch(err => {
  console.log(err);
});
var _default = mdLinks;
exports.default = _default;