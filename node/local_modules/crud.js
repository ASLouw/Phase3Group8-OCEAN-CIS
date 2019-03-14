var http = require('http');
var url = require('url');
var express=require('express');
var app=express();
var mysql = require('mysql2');

var conn=mysql.createConnection(
{
	host : "localhost",
	user : "root",
	password : "",
	database : "u17140634_COS301_Client_Information_Database"
});

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
			<a href="/search">Search </a></br>\
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
			Client Name : <input type="text" name="clName"></br>\
			Client Surname : <input type = "text" name = "clSName"></br>\
			Method of Notification : \
			<select name = "MoN">\
				<option value="Email">Email</option>\
			  	<option value="Post">Post</option>\
			 	<option value="SMS">SMS</option>\
			</select>\
			</br>\
			Cell-Number: <input type = "text" name = "cellNum"><br/>\
			Email: <input type="email" name="email"></br>\
			Address: <input type = "text" name = "address"></br>\
			<input type=submit value=submit>\
			</form>\
			\
			<a href="/">Insert </a></br>\
			<a href="/delete">Delete </a></br>\
			<a href="/search">Search </a></br>\
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
			<a href="/search">Search </a></br>\
			</body>\
			</html>';
			response.write(cont);
		}

		if(pathname == "/search")
		{
			response.writeHead(200, {'Content-Type': 'text/html'});
			var cont='<html>\
   						<body>\
      						<form action = "/searchInfo" method = "GET">\
         						ClientID: <input type = "text" name = "clID">  </br>\
         						<input type = "submit" value = "Submit">\
      						</form>\
   						</body>\
					</html>';
			response.write(cont);
		}

		if(pathname == "/password")
		{
			response.writeHead(200, {'Content-Type': 'text/html'});
			var cont='<html>\
   						<body>\
   						<h1>Please enter password: </h1></br>\
      						<form action = "/passwordPage" method = "GET">\
         						Password: <input type = "text" name = "clID">  </br>\
         						<input type = "submit" value = "Submit">\
      						</form>\
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
				database : "u17140634_COS301_Client_Information_Database"
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

			response.writeHead(200, {'Content-Type': 'text/html'});
					var cont='<head> \
					<title>Search Results</title> \
					</head> \
					<body> \
					<a href="/password">Create Password</a></br>\
					</body>\
					</html>';
					response.write(cont);
					response.end();
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

			var queryString="SELECT * FROM clientInfo WHERE client_id = "+_url.query['clID'];		
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

				var name = data[0].client_name;
				var sName = data[0].client_surname;
				var MoN = data[0].method_of_notification;
				var cN = data[0].cell_number;
				var Em = data[0].email;
				var addr = data[0].home_address;

				if(_url.query['clName'] != "")
				{
					name = _url.query['clName'];
				}

				if(_url.query['clSName'] != "")
				{
					sName = _url.query['clSName'];
				}

				if(_url.query['MoN'] != "")
				{
					MoN = _url.query['MoN'];
				}

				if(_url.query['cellNum'] != "")
				{
					cN = _url.query['cellNum'];
				}

				if(_url.query['email'] != "")
				{
					Em = _url.query['email'];
				}

				if(_url.query['address'] != "")
				{
					addr = _url.query['address'];
				}

				var con = mysql.createConnection(
				{
					host : "localhost",
					user : "root",
					password : "",
					database : "u17140634_cos301_client_information_database"
				});

				var queryString="UPDATE clientinfo SET clientinfo.client_name = '"+ name +"', clientinfo.client_surname = '"+ sName +"', clientinfo.method_of_notification = '"+ MoN +"', clientinfo.cell_number = '"+ cN +"', clientinfo.email = '"+ Em +"', clientinfo.home_address = '"+ addr +"' WHERE clientinfo.client_id = "+_url.query['clID'];
				con.query(queryString, function(error,data,fields)
				{
					if(error)
					{
						throw error;
					}
					else
					{
						console.log("success");
					}
				});
				con.end();
			});

			response.write("update success \n<a href='/'>Insert </a></br> <a href='/update'>Update </a> </br><a href='/delete'>Delete </a></br><a href='/search'>Search </a></br>");
			//response.writeHead(301,{Location: "http://localhost:8888/update"});
			conn.end();
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
			response.write("delete success \n<a href='/'>Insert </a></br> <a href='/update'>Update </a></br> <a href='/delete'>Delete </a></br><a href='/search'>Search </a></br>");

			//response.writeHead(301,{Location: "http://localhost:8888/delete"});
		}

		if(pathname == "/passwordPage")
		{
			response.writeHead(200, {'Content-Type': 'text/html'});
			response.write("Insert Successful </br><a href='/'>Insert </a></br> <a href='/update'>Update </a></br> <a href='/delete'>Delete </a></br><a href='/search'>Search </a></br>");
		}

		if(pathname == "/searchInfo")
		{
			var conn=mysql.createConnection(
			{
				host : "localhost",
				user : "root",
				password : "",
				database : "u17140634_cos301_client_information_database"
			});

			var queryString="SELECT * FROM clientInfo WHERE client_id = "+_url.query['clID'];		
			conn.query(queryString, function(error,data,fields)
			{
				if(error)
				{
					throw error;
				}
				else
				{
					console.log("success");
					console.log

				}
					response.writeHead(200, {'Content-Type': 'text/html'});
					var cont='<head> \
					<title>Search Results</title> \
					</head> \
					<body> \
					<table style="width:100%" border = "1">\
					  <tr>\
					    <th>Client ID</th>\
					    <th>Client Name</th> \
					    <th>Client Surname</th>\
					    <th>Method of Notification</th>\
					    <th>Active</th> \
					    <th>Cell Number</th>\
					    <th>Email</th> \
					    <th>Home Address</th>\
					  </tr>\
					  <tr>\
					    <th>'+data[0].client_id+'</th>\
					    <th>'+data[0].client_name+'</th> \
					    <th>'+data[0].client_surname+'</th>\
					    <th>'+data[0].method_of_notification+'</th>\
					    <th>'+data[0].active+'</th> \
					    <th>'+data[0].cell_number+'</th>\
					    <th>'+data[0].email+'</th> \
					    <th>'+data[0].home_address+'</th>\
					  </tr>\
					</table>\
					<a href="/">Insert </a></br>\
					<a href="/update">Update </a></br>\
					<a href="/delete">Delete </a></br>\
					<a href="/search">Search </a></br>\
					</body>\
					</html>';
					response.write(cont);
					response.end();
			})

			conn.end();
			
			//response.writeHead(301,{Location: "http://localhost:8888/delete"});
		}
}

http.createServer(onRequest).listen(8888);
