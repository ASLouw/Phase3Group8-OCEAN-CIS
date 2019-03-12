var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "u17140634_COS301_Client_Information_Database"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM clientInfo", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
  });
});

