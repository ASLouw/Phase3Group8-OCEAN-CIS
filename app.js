//dependencies
const express = require('express');
const clients = require('./local_modules/routes/clients');
const logs = require('./local_modules/routes/logs');
const bodyParser = require('body-parser')
const app = express()
const port = 8000;

app.use(bodyParser.json());

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.post('/subscribe', (req, res)=>res.send(clients.subscribe(req.body)));

//127.0.0.1:8000/email
//body {"client_id" : "1"}
app.post('/email', function (req, res)
{
    let promise = clients.getEmail(req.body)    
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
});


///:client_id&:startDate&:endDate
/*app.post('/logs', function (req, res) {
  let promise = logs.getLogs(req.params)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
});*/

//127.0.0.1:8000/clientID
//body {"client_id" : "1"}
app.post('/clientID', function (req, res) {
  //console.log("id: " + JSON.stringify(req.body));
  let promise = clients.getActive(req.body)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
}); 

//127.0.0.1:8000/deleteClient
//body {"client_id" : "1"}
app.post('/deleteClient', function (req, res) {
  //console.log("id: " + req.body);

  let promise = clients.deleteUser(req.body)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })
}); 

module.exports.app = app;

