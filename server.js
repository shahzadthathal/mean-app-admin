
var express 	      = require('express');
var app 		        = express();
var bodyParser 	    = require('body-parser');
var mongoose 	      = require('mongoose');
var mongodb         = require("mongodb")
var apiRoutes 	    = require('./config/api-routes');
var auth		        = require('./config/authorization');
var methodOverride  = require('method-override');
//var fs              = require( "fs" );
var busboy          = require('connect-busboy');




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
  

 // var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  //console.log('Client IP:', ip);
  
  next();
});


var dbUrl = process.env.MONGOLAB_URI || "mongodb://127.0.0.1:27017/ecommerce-app-db";
var port = process.env.PORT || 3003;
// Setup mongoose
//mongoose.connect('mongodb://127.0.0.1:27017/ecommerce-app-db');
//live db
mongoose.connect(dbUrl);

//mongodb://heroku_17dqqg6h:ira8j6iic4pk0vl1g9qidb16uc@ds011870.mlab.com:11870/heroku_17dqqg6h
  


/*mongodb.MongoClient.connect(dbUrl, function (err, database) {
  if (err) {
    console.log(err);
    process.exit(1);
  }

  // Save database object from the callback for reuse.
  //db = database;
  console.log("Database connection ready");

});*/


app.listen(port, function(){
      console.log('Listening on port ' + port); //Listening on port 8888
});



// Generic error handler used by all endpoints.
// function handleError(res, reason, message, code) {
//   console.log("ERROR: " + reason);
//   res.status(code || 500).json({"error": message});
// }



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
  app.use('/bower_components', express.static(__dirname + '/bower_components'));
  app.use('/images', express.static(__dirname+'/uploads/'));

  // Load Api routes
  apiRoutes(app, auth);