
var express 	      = require('express');
var app 		        = express();
var bodyParser 	    = require('body-parser');
var mongoose 	      = require('mongoose');
var mongodb         = require("mongodb");
var apiRoutes 	    = require('./config/api-routes');
var auth		        = require('./config/authorization');
var methodOverride  = require('method-override');
//var fs              = require( "fs" );
var busboy          = require('connect-busboy');


app.set('views', __dirname);
app.engine('html', require('ejs').renderFile);

//Add middleware necessory for Rest API's
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('X-HTTP-Method-Override'));

// Uploading images
app.use(busboy()); 


// CORS Support
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
 // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //console.log('Client IP:', ip);
  
  next();
});


//var dbUrl = process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/ecommerce-app-db";
var dbUrl = 'mongodb://ecommerce-app:123456@ds015849.mlab.com:15849/ecommerce-app-db';

var port = process.env.PORT || 3003;//replace with = 80; when you want to hide port number

mongoose.connect(dbUrl);  

app.listen(port, function(){
      console.log('Listening on port ' + port); 
});

app.get('/', function(req, res){
  console.log(req.params.name);
  res.render('client/views/index.html');
})

app.get('/admin', function (req, res) {
    res.render('admin/views/index.html');
});

app.get('/admin/partials/:name', function (req, res) {
    res.render('admin/views/partials/' + req.params.name);
});


app.get('/partials/:name', function (req, res) {
  console.log(req.params.name);
	  res.render('client/views/partials/' + req.params.name);
});
  
app.use('/admin/adminjs', express.static(__dirname + '/admin/js'));
app.use('/assets', express.static(__dirname + '/client/js'));
  
app.use('/admin/bower_components', express.static(__dirname + '/bower_components'));
app.use('/bower_components', express.static(__dirname + '/bower_components'));
  
app.use('/images', express.static(__dirname+'/uploads/'));


app.get('/:post', function(req, res){
  res.render('client/views/index.html');
})

  // Load Api routes
  apiRoutes(app, auth);
