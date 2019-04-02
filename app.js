//dependencies
const express = require('express');
const clients = require('./local_modules/routes/clients');
//const logs = require('./local_modules/routes/logs');
const bodyParser = require('body-parser')
const app = express()
const port = 8000;

app.use(bodyParser.json());

app.listen(port, function functionName() {
  console.log(`App listening on port ${port}!`);
  clients.getSubscriptions();
});

app.post('/subscribe', (req, res)=>res.send(clients.subscribe(req.body)));

app.get('/update',(req, res)=>res.send(clients.notifyAll({
  "Operation":"UPDATE"
})));

app.post('/createUser', function (req, res)
{

  let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system

  if(sys == "CIS")
  {
    let val = clients.createUser(req.body)  ;
    console.log(val);
    res.send(val);
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  }

    /*let promise = clients.createUser(req.body)
    promise.then(function(value)
  {
    console.log(value);
    res.send(value);
  })*/
});

app.post('/reactivate', function (req, res)
{
  let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system

  if(sys == "CIS")
  {
    let promise =  clients.getActive(req.body)
    promise.then(function(value)
    {
     // console.log(value);
      //res.send(value);

      if(value == 0 )
      {
        let val = clients.reactivateUser(req.body)  ;
        //console.log(val);
        res.send(val);
      }
      else if(value == 1)
      {
        res.send("Client already active");
      }
      else
      {
        res.send("cleint does not exist");
      }
    })
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  }

   /* let promise =  clients.getActive(req.body)
    promise.then(function(value)
    {
      console.log(value);
      //res.send(value);

      if(value == false)
      {
        let val = clients.reactivateUser(req.body)  ;
        console.log(val);
        res.send(val);
      }
      else
      {
        res.send("Client already active");
      }
    })*/





});

//127.0.0.1:8000/email
//body {"system":"NS","client_id" : "41"}
app.post('/email', function (req, res)
{
  let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system

  if(sys == "NS")
  {
    let promise = clients.getEmail(req.body)
    promise.then(function(value)
    {
      //console.log(value);
      res.send(value);
    })
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  }


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
//body {"system":"CAS","client_id" : "1"}
app.post('/clientID', function (req, res)
{
  let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system
  if(sys == "CAS" || sys == "AUTH" || sys == "FRS" || sys == "CRDS" || sys == "NS")
  {
    let promise = clients.getActive(req.body)
    promise.then(function(value)
    {
     // console.log(value);

      res.send(value);
    })
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  }


});

//127.0.0.1:8000/deleteClient
//body {"system":"CAS","client_id" : "1"}
app.post('/deleteClient', function (req, res) {
  //console.log("id: " + JSON.stringify(req.body));

  let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system

  if(sys == "AUTH")
  {
    let promise =  clients.getActive(req.body)
    promise.then(function(value)
    {
      //console.log(value);
      //res.send(value);

      if(value == true)
      {
        let promise = clients.deleteUser(req.body)
        promise.then(function(val)
        {
          //console.log(value);
          res.send(val);
        })
        //console.log(val);
        //res.send(val);
      }
      else if(value == "cleint does not exist" )
      {
        res.send("cleint does not exist");
      }
      else
      {
        res.send("Client already deleted");
      }
    })
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  }



  //let val = clients.deleteUser(req.body)  ;
  //console.log(val);
  /*let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system
  //console.log("sys: " + body.system )
  if(sys == 'AUTH')
  {
    let promise = clients.deleteUser(req.body)
    promise.then(function(value)
    {
      console.log(value);
      res.send(value);
    })
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  } */
});

app.post('/deleteClientFromInterface', function (req, res)
{
  let body = JSON.parse(JSON.stringify(req.body));
  let sys = body.system

  if(sys == "CIS")
  {
    let promise =  clients.getActive(req.body)
    promise.then(function(value)
    {
      //console.log(value);
      //res.send(value);

      if(value == true)
      {
        let val = clients.deleteUserFromInterface(req.body)  ;
        //console.log(val);
        res.send(val);
      }
      else if(value == "cleint does not exist" )
      {
        res.send("cleint does not exist");
      }
      else
      {
        res.send("Client already deleted");
      }
    })
  }
  else if(sys != undefined)
  {
    res.send("access denied: specified system does not have access to this request");
  }
  else
  {
    res.send("access denied: system undefined");
  }

    /*let val = clients.deleteUserFromInterface(req.body)

    console.log(val);*/

});

module.exports.app = app;
