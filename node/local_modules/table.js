var mysql = require('mysql2');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "u17140634_COS301_Client_Information_Database"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE clientInfo (client_id INT PRIMARY KEY, client_name VARCHAR(45), client_surname VARCHAR(45), method_of_notification VARCHAR(45), active TINYINT(1), password VARCHAR(45), cell_number VARCHAR(45), email VARCHAR(45))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE transactions (transaction_id INT PRIMARY KEY, client_id INT, value_changed VARCHAR(45), old_value VARCHAR(45), new_value VARCHAR(45), timestamp DATETIME)";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  var sql = "CREATE TABLE cardList (card_id INT PRIMARY KEY, client_id INT, active TINYINT(1))";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});