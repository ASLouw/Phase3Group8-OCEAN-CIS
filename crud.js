var express = require('express');
var app = express();
var path = require('path')
var sql = require("mysql2");
var http = require('http');
var csv = require('csv-parser');
var fileStream = require('fs');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' });

var storage = multer.diskStorage(
{
	destination: function (req, file, cb) 
	{
	  cb(null, './uploads')
	},
	filename: function (req, file, cb) 
	{
	  cb(null, file.fieldname + ".csv")
	}
})
  
var upload = multer({ storage: storage })

app.get('/views/style.css', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/style.css'));
});

app.get('/views/FNB-Logo.jpg', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/FNB-Logo.jpg'));
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

app.get('/notExist', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/notExist.html'));
});

app.get('/notActive', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/notActive.html'));
});

app.get('/active', function (req, res) 
{
    res.sendFile(path.join(__dirname+'/views/active.html'));
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
    var con=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

	var sqlQ = "INSERT INTO clientinfo (client_name, client_surname, method_of_notification, active, cell_number, email, home_address) \
				VALUES('"+req.query.clName+"','"+req.query.clSName+"','"+req.query.MoN+"', 1 ,'"+req.query.cellNum+"','"+req.query.email+"','"+req.query.address+"')";
  
	con.query(sqlQ, function(error,result)
	{
		if(error)
		{
			res.redirect('/error');
		}
		else
		{
			//console.log(result.insertId);
			var options = {
				host: '127.0.0.1',
				path: '/createUser',
				port: '8000',
				method: 'POST',
				headers : {'Content-Type': 'application/json'}
			};
		
			var request = http.request(options);
		
			request.on('error', function(e) {
				console.log('problem with request: ' + e.message);
			  });
			
			request.write('{"system":"CIS","client_id" : "'+ result.insertId +'"}');
			request.end();
			
			var conn=sql.createConnection(
			{
				host : "eu-cdbr-west-02.cleardb.net",
				user : "bdffef71b5c89d",
				password : "6e8120b4",
				database : "heroku_e0c1ec409484908"
			});

		    var sqlQ = "SELECT COUNT(transaction_id) as total FROM transactions";

		    conn.query(sqlQ, function(error, resul)
		    {
		    	if(error)
		    	{

		    	}

		    	else
		    	{
		    		if(resul[0].total > 100)
		    		{
		    			var connect=sql.createConnection(
						{
							host : "eu-cdbr-west-02.cleardb.net",
							user : "bdffef71b5c89d",
							password : "6e8120b4",
							database : "heroku_e0c1ec409484908"
						});
		    			var sqlQ = "SELECT transaction_id, client_id, transaction_type, UNIX_TIMESTAMP(timestamp) as timestamp  FROM transactions";
		    			connect.query(sqlQ, function(err, rows)
		    			{
		    				if(err)
		    				{
		    					throw err;
		    				}

		    				else
		    				{
								//Send Result object from here or save to global variable to send via different means

								/*var options = {
									host: '127.0.0.1',
									path: '/createUser',
									port: '8000',
									method: 'POST',
									headers : {'Content-Type': 'application/json'}
								};
							
								var request = http.request(options);
							
								request.on('error', function(e) {
									console.log('problem with request: ' + e.message);
								  });*/

								logdata ='{"transaction_id":"'+rows[0].transaction_id+'","client_id":"'+rows[0].client_id+'","transaction_type":"'+rows[0].transaction_type+'","timestamp":"'+rows[0].timestamp+'"}';

								for(a = 1; a <= 100; a++)
								{
									logdata += ',{"transaction_id":"'+rows[a].transaction_id+'","client_id":"'+rows[a].client_id+'","transaction_type":"'+rows[a].transaction_type+'","timestamp":"'+rows[a].timestamp+'"}';
								}
								
								//request.write('{"system" : "CIS","data":['+ logdata+']}');
								console.log('{"system" : "CIS","data":['+ logdata+']}');  
								//request.end();

								/*var connectA=sql.createConnection(
									{
										host : "eu-cdbr-west-02.cleardb.net",
										user : "bdffef71b5c89d",
										password : "6e8120b4",
										database : "heroku_e0c1ec409484908"
									});*/

									var connectA=sql.createConnection(
									{
										host : "localhost",
										user : "root",
										password : "",
										database : "u17140634_cos301_client_information_database"
									});
									var sqlQ = "DELETE FROM transactions";
									connectA.query(sqlQ, function(err, resl)
									{
										if(err)
										{
											throw err;
										}
			
										else
										{
											console.log('Logs Cleared');
										}
									});
									connectA.end();								
		    				}
		    			});
		    			connect.end();
		    		}

		    		var connect=sql.createConnection(
					{
						host : "eu-cdbr-west-02.cleardb.net",
						user : "bdffef71b5c89d",
						password : "6e8120b4",
						database : "heroku_e0c1ec409484908"
					});

	    			var sqlQ = "INSERT INTO transactions (client_id, transaction_type) VALUES ('"+result.insertId+"', 'INSERT')";
	    			connect.query(sqlQ, function(err, resl)
	    			{
	    				if(err)
	    				{
	    					throw err;
	    				}

	    				else
	    				{
	    					console.log('Log Success');
	    				}
	    			});
	    			connect.end();
		    	}
		    });
		    conn.end();
			console.log("success");
		}
	});
	con.end();

	res.redirect('/success');
});

app.post('/insertInfoCSV',upload.single('csvfile') ,function (req, res,next)
{	
	fileStream.createReadStream("uploads/csvfile.csv")
		.pipe(csv())
		.on('data',(row) => 
		{
			var con=sql.createConnection(
				{
					host : "eu-cdbr-west-02.cleardb.net",
					user : "bdffef71b5c89d",
					password : "6e8120b4",
					database : "heroku_e0c1ec409484908"
				});		

			var sqlQ = "INSERT INTO clientinfo (client_name, client_surname, method_of_notification, active, cell_number, email, home_address) VALUES('"+row.Name+"','"+row.Surname+"','"+row.Method+"', 1 ,'"+row.CellNumber+"','"+row.Email+"','"+row.HomeAddress+"')";

			con.query(sqlQ, function(error,result)
			{
				if(error)
				{
					res.redirect('/error');
				}
				else
				{
					var options = {
						host: '127.0.0.1',
						path: '/createUser',
						port: '8000',
						method: 'POST',
						headers : {'Content-Type': 'application/json'}
					};
				
					var request = http.request(options);
				
					request.on('error', function(e) {
						console.log('problem with request: ' + e.message);
					  });
					
					request.write('{"system":"CIS","client_id" : "'+ result.insertId +'"}');
					request.end();

					var conn=sql.createConnection(
					{
						host : "eu-cdbr-west-02.cleardb.net",
						user : "bdffef71b5c89d",
						password : "6e8120b4",
						database : "heroku_e0c1ec409484908"
					});

				    var sqlQ = "SELECT COUNT(transaction_id) as total FROM transactions";

				    conn.query(sqlQ, function(error, resul)
				    {
				    	if(error)
				    	{

				    	}

				    	else
				    	{
				    		if(resul[0].total > 100)
				    		{
				    			var connect=sql.createConnection(
								{
									host : "eu-cdbr-west-02.cleardb.net",
									user : "bdffef71b5c89d",
									password : "6e8120b4",
									database : "heroku_e0c1ec409484908"
								});
				    			var sqlQ = "SELECT transaction_id, client_id, transaction_type, UNIX_TIMESTAMP(timestamp) as timestamp FROM transactions";
				    			connect.query(sqlQ, function(err, rows)
				    			{
				    				if(err)
				    				{
				    					throw err;
				    				}

				    				else
				    				{
										//Send Result object from here or save to global variable to send via different means
										/*var options = {
										host: '127.0.0.1',
										path: '/createUser',
										port: '8000',
										method: 'POST',
										headers : {'Content-Type': 'application/json'}
										};
									
										var request = http.request(options);
								
										request.on('error', function(e) {
										console.log('problem with request: ' + e.message);
										});*/

										logdata ='{"transaction_id":"'+rows[0].transaction_id+'","client_id":"'+rows[0].client_id+'","transaction_type":"'+rows[0].transaction_type+'","timestamp":"'+rows[0].timestamp+'"}';

										for(a = 1; a <= 100; a++)
										{
											logdata += ',{"transaction_id":"'+rows[a].transaction_id+'","client_id":"'+rows[a].client_id+'","transaction_type":"'+rows[a].transaction_type+'","timestamp":"'+rows[a].timestamp+'"}';
										}
									
										//request.write('{"system" : "CIS","data":['+ logdata+']}');
										console.log('{"system" : "CIS","data":['+ logdata+']}');  
										//request.end();

										/*var connectA=sql.createConnection(
										{
											host : "eu-cdbr-west-02.cleardb.net",
											user : "bdffef71b5c89d",
											password : "6e8120b4",
											database : "heroku_e0c1ec409484908"
										});*/

										var connectA=sql.createConnection(
										{
											host : "localhost",
											user : "root",
											password : "",
											database : "u17140634_cos301_client_information_database"
										});
										var sqlQ = "DELETE FROM transactions";
										connectA.query(sqlQ, function(err, resl)
										{
											if(err)
											{
												throw err;
											}
				
											else
											{
												console.log('Logs Cleared');
											}
										});
										connectA.end();		
				    				}
				    			});
				    			connect.end();
				    		}

				    		var connect=sql.createConnection(
							{
								host : "eu-cdbr-west-02.cleardb.net",
								user : "bdffef71b5c89d",
								password : "6e8120b4",
								database : "heroku_e0c1ec409484908"
							});
			    			var sqlQ = "INSERT INTO transactions (client_id, transaction_type) VALUES ('"+result.insertId+"', 'INSERT')";
			    			connect.query(sqlQ, function(err, resl)
			    			{
			    				if(err)
			    				{
			    					throw err;
			    				}

			    				else
			    				{
			    					console.log('Log Success');
			    				}
			    			});
			    			connect.end();
				    	}
				    });
				    conn.end();

					console.log("success");
				}
			});

			con.end();

		})
		.on('end',() => {
			console.log('CSV file successfully processed');
		});	

	res.redirect('/success');
});

app.get('/updateinfo', function (req, res)
{
   /* var con = sql.createConnection(
    {
      host: "localhost",
      user: "root",
      password: "",
      database: "u17140634_cos301_client_information_database"
    });*/

    var conA=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID;

    conA.query(sqlQ, function(error,data,fields)
	{
		if(data.length == 0)
		{
			res.redirect('/notExist');
		}
		else
		{
			var conB=sql.createConnection(
			{
				host : "eu-cdbr-west-02.cleardb.net",
				user : "bdffef71b5c89d",
				password : "6e8120b4",
				database : "heroku_e0c1ec409484908"
			});

		    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID+" AND active = 1";

		    conB.query(sqlQ, function(error,data,fields)
			{
				if(data.length == 0)
				{
					res.redirect('/notActive');
				}
				else
				{
					var con=sql.createConnection(
					{
						host : "eu-cdbr-west-02.cleardb.net",
						user : "bdffef71b5c89d",
						password : "6e8120b4",
						database : "heroku_e0c1ec409484908"
					});

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

						var conn = sql.createConnection(
						{
							host : "eu-cdbr-west-02.cleardb.net",
							user : "bdffef71b5c89d",
							password : "6e8120b4",
							database : "heroku_e0c1ec409484908"
						});

						/*var conn = sql.createConnection(
					    {
					      host: "localhost",
					      user: "root",
					      password: "",
					      database: "u17140634_cos301_client_information_database"
					    });*/

						var sqlQ = "UPDATE clientinfo SET clientinfo.client_name = '"+ name +"', clientinfo.client_surname = '"+ sName +"', clientinfo.method_of_notification = '"+ MoN +"', clientinfo.cell_number = '"+ cN +"', clientinfo.email = '"+ Em +"', clientinfo.home_address = '"+ addr +"' WHERE clientinfo.client_id = "+req.query.clID;

					    conn.query(sqlQ, function(error,data,fields)
						{
							if(error)
							{
								res.redirect('/error');
							}
							else
							{
								var conn=sql.createConnection(
								{
									host : "eu-cdbr-west-02.cleardb.net",
									user : "bdffef71b5c89d",
									password : "6e8120b4",
									database : "heroku_e0c1ec409484908"
								});

							    var sqlQ = "SELECT COUNT(transaction_id) as total FROM transactions";

							    conn.query(sqlQ, function(error, resul)
							    {
							    	if(error)
							    	{

							    	}

							    	else
							    	{
							    		if(resul[0].total > 100)
							    		{
							    			var connect=sql.createConnection(
											{
												host : "eu-cdbr-west-02.cleardb.net",
												user : "bdffef71b5c89d",
												password : "6e8120b4",
												database : "heroku_e0c1ec409484908"
											});
							    			var sqlQ = "SELECT transaction_id, client_id, transaction_type, UNIX_TIMESTAMP(timestamp) as timestamp FROM transactions";
							    			connect.query(sqlQ, function(err, rows)
							    			{
							    				if(err)
							    				{
							    					throw err;
							    				}

							    				else
							    				{
							    					//console.log(resl);
													//Send Result object from here or save to global variable to send via different means
													
													/*var options = {
													host: '127.0.0.1',
													path: '/createUser',
													port: '8000',
													method: 'POST',
													headers : {'Content-Type': 'application/json'}
													};
												
													var request = http.request(options);
												
													request.on('error', function(e) {
														console.log('problem with request: ' + e.message);
													});*/

													logdata ='{"transaction_id":"'+rows[0].transaction_id+'","client_id":"'+rows[0].client_id+'","transaction_type":"'+rows[0].transaction_type+'","timestamp":"'+rows[0].timestamp+'"}';

													for(a = 1; a <= 100; a++)
													{
														logdata += ',{"transaction_id":"'+rows[a].transaction_id+'","client_id":"'+rows[a].client_id+'","transaction_type":"'+rows[a].transaction_type+'","timestamp":"'+rows[a].timestamp+'"}';
													}
													
													//request.write('{"system" : "CIS","data":['+ logdata+']}');
													console.log('{"system" : "CIS","data":['+ logdata+']}');  
													//request.end();

													/*var connectA=sql.createConnection(
													{
														host : "eu-cdbr-west-02.cleardb.net",
														user : "bdffef71b5c89d",
														password : "6e8120b4",
														database : "heroku_e0c1ec409484908"
													});*/

													var connectA=sql.createConnection(
													{
														host : "localhost",
														user : "root",
														password : "",
														database : "u17140634_cos301_client_information_database"
													});
													var sqlQ = "DELETE FROM transactions";
													connectA.query(sqlQ, function(err, resl)
													{
														if(err)
														{
															throw err;
														}
							
														else
														{
															console.log('Logs Cleared');
														}
													});
													connectA.end();			
							    				}
							    			});
							    			connect.end();
							    		}

							    		var connect=sql.createConnection(
										{
											host : "eu-cdbr-west-02.cleardb.net",
											user : "bdffef71b5c89d",
											password : "6e8120b4",
											database : "heroku_e0c1ec409484908"
										});
						    			var sqlQ = "INSERT INTO transactions (client_id, transaction_type) VALUES ('"+req.query.clID+"', 'UPDATED')";
						    			connect.query(sqlQ, function(err, resl)
						    			{
						    				if(err)
						    				{
						    					throw err;
						    				}

						    				else
						    				{
						    					console.log('Log Success');
						    				}
						    			});
						    			connect.end();
							    	}
							    });
							    conn.end();
								console.log('success');
							}
						});
						conn.end();
					});
					con.end();
					res.redirect('/success');
				}
			});
			conB.end();
		}
	});
	conA.end();
});

