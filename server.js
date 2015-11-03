var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var multer = require('multer');
var errorHandler = require('errorhandler');
var mysql = require('mysql');
var router = require('./router');
var app = express();

app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/public')));
app.use('development', function () {
    app.errorHandler({
        showStack: true,
        dumpExceptions: true
    });
});

if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

var connection = mysql.createConnection({
    host: '127.0.0.1',
    user:'root',
    password:'root',
    database: 'twitter_db'
});

connection.connect(function(err){
    if (err){
        console.log('impossible de se connecter à la base de données : ' + err.toString());
        process.exit(code=0);
    }
    console.log('Connecté à la base de données.');
});

router(app, connection);

app.listen(app.get('port'), function () {
    console.log('Serveur express en écoute sur le port ' + app.get('port'));
});