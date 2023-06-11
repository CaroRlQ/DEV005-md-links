"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _axios = _interopRequireDefault(require("axios"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
/* eslint-disable import/no-extraneous-dependencies */

// eslint-disable-next-line import/extensions

const validateLinks = validate => {
  const linksToValidate = validate.map(indexLink => {
    const linkToValidate = indexLink.href;
    return _axios.default.head(linkToValidate).then(response => {
      const pathOk = {
        status: response.status,
        validate: 'ok'
      };
      const pathValidate = Object.assign(indexLink, pathOk);
      return pathValidate;
    }).catch(error => {
      //  console.log('error', error.status);

      if (error.response && error.response.status !== undefined) {
        const pathFail = {
          status: error.response.status,
          validate: 'fail'
        };
        const pathInvalidate = Object.assign(indexLink, pathFail);
        return pathInvalidate;
      }
      const pathFail = {
        status: 'unknown',
        validate: 'fail'
      };
      const pathInvalidate = Object.assign(indexLink, pathFail);
      return pathInvalidate;
    });
  });
  return Promise.all(linksToValidate);
};
var _default = validateLinks;
exports.default = _default;