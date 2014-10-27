  var express     = require('express'),
      mongoose    = require('mongoose');
      var fs      = require('fs');

var app = express();

//mongoose.connect('mongodb://localhost/wineknow'); // <----connect to mongo database

// export our app for testing and flexibility, required by index.js
module.exports = app;


//Routers
module.exports = function(app, express) {

  app.get('/', function(req, res) {
    res.send(200, __dirname + '/web/index.html');
  }
  //app.post('/', )  <-- Need to put a form for submission
  //app.get('/wine?) <-- Need to allow restful searches for wine


}


