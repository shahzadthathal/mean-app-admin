
var express 	      = require('express');
var app 		        = express();
var bodyParser 	    = require('body-parser');
var mongoose 	      = require('mongoose');
var apiRoutes 	    = require('./config/api-routes');
var auth		        = require('./config/authorization');
var methodOverride  = require('method-override');
//var fs              = require( "fs" );
var busboy          = require('connect-busboy');
// Setup mongoose
mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-app-db');


 // Setup Express
 app.set('views', __dirname + '/admin/views');
 app.engine('html', require('ejs').renderFile);


//app.use(express.favicon());


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
  next();
});



app.listen(3003, function(){
	console.log('I\'m Listening at 3003...');
});

 // Public Routes
  app.get('/', function (req, res) {
    res.render('index.html');
  });


  app.get('/partials/:name', function (req, res) {
	console.log(req.params.name);
    res.render('partials/' + req.params.name);
  });


  app.use('/img', express.static(__dirname + '/admin/img'));
  app.use('/css', express.static(__dirname + '/admin/css'));
  app.use('/js', express.static(__dirname + '/admin/js'));

// Serve public images
  app.use('/images', express.static(__dirname+'/uploads/'));

  // Load Api routes
  apiRoutes(app, auth);