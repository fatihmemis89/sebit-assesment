const path = require('path');
const { terser } = require('rollup-plugin-terser');

module.exports = {
  input: path.resolve(__dirname, `www/js/index.js`),
  output: {
    file: path.resolve(__dirname, `www/dist/bundle.min.js`),
    format: 'esm',
    generatedCode: 'es2015'
  },
  plugins : [
    //terser()
  ]
};