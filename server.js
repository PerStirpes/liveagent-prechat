var path = require('path');
var express = require('express');
var app = express();
var server = require('http').createServer(app);

var axios = require('axios')

require('dotenv').config();

var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(express.static(__dirname + '/public'));

// Add headers
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.get('/', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public/index.html'))
})

app.get('/passToLiveAgent', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public/passToLiveAgent.html'))
})

app.get('/preChat', function (request, response){
    response.sendFile(path.resolve(__dirname, 'public/preChat.html'))
})

server.listen(process.env.PORT || 8080, function() {
	console.log("Node server started on port 8080")
});