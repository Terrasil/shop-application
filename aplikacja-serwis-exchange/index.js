var express = require('express');
var app = express();
var fs = require("fs");
var cron = require('node-cron');

const request = require('request');

let url = "http://www.floatrates.com/daily/usd.json";

let options = {json: true};

let currencies = {}
let exchange = {}

const job = cron.schedule("* * 12 * * *", () => {
  updateCurrencies();
});

function updateCurrencies(){
  let buffer = {}
  let temp = []
  request(url, options, (error, res, body) => {
    if (error) {
      return  console.log(error)
    };
    if (!error && res.statusCode == 200) {
      buffer = body
      exchange = body
      for (const key in buffer) {
        temp.push(key)
      }
      currencies = JSON.parse(JSON.stringify(temp));
    };
  });
  for (const key in buffer) {
    temp.push(key)
  }
}

function updateExchange(){

}

updateCurrencies();

app.get('/', function (req, res) {
  
  let value = req.query.value || 1
  let from = req.query.from
  let to = req.query.to
	res.end( JSON.stringify(exchange) );
})


app.get('/currencies', function (req, res) {
	res.end( JSON.stringify(currencies) );
})


var server = app.listen(process.env.REACT_APP_PORT || 8081, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Example app listening at http://%s:%s", host, port)
})