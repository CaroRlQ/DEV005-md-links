"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
var _extractFile = _interopRequireDefault(require("./extractFile.js"));
var _extractLinks = _interopRequireDefault(require("./extractLinks.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/no-extraneous-dependencies */

// eslint-disable-next-line import/extensions

// import fetch from 'node-fetch';
/*
axios.get('http://cdalp.org.bo/encuentro-bi-nacional-de-arquitectos-bolivia-peru')
  .then((response) => {
    console.log('hola');
    console.log('response1111111', (typeof response));
  //  console.log('response', response.status);
  }); */
const validateLinks = validate => {
  const linksToValidate = validate.map(indexLink => {
    const linkToValidate = indexLink.href;
    return _axios.default.head(linkToValidate).then(response => {
      const pathOk = {
        status: response.status,
        validate: 'ok'
      };
      const pathValidate = Object.assign(indexLink, pathOk);
      // console.log('pathValidate', pathValidate);
      return pathValidate;
    }).catch(error => {
      // console.log('error', error.status);

      if (error.response && error.response.status !== undefined) {
        const pathFail = {
          status: error.response.status,
          validate: 'fail'
        };
        const pathInvalidate = Object.assign(indexLink, pathFail);
        // console.log('error', pathInvalidate);
        return pathInvalidate;
      }
      const pathFail = {
        status: 'unknown',
        validate: 'fail'
      };
      const pathInvalidate = Object.assign(indexLink, pathFail);
      // console.log('unknow', pathInvalidate);
      return pathInvalidate;
    });
  });
  return Promise.all(linksToValidate);
};

/* searchlinks(searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta\\soy una carpeta otra vez\\carpeta otra vez\\soy otra vez otro md - copia.md'))
  .then((resul) => {
    // console.log('resul', resul.length);
    validateLinks(resul)

      .then((ok) => {
        //  console.log('ok', ok);
      })
      .catch((error) => {
        //  console.log('fail', error);
      });
  })
  .catch((err) => console.log(err)); */
var _default = validateLinks;
exports.default = _default;