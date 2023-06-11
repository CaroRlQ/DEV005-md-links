#!/usr/bin/env node
import mdLinks from '../DEV005-md-links/src/mdLinks';

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
