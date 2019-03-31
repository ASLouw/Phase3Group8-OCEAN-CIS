//dependencies
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = 8080;

app.listen(port, () => console.log(`App listening on port ${port}!`));

app.post('/createUser', function (req, res)
{

  let body = JSON.parse(JSON.stringify(req.body));
  console.log(body);
});

app.get('/subscribe', function (req, res)
{
  axios.post("localhost:8000", {"URL":"https:localhost:8080"}).catch(function(error) {
    console.log(error);
  });
  res.send("posting to localhost:8000");
});

module.exports.app = app;
