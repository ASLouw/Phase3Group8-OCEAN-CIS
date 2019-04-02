//dependencies
const express = require('express');
const bodyParser = require('body-parser')
const axios = require('axios')
const app = express()
const port = 8080;

const os = require('os');
const ifaces = os.networkInterfaces();
let ifaceval= null;

app.use(bodyParser.json());

app.listen(port, () => console.log(`App listening on port ${port}!`));

Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
      ifaceval = iface.address;
    }
    ++alias;
  });
});

app.post('/getsubscription', function (req, res)
{

  let body = req.body;
  console.log(body);
  res.send("value recieved: "+body.id)
});

app.get('/subscribe', function (req, res)
{
  let ip = "{\"URL\":\""+ifaceval+":8080/getsubscription\"}";
  axios.post(ifaceval+':8000/subscribe', ip)
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });
  res.send(ip);
});

module.exports.app = app;
