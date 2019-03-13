var http = require('http');
var url = require('url');

var mysql = require('mysql2');
var conn=mysql.createConnection(
{
host : "localhost",
user : "root",
password : "",
database : "u17140634_COS301_Client_Information_Database"
}
);

function onRequest(request, response) 
{

	var _url = url.parse(request.url, true);
	var pathname = _url.pathname;

	if(pathname == "/" )
	{
	response.writeHead(200, {'Content-Type': 'text/html'});
	var cont='<html> \
	<head> \
	<title>Basic Insert</title> \
	</head> \
	<body> \
	<form method=get action=dummy >\
	<h1>Please enter details</h1> \
	Client ID : <input type="text" name="clID"></br>\
	Client Name : <input type="text" name="clName"></br>\
	Client Surname : <input type = "text" name = "clSName"></br>\
	Method of Notification : \
	<select name = "MoN">\
		<option value="Email">Email</option>\
	  	<option value="Post">Post</option>\
	 	<option value="SMS">SMS</option>\
	</select>\
	</br>\
	Password(8 characters minimum): <input type ="password" name = "pass" minlength="8" required></br>\
	Cell-Number: <input type = "text" name = "cellNum"><br/>\
	Email: <input type="email" name="email"></br>\
	<input type=submit value=submit>\
	</form>\
\
	<a href="/update">Update </a>\
	</body>\
	</html>';
	response.write(cont);

}
if(pathname == "/update")
{
	response.writeHead(200, {'Content-Type': 'text/html'});
	var cont='<head> \
	<title>Basic Update</title> \
	</head> \
	<body> \
	<form method=get action=updateinfo>\
	<h1>Please enter details</h1> \
	Client ID : <input type="text" name="clID"></br>\
	Client Name : <input type="text" name="clName"></br>\
	Client Surname : <input type = "text" name = "clSName"></br>\
	Method of Notification : \
	<select name = "MoN">\
		<option value="Email">Email</option>\
	  	<option value="Post">Post</option>\
	 	<option value="SMS">SMS</option>\
	</select>\
	</br>\
	Password(8 characters minimum): <input type ="password" name = "pass" minlength="8" required></br>\
	Cell-Number: <input type = "text" name = "cellNum"><br/>\
	Email: <input type="email" name="email"></br>\
	<input type=submit value=submit>\
	</form>\
\
	<a href="/">Insert </a>\
	</body>\
	</html>';
	response.write(cont);
}



if(pathname == "/dummy")
{
response.writeHead(200, {'Content-Type': 'text/html'});

var queryString="INSERT INTO clientInfo (client_id, client_name, client_surname, method_of_notification, password, cell_number, email) VALUES('"+_url.query['clID']+"','"+_url.query['clName']+"','"+_url.query['clSName']+"','"+_url.query['MoN']+"','"+_url.query['pass']+"','"+_url.query['cellNum']+"','"+_url.query['email']+"')";
conn.query(queryString, function(error,data,fields)
{
if(error)
{
throw error;
}
else{

console.log("success");
}
}
)
conn.end();

response.write("insertion success");
}

if(pathname == "/updateinfo")
{
response.writeHead(200, {'Content-Type': 'text/html'});

var queryString="UPDATE clientinfo SET clientinfo.client_name = '"+_url.query['clName']+"', clientinfo.client_surname = '"+_url.query['clSName']+"', clientinfo.method_of_notification = '"+_url.query['MoN']+"', clientinfo.password = '"+_url.query['pass']+"', clientinfo.cell_number = '"+_url.query['cellNum']+"', clientinfo.email = '"+_url.query['email']+"' WHERE clientinfo.client_id = "+_url.query['clID'];
console.log(queryString);

conn.query(queryString, function(error,data,fields)
{
if(error)
{
throw error;
}
else{

console.log("success");
}
}
)
conn.end();

response.write("update success");
}

response.end();

}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");