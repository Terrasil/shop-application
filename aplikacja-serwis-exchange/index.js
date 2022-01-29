const { Console } = require('console');
var express = require('express');
var app = express();
var fs = require("fs");
var cron = require('node-cron');

const cors = require('cors');
app.use(cors())
const request = require('request');

let url = "http://www.floatrates.com/daily/usd.json";

let options = {json: true};

let currencies = {}
let exchange = {}

function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

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
      for (const key in buffer) {
        temp.push(key)
      }
      temp.push("usd")
      currencies = JSON.parse(JSON.stringify(temp));
    };
  });
}

function updateExchange(){
  for(const cur in currencies){
    sleep(cur*1000).then(() => {
      request("http://www.floatrates.com/daily/"+currencies[cur]+".json", options, (error, res, body) => {
        if (error) {
          return  console.log(error)
        };
        if (!error && res.statusCode == 200) {
          exchange[currencies[cur]]=body;
        };
      });
    })
  }
}

app.get('/', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
  let value = req.query.value || 1
  let from = req.query.from
  let to = req.query.to
  console.log(from + " - " + to)
  if(exchange !== undefined && exchange !== {}){
    if(from !== undefined && to !== undefined){
    
      //res.end( JSON.stringify(exchange) );
      if(exchange[from.toString()] !== undefined && exchange[from.toString()][to.toString()] !== undefined){
        res.end( (value * exchange[from.toString()][to.toString()].rate).toString() );
      }else{
        res.end( JSON.stringify(0) );
      }
    }else{
      res.end( JSON.stringify(0) );
    }
  }else{
    res.end( JSON.stringify(0) );
  }
})


app.get('/currencies', function (req, res) {
  res.set('Access-Control-Allow-Origin', '*');
	res.end( JSON.stringify(currencies) );
})


var server = app.listen(process.env.REACT_APP_PORT || 8081, function () {
  var host = server.address().address
  var port = server.address().port
  console.log("Example app listening at http://%s:%s", host, port)
  sleep(1000).then(() => {
    console.log("Update currencies...")
    updateCurrencies();
    console.log("Update currencies done!")
  });
  sleep(2000).then(() => {
    console.log("Calculating exchange...")
    updateExchange();
    console.log("Calculating exchange done!")
  });
})