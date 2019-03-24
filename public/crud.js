var express = require('express');
var app = express();
var path = require('path')
var sql = require("mysql2");

app.get('/views/style.css', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/style.css'));
});

app.get('/', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/insert.html'));
});

app.get('/success', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/querysuccess.html'));
});

app.get('/error', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/error.html'));
});

app.get('/search', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/search.html'));
});

app.get('/update', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/update.html'));
});

app.get('/delete', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/delete.html'));
});

app.get('/reactivate', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/reactivate.html'));
});

app.get('/insertInfo', function (req, res)
{
    var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });

    /*var conn=mysql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});*/

    var sqlQ = "INSERT INTO clientinfo (client_name, client_surname, method_of_notification, active, cell_number, email, home_address) VALUES('"+req.query.clName+"','"+req.query.clSName+"','"+req.query.MoN+"', 1 ,'"+req.query.cellNum+"','"+req.query.email+"','"+req.query.address+"')";

    con.query(sqlQ, function(error,data,fields)
	{
		if(error)
		{
			res.redirect('/error');
		}
		else
		{
			console.log("success");
		}
	});
	con.end();

	res.redirect('/success');
});

app.get('/updateinfo', function (req, res)
{
    var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });

    /*var conn=mysql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});*/

    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID;

    con.query(sqlQ, function(error,data,fields)
	{
		if(error)
		{
			throw error;
		}
		else
		{
			
		}

		var name = data[0].client_name;
		var sName = data[0].client_surname;
		var MoN = data[0].method_of_notification;
		var cN = data[0].cell_number;
		var Em = data[0].email;
		var addr = data[0].home_address;

		if(req.query.clName != "")
		{
			name = req.query.clName;
		}

		if(req.query.clSName != "")
		{
			sName = req.query.clSName;
		}

		if(req.query.MoN != "")
		{
			MoN = req.query.MoN;
		}

		if(req.query.cellNum != "")
		{
			cN = req.query.cellNum;
		}

		if(req.query.email != "")
		{
			Em = req.query.email;
		}

		if(req.query.address != "")
		{
			addr = req.query.address;
		}

/*		var conn = mysql.createConnection(
		{
			host : "eu-cdbr-west-02.cleardb.net",
			user : "bdffef71b5c89d",
			password : "6e8120b4",
			database : "heroku_e0c1ec409484908"
		});
*/
		var conn = sql.createConnection(
	    {
	      host: "localhost",
	      user: "root",
	      password: "",
	      database: "u17140634_cos301_client_information_database"
	    });

		var sqlQ = "UPDATE clientinfo SET clientinfo.client_name = '"+ name +"', clientinfo.client_surname = '"+ sName +"', clientinfo.method_of_notification = '"+ MoN +"', clientinfo.cell_number = '"+ cN +"', clientinfo.email = '"+ Em +"', clientinfo.home_address = '"+ addr +"' WHERE clientinfo.client_id = "+req.query.clID;

	    conn.query(sqlQ, function(error,data,fields)
		{
			if(error)
			{
				res.redirect('/error');
			}
			else
			{
				console.log('success');
			}
		});
		conn.end();
	});
	con.end();
	res.redirect('/success');
});

app.get('/deleteinfo', function (req, res)
{
    var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });

    /*var conn=mysql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});*/

    var sqlQ = "UPDATE clientinfo SET  clientinfo.active = 0 WHERE clientinfo.client_id = "+req.query.clID;

    con.query(sqlQ, function(error,data,fields)
	{
		if(error)
		{
			res.redirect('/error');
		}
		else
		{
			console.log("success");
		}
	});
	con.end();

	res.redirect('/success');
});

app.get('/reactivateInfo', function (req, res)
{
    var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });

    /*var conn=mysql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});*/

    var sqlQ = "UPDATE clientinfo SET  clientinfo.active = 1 WHERE clientinfo.client_id = "+req.query.clID;

    con.query(sqlQ, function(error,data,fields)
	{
		if(error)
		{
			res.redirect('/error');
		}
		else
		{
			console.log("success");
		}
	});
	con.end();

	res.redirect('/success');
});

app.set('view engine', 'ejs');

app.get('/searchInfo', function(req,res) 
{
    var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });

    /*var conn=mysql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});*/

    var query = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID;

    con.query(query,function(err,result)
    {
        if(err)
        {
            res.redirect('/error');
        }
        else 
        {
            res.render('searchRes.ejs', { contacts: result });  
        }
    });
    con.end();
});

app.get('/display', function(req,res) 
{
    var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });

    /*var conn=mysql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});*/

    var query = "SELECT * FROM clientinfo";

    con.query(query, function(err,result)
    {
        if(err)
        {
            res.redirect('/error');
        }
        else 
        {
            res.render('searchRes.ejs', { contacts: result });  
        }
    });
    con.end();
});

app.listen(process.env.PORT || 8888);