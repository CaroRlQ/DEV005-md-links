"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var fs = _interopRequireWildcard(require("node:fs"));
var path = _interopRequireWildcard(require("node:path"));
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
/* -------------------------Funcion asincrónica para extraer archivos Md de carpetas -------------*/
const searchFiles = findPath => {
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
    fileNames.forEach(fileFind => {
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
const searchFilesMd = findPathMd => {
  const fileMd = searchFiles(findPathMd).filter(indexMd => path.extname(indexMd) === '.md');
  return fileMd;
};
var _default = searchFilesMd;
exports.default = _default;