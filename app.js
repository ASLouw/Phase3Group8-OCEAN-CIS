//dependencies
const dbInfo = require("./local_modules/dbInfo");
const express = require('express');
const clients = require('./local_modules/routes/clients');
const logs = require('./local_modules/routes/logs');
const bodyParser = require('body-parser')
const app = express()
const port = 8000;



app.use(bodyParser.json());

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.post('/subscribe', (req, res)=>res.send(clients.subscribe(req.body)));
app.post('/email/:client_id', function (req, res)
{
    let promise = clients.getEmail(req.params)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
});


app.post('/logs/:client_id&:startDate&:endDate', function (req, res) {
  let promise = logs.getLogs(req.params)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
});

app.post('/clientID/:client_id', function (req, res) {
  console.log("id: " + req.params);
  let promise = clients.getActive(req.params)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
}); 

app.post('/deleteClient/:client_id', function (req, res) {
  // console.log("id: " + req.params);
   let promise = clients.deleteUser(req.params)
     promise.then(function(value)
   {
     console.log(value);
     res.send(value);
   })
 }); 

module.exports.app = app;

