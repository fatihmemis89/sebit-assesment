const http = require('http');
const express = require('express');
const config = require('./config');

const app = express();
const appRoutes = {
  index : require('./routes/index')
};

app.set('x-powered-by',false);
app.set('view engine','pug');
app.set('views',__dirname+'/www/views');

app.use('/assets',express.static(__dirname+'/www/assets'));
app.use('/favicon.ico', express.static(__dirname+'/www/assets/img/favicon.ico'));
app.use(express.static(__dirname+'/www/dist'));

app.use('/',appRoutes.index);
app.use((req,res,next)=>{
  res.status(404).render('errors/404');
});
app.use((err,req,res,next)=>{
  console.error(err);
  res.status(500).render('errors/500');
});

const server = new http.Server(app);
server.listen(config.PORT,(err)=>{
  if (err) return console.error(err);
  console.log('Server listening on port :',config.PORT);
});