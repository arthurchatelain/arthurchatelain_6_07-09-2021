const path = require('path');

module.exports = {
  entry: './accueil.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  target: 'node',
};