app.get('/deleteinfo', function (req, res)
{
    var conA=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID;

    conA.query(sqlQ, function(error,data,fields)
	{
		if(data.length == 0)
		{
			res.redirect('/notExist');
		}

		else
		{
			var conB=sql.createConnection(
			{
				host : "eu-cdbr-west-02.cleardb.net",
				user : "bdffef71b5c89d",
				password : "6e8120b4",
				database : "heroku_e0c1ec409484908"
			});

		    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID+" AND active = 1";

		    conB.query(sqlQ, function(error,data,fields)
			{
				if(data.length == 0)
				{
					res.redirect('/notActive');
				}

				else
				{
					var con=sql.createConnection(
					{
						host : "eu-cdbr-west-02.cleardb.net",
						user : "bdffef71b5c89d",
						password : "6e8120b4",
						database : "heroku_e0c1ec409484908"
					});

				    var sqlQ = "UPDATE clientinfo SET clientinfo.active = 0 WHERE clientinfo.client_id = "+req.query.clID;

				    con.query(sqlQ, function(error,data,fields)
					{
						if(error)
						{
							res.redirect('/error');
						}
						else
						{
							var conn=sql.createConnection(
							{
								host : "eu-cdbr-west-02.cleardb.net",
								user : "bdffef71b5c89d",
								password : "6e8120b4",
								database : "heroku_e0c1ec409484908"
							});

						    var sqlQ = "SELECT COUNT(transaction_id) as total FROM transactions";

						    conn.query(sqlQ, function(error, resul)
						    {
						    	if(error)
						    	{

						    	}

						    	else
						    	{
						    		if(resul[0].total > 100)
						    		{
						    			var connect=sql.createConnection(
										{
											host : "eu-cdbr-west-02.cleardb.net",
											user : "bdffef71b5c89d",
											password : "6e8120b4",
											database : "heroku_e0c1ec409484908"
										});
						    			var sqlQ = "SELECT transaction_id, client_id, transaction_type, UNIX_TIMESTAMP(timestamp) as timestamp FROM transactions";
						    			connect.query(sqlQ, function(err, rows)
						    			{
						    				if(err)
						    				{
						    					throw err;
						    				}

						    				else
						    				{
												//Send Result object from here or save to global variable to send via different means
												/*var options = {
													host: '127.0.0.1',
													path: '/createUser',
													port: '8000',
													method: 'POST',
													headers : {'Content-Type': 'application/json'}
												};
											
												var request = http.request(options);
											
												request.on('error', function(e) {
													console.log('problem with request: ' + e.message);
												  });*/

												  logdata ='{"transaction_id":"'+rows[0].transaction_id+'","client_id":"'+rows[0].client_id+'","transaction_type":"'+rows[0].transaction_type+'","timestamp":"'+rows[0].timestamp+'"}';

												  for(a = 1; a <= 100; a++)
												  {
													  logdata += ',{"transaction_id":"'+rows[a].transaction_id+'","client_id":"'+rows[a].client_id+'","transaction_type":"'+rows[a].transaction_type+'","timestamp":"'+rows[a].timestamp+'"}';
												  }
												  
												  //request.write('{"system" : "CIS","data":['+ logdata+']}');
												  console.log('{"system" : "CIS","data":['+ logdata+']}');  
												  //request.end();

												/*var connectA=sql.createConnection(
												{
													host : "eu-cdbr-west-02.cleardb.net",
													user : "bdffef71b5c89d",
													password : "6e8120b4",
													database : "heroku_e0c1ec409484908"
												});*/
				  
											  	var connectA=sql.createConnection(
												{
													host : "localhost",
													user : "root",
													password : "",
													database : "u17140634_cos301_client_information_database"
												});
												var sqlQ = "DELETE FROM transactions";
												connectA.query(sqlQ, function(err, resl)
												{
													if(err)
													{
														throw err;
													}
						
													else
													{
														console.log('Logs Cleared');
													}
												});
												connectA.end();				
						    				}
						    			});
						    			connect.end();
						    		}

						    		var connect=sql.createConnection(
									{
										host : "eu-cdbr-west-02.cleardb.net",
										user : "bdffef71b5c89d",
										password : "6e8120b4",
										database : "heroku_e0c1ec409484908"
									});
					    			var sqlQ = "INSERT INTO transactions (client_id, transaction_type) VALUES ('"+req.query.clID+"', 'DELETED')";
					    			connect.query(sqlQ, function(err, resl)
					    			{
					    				if(err)
					    				{
					    					throw err;
					    				}

					    				else
					    				{
					    					console.log('Log Success');
					    				}
					    			});
					    			connect.end();
						    	}
						    });
						    conn.end();
							console.log("success");
						}
					});
					con.end();

					var options = 
					{
						host: '127.0.0.1',
						path: '/deleteClientFromInterface',
						port: '8000',
						method: 'POST',
						headers : {'Content-Type': 'application/json'}
					};

					var request = http.request(options);

					request.on('error', function(e) 
					{
						console.log('problem with request: ' + e.message);
					});
					
					request.write('{"system":"CIS","client_id" : "'+ req.query.clID +'"}');
					request.end();

					res.redirect('/success');
				}
			});
			conB.end();
		}
	});
	conA.end();
});

