#!/usr/bin/env node
// eslint-disable-next-line import/extensions
import mdLinks from './src/mdLinks.js';

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
