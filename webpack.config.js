/* eslint-disable */
const path = require('path');

module.exports = {
  entry: {
    accueil: './accueil.js',
    pagephotographe: './page-photographe.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  target: 'node',
};

