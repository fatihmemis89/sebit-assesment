const ENV = process.env;

const DEFAULTS = {
  PORT : 3000
};

let config = {};

Object.keys(DEFAULTS).forEach((key)=>{
  config[key] = ENV[key] || DEFAULTS[key];
});

module.exports = config;