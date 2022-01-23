var express = require('express');
var app = express();
var fs = require("fs");

const request = require('request');

let url = "http://www.floatrates.com/daily/usd.json";

let options = {json: true};

let json = {}

request(url, options, (error, res, body) => {
    if (error) {
        return  console.log(error)
    };
    if (!error && res.statusCode == 200) {
		json = body
    };
});

app.get('/ex', function (req, res) {
	res.end( JSON.stringify(json) );
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})