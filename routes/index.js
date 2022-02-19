const express = require('express');
const router = express.Router();

const libData = require('../lib/data');

router.get('/',(req,res)=>{
  res.render('index');
});

router.get('/data',(req,res)=>{
  libData.readDataFromFile((err,data)=>{
    if (err) return res.status(500).send();
    res.send(data);
  });
});

module.exports = router;