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

		if(pathname == "/")
		{
			response.writeHead(200, {'Content-Type': 'text/html'});
			var cont='<html> \
			<head> \
			<title>Basic Insert</title> \
			</head> \
			<body> \
			<form method=get action=insertInfo >\
			<h1>Please enter details</h1> \
			Client Name : <input type="text" name="clName" required></br>\
			Client Surname : <input type = "text" name = "clSName" required></br>\
			Method of Notification : \
			<select name = "MoN">\
				<option value="Email">Email</option>\
			  	<option value="Post">Post</option>\
			 	<option value="SMS">SMS</option>\
			</select>\
			</br>\
			Cell-Number: <input type = "text" name = "cellNum" required><br/>\
			Email: <input type="email" name="email" required></br>\
			Address: <input type = "text" name = "address" required></br>\
			<input type=submit value=submit>\
			</form>\
			<a href="/update">Update </a></br>\
			<a href="/delete">Delete </a></br>\
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
			Client ID : <input type="text" name="clID" required></br>\
			Client Name : <input type="text" name="clName" required></br>\
			Client Surname : <input type = "text" name = "clSName" required></br>\
			Method of Notification : \
			<select name = "MoN">\
				<option value="Email">Email</option>\
			  	<option value="Post">Post</option>\
			 	<option value="SMS">SMS</option>\
			</select>\
			</br>\
			Cell-Number: <input type = "text" name = "cellNum" required><br/>\
			Email: <input type="email" name="email" required></br>\
			Address: <input type = "text" name = "address" required></br>\
			<input type=submit value=submit>\
			</form>\
			\
			<a href="/">Insert </a></br>\
			<a href="/delete">Delete </a></br>\
			</body>\
			</html>';
			response.write(cont);
		}

		if(pathname == "/delete")
		{
			response.writeHead(200, {'Content-Type': 'text/html'});
			var cont='<head> \
			<title>Basic Delete</title> \
			</head> \
			<body> \
			<form method=get action=deleteinfo>\
			<h1>Please enter client to delete</h1> \
			Client ID : <input type="text" name="clID"></br>\
			<input type=submit value=submit>\
			</form>\
			\
			<a href="/">Insert </a>\
			<a href="/update">Update </a>\
			</body>\
			</html>';
			response.write(cont);
		}

		if(pathname == "/insertInfo")
		{
			var conn=mysql.createConnection(
			{
				host : "localhost",
				user : "root",
				password : "",
				database : "u17140634_cos301_client_information_database"
			});

			response.writeHead(200, {'Content-Type': 'text/html'});

			var queryString="INSERT INTO clientInfo (client_name, client_surname, method_of_notification, active, cell_number, email, home_address) VALUES('"+_url.query['clName']+"','"+_url.query['clSName']+"','"+_url.query['MoN']+"', 1 ,'"+_url.query['cellNum']+"','"+_url.query['email']+"','"+_url.query['address']+"')";
			conn.query(queryString, function(error,data,fields)
			{
				if(error)
				{
					throw error;
				}
				else
				{
					console.log("success");
				}
			})

			conn.end();

			response.write("insertion success \n<a href='/'>Insert </a> <a href='/update'>Update </a> <a href='/delete'>Delete </a>");

			//response.writeHead(301,{Location: "http://localhost:8888/"});
		}

		if(pathname == "/updateinfo")
		{
			var conn=mysql.createConnection(
			{
				host : "localhost",
				user : "root",
				password : "",
				database : "u17140634_cos301_client_information_database"
			});

			response.writeHead(200, {'Content-Type': 'text/html'});

			var queryString="UPDATE clientinfo SET clientinfo.client_name = '"+_url.query['clName']+"', clientinfo.client_surname = '"+_url.query['clSName']+"', clientinfo.method_of_notification = '"+_url.query['MoN']+"', clientinfo.cell_number = '"+_url.query['cellNum']+"', clientinfo.email = '"+_url.query['email']+"', clientinfo.home_address = '"+_url.query['address']+"' WHERE clientinfo.client_id = "+_url.query['clID'];
			conn.query(queryString, function(error,data,fields)
			{
				if(error)
				{
					throw error;
				}
				else
				{
					console.log("success");
				}
			})

			conn.end();

			response.write("update success \n<a href='/'>Insert </a> <a href='/update'>Update </a> <a href='/delete'>Delete </a>");
			//response.writeHead(301,{Location: "http://localhost:8888/update"});
		}

		if(pathname == "/deleteinfo")
		{
			var conn=mysql.createConnection(
			{
				host : "localhost",
				user : "root",
				password : "",
				database : "u17140634_cos301_client_information_database"
			});

			response.writeHead(200, {'Content-Type': 'text/html'});

			var queryString="UPDATE clientinfo SET  clientinfo.active = 0 WHERE clientinfo.client_id = "+_url.query['clID'];			
			conn.query(queryString, function(error,data,fields)
			{
				if(error)
				{
					throw error;
				}
				else
				{
					console.log("success");
				}
			})

			conn.end();
			response.write("delete success \n<a href='/'>Insert </a> <a href='/update'>Update </a> <a href='/delete'>Delete </a>");

			//response.writeHead(301,{Location: "http://localhost:8888/delete"});
		}


		response.end();
}

http.createServer(onRequest).listen(8888);
console.log("Server has started.");