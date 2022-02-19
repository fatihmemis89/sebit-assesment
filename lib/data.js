const fs = require('fs');
const path = require('path');

exports.readDataFromFile = (cb)=>{
  fs.readFile(path.join(__dirname,'../data.json'),(err,data)=>{
    if (err) return cb(err);
    cb(null,data);
  });
};