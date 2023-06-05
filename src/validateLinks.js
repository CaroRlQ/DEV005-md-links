/* eslint-disable import/no-extraneous-dependencies */
import axios from 'axios';
// eslint-disable-next-line import/extensions

import searchFilesMd from './extractFile.js';
import searchlinks from './extractLinks.js';

// import fetch from 'node-fetch';
/*
axios.get('http://cdalp.org.bo/encuentro-bi-nacional-de-arquitectos-bolivia-peru')
  .then((response) => {
    console.log('hola');
    console.log('response1111111', (typeof response));
  //  console.log('response', response.status);
  }); */

const validateLinks = (validate) => {
  const linksToValidate = validate.map((indexLink) => new Promise((resolve) => {
    const linkToValidate = indexLink.href;
    axios.head(linkToValidate)
      .then((response) => {
        if (response.status === 200) {
          const pathOk = {
            status: response.status,
            validate: 'ok',
          };
          const linksValidate = Object.assign(indexLink, pathOk);
          resolve(linksValidate);
        } else {
          const pathFail = {
            status: response.status,
            validate: 'fail',
          };
          const linksInvalidate = Object.assign(indexLink, pathFail);
          resolve(linksInvalidate);
        }
      })
      .catch((error) => {
        // console.error('Error:', error.message);
        const pathFail = {
          status: error.response ? error.response.status : 'unknown',
          validate: 'fail',
        };
        const linksInvalidate = Object.assign(indexLink, pathFail);
        resolve(linksInvalidate);
      });
  }));
  return Promise.all(linksToValidate);
};

searchlinks(searchFilesMd('C:\\Users\\ASUS\\Desktop\\soyUnaCarpeta'))
  .then((resul) => {
    validateLinks(resul)
      .then((ok) => {
        console.log('ok', ok);
      })
      .catch((error) => {
        console.log('fail', error);
      });
  })
  .catch((err) => console.log(err));