app.get('/reactivateInfo', function (req, res)
{
	var conA=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID;

    conA.query(sqlQ, function(error,data,fields)
	{
		if(data.length == 0)
		{
			res.redirect('/notExist');
		}

		else
		{
			var conB=sql.createConnection(
			{
				host : "eu-cdbr-west-02.cleardb.net",
				user : "bdffef71b5c89d",
				password : "6e8120b4",
				database : "heroku_e0c1ec409484908"
			});

		    var sqlQ = "SELECT * FROM clientinfo WHERE client_id = "+req.query.clID+" AND active = 0";

		    conB.query(sqlQ, function(error,data,fields)
			{
				if(data.length == 0)
				{
					res.redirect('/active');
				}

				else
				{
					var con=sql.createConnection(
					{
						host : "eu-cdbr-west-02.cleardb.net",
						user : "bdffef71b5c89d",
						password : "6e8120b4",
						database : "heroku_e0c1ec409484908"
					});

				    var sqlQ = "UPDATE clientinfo SET  clientinfo.active = 1 WHERE clientinfo.client_id = "+req.query.clID;

				    con.query(sqlQ, function(error,data,fields)
					{
						if(error)
						{
							res.redirect('/error');
						}
						else
						{
							var conn=sql.createConnection(
							{
								host : "eu-cdbr-west-02.cleardb.net",
								user : "bdffef71b5c89d",
								password : "6e8120b4",
								database : "heroku_e0c1ec409484908"
							});

						    var sqlQ = "SELECT COUNT(transaction_id) as total FROM transactions";

						    conn.query(sqlQ, function(error, resul)
						    {
						    	if(error)
						    	{

						    	}

						    	else
						    	{
						    		if(resul[0].total > 100)
						    		{
						    			var connect=sql.createConnection(
										{
											host : "eu-cdbr-west-02.cleardb.net",
											user : "bdffef71b5c89d",
											password : "6e8120b4",
											database : "heroku_e0c1ec409484908"
										});
						    			var sqlQ = "SELECT transaction_id, client_id, transaction_type, UNIX_TIMESTAMP(timestamp) as timestamp FROM transactions";
						    			connect.query(sqlQ, function(err, rows)
						    			{
						    				if(err)
						    				{
						    					throw err;
						    				}

						    				else
						    				{
												//Send Result object from here or save to global variable to send via different means
												/*var options = {
													host: '127.0.0.1',
													path: '/createUser',
													port: '8000',
													method: 'POST',
													headers : {'Content-Type': 'application/json'}
												};
											
												var request = http.request(options);
											
												request.on('error', function(e) {
													console.log('problem with request: ' + e.message);
												  });*/

												  logdata ='{"transaction_id":"'+rows[0].transaction_id+'","client_id":"'+rows[0].client_id+'","transaction_type":"'+rows[0].transaction_type+'","timestamp":"'+rows[0].timestamp+'"}';

												  for(a = 1; a <= 100; a++)
												  {
													  logdata += ',{"transaction_id":"'+rows[a].transaction_id+'","client_id":"'+rows[a].client_id+'","transaction_type":"'+rows[a].transaction_type+'","timestamp":"'+rows[a].timestamp+'"}';
												  }
												  
												  //request.write('{"system" : "CIS","data":['+ logdata+']}');
												  console.log('{"system" : "CIS","data":['+ logdata+']}');  
												  //request.end();

												/*var connectA=sql.createConnection(
												{
													host : "eu-cdbr-west-02.cleardb.net",
													user : "bdffef71b5c89d",
													password : "6e8120b4",
													database : "heroku_e0c1ec409484908"
												});*/
				  
												var connectA=sql.createConnection(
												{
													host : "localhost",
													user : "root",
													password : "",
													database : "u17140634_cos301_client_information_database"
												});
												var sqlQ = "DELETE FROM transactions";
												connectA.query(sqlQ, function(err, resl)
												{
													if(err)
													{
														throw err;
													}
						
													else
													{
														console.log('Logs Cleared');
													}
												});
												connectA.end();		
						    				}
						    			});
						    			connect.end();
						    		}

									var connect=sql.createConnection(
									{
										host : "eu-cdbr-west-02.cleardb.net",
										user : "bdffef71b5c89d",
										password : "6e8120b4",
										database : "heroku_e0c1ec409484908"
									});
					    			var sqlQ = "INSERT INTO transactions (client_id, transaction_type) VALUES ('"+req.query.clID+"', 'REACTIVATED')";
					    			connect.query(sqlQ, function(err, resl)
					    			{
					    				if(err)
					    				{
					    					throw err;
					    				}

					    				else
					    				{
					    					console.log('Log Success');
					    				}
					    			});
					    			connect.end();
					    	}
						    });
						    conn.end();
							console.log("success");
						}
					});
					con.end();		

					var options = {
						host: '127.0.0.1',
						path: '/reactivate',
						port: '8000',
						method: 'POST',
						headers : {'Content-Type': 'application/json'}
					};

					var request = http.request(options);

					request.on('error', function(e) {
						console.log('problem with request: ' + e.message);
					  });
					
					request.write('{"system":"CIS","client_id" : "'+ req.query.clID +'"}');
					request.end();

					res.redirect('/success');
				}
			});
			conB.end();
		}
	});
	conA.end();
});

app.set('view engine', 'ejs');

app.get('/searchInfo', function(req,res) 
{
    var con=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

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
    var con=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

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

app.get('/displayAct', function(req,res) 
{
    var con=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

    var query = "SELECT * FROM clientinfo WHERE active = 1";

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

app.get('/displayInact', function(req,res) 
{   
    var con=sql.createConnection(
	{
		host : "eu-cdbr-west-02.cleardb.net",
		user : "bdffef71b5c89d",
		password : "6e8120b4",
		database : "heroku_e0c1ec409484908"
	});

    var query = "SELECT * FROM clientinfo WHERE active = 0";

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