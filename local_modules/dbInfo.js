const dataBaseConnection = require("./dbConnection");
const queries = require("./queries");
var http = require('http');

module.exports = class ClientInfoDB
{
    async saveEntry(name,surname,method,active,password,cell,email)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            await connection.query(queries.insert_clientinfo,[name, surname, method, active, password,cell, email]);

            await connection.query("COMMIT");
            return entity;
        }
        catch(exception)
        {
            await connection.query("ROLLBACK");
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async updateEntry(name,surname,method,password,cell,email,id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            await connection.query(queries.update_clientinfo,[name,surname,method,password,cell,email,id]);

            await connection.query("COMMIT");
            return true;
        }
        catch(exception)
        {
            await connection.query("ROLLBACK");
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async deleteEntry(id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            let deleteClient = await connection.query(queries.delete_clientinfo,[id]);
            await connection.query("COMMIT");

            //console.log("Delete client: " + JSON.stringify(deleteClient));

            if (deleteClient.changedRows > 0)
            {
              return true
            }
            else
            {
             return false;
            }
        }
        catch(exception)
        {
            await connection.query("ROLLBACK");
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async getClientActiveFromDb(id)
    {
        let connection = await dataBaseConnection();
        try
        {
            await connection.query("START TRANSACTION");
            let clientActive = await connection.query(queries.get_cleintActive,[id]);

            //console.log(queries.get_cleintActive,[id]);
  
            await connection.query("COMMIT");
            //clientInfo = JSON.parse(JSON.stringify(clientInfo));

            //console.log("DBinfo: " + clientActive);

            if (clientActive.length>0)
            {
              return clientActive[0].active;
            }
            else
            {
              return "cleint does not exist";
            }

        }
        catch(exception)
        {
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async getClientEmailFromDb(id)
    {
        let connection = await dataBaseConnection();
        try
        {
            await connection.query("START TRANSACTION");
            let clientInfo = await connection.query(queries.get_ClientEmail,[id]);
  
            await connection.query("COMMIT");
            //clientInfo = JSON.parse(JSON.stringify(clientInfo));

            if (clientInfo.length>0)
            {
              return clientInfo[0].email;
            }
            else
            {
              return "cleint does not exist";
            }

        }
        catch(exception)
        {
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async getLogsFromDb(id,startDate, endDate)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            let logs = await connection.query(queries.get_Logs,[startDate,endDate,id]);

            await connection.query("COMMIT");
            logs = JSON.parse(JSON.stringify(logs));

            return logs;           
        }
        catch(exception)
        {
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }
    
    async logDelete(id,sys)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            let count = await connection.query(queries.get_log_count);

            await connection.query("COMMIT");
            count = JSON.parse(JSON.stringify(count));
            count = count[0].total

            //console.log(count);

            if (count > 100)
            {

                //console.log("SYSTEm: " +sys)
                await connection.query("START TRANSACTION");

                let logs = await connection.query(queries.get_logs);

                await connection.query("COMMIT");

                logs = JSON.parse(JSON.stringify(logs));

                //console.log(logs);

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



                let logdata ='{"transaction_id":"'+logs[0].transaction_id+'","client_id":"'+logs[0].client_id+'","transaction_type":"'+logs[0].transaction_type+'","timestamp":"'+logs[0].timestamp+'"}';

                for(let a = 1; a <= 100; a++)
                {
                    logdata += ',{"transaction_id":"'+logs[a].transaction_id+'","client_id":"'+logs[a].client_id+'","transaction_type":"'+logs[a].transaction_type+'","timestamp":"'+logs[a].timestamp+'"}';
                }
            
                //request.write('{"system" : "CIS","data":['+ logdata+']}');
                console.log('{"system" : "CIS","data":['+ logdata+']}');  

                

                await connection.query("START TRANSACTION");

                let del = await connection.query(queries.log_delete,[id,'DELETE_'+system]);

                await connection.query("COMMIT");

                del = JSON.parse(JSON.stringify(del));
                //console.log(logs);

                console.log("Logged delete");
            }
            else
            {
                await connection.query("START TRANSACTION");

                let logs = await connection.query(queries.log_delete,[id,'DELETE_'+system]);

                await connection.query("COMMIT");

                logs = JSON.parse(JSON.stringify(logs));
               // console.log(logs);

                console.log("Logged delete");
            }

            
            return count;           
        }
        catch(exception)
        {
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async logGetActive(id,sys)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            let count = await connection.query(queries.get_log_count);

            await connection.query("COMMIT");
            count = JSON.parse(JSON.stringify(count));
            count = count[0].total

            //console.log(count);

            if (count > 100)
            {

                //console.log("SYSTEm: " +sys)
                await connection.query("START TRANSACTION");

                let logs = await connection.query(queries.get_logs);

                await connection.query("COMMIT");

                logs = JSON.parse(JSON.stringify(logs));

                //console.log(logs);

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



                let logdata ='{"transaction_id":"'+logs[0].transaction_id+'","client_id":"'+logs[0].client_id+'","transaction_type":"'+logs[0].transaction_type+'","timestamp":"'+logs[0].timestamp+'"}';

                for(let a = 1; a <= 100; a++)
                {
                    logdata += ',{"transaction_id":"'+logs[a].transaction_id+'","client_id":"'+logs[a].client_id+'","transaction_type":"'+logs[a].transaction_type+'","timestamp":"'+logs[a].timestamp+'"}';
                }
            
                //request.write('{"system" : "CIS","data":['+ logdata+']}');
                console.log('{"system" : "CIS","data":['+ logdata+']}');  

                

                await connection.query("START TRANSACTION");

                let del = await connection.query(queries.log_delete,[id,'RETRIEVE_ID_'+system]);

                await connection.query("COMMIT");

                del = JSON.parse(JSON.stringify(del));
                //console.log(logs);

                console.log("Logged Retrive id");
            }
            else
            {
                await connection.query("START TRANSACTION");

                let logs = await connection.query(queries.log_delete,[id,'RETRIEVE_ID_'+system]);

                await connection.query("COMMIT");

                logs = JSON.parse(JSON.stringify(logs));
               // console.log(logs);

                console.log("Logged Retrive id");
            }

            
            return count;           
        }
        catch(exception)
        {
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }

    async logGetEmail(id,sys)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            let count = await connection.query(queries.get_log_count);

            await connection.query("COMMIT");
            count = JSON.parse(JSON.stringify(count));
            count = count[0].total

            //console.log(count);

            if (count > 100)
            {

                //console.log("SYSTEm: " +sys)
                await connection.query("START TRANSACTION");

                let logs = await connection.query(queries.get_logs);

                await connection.query("COMMIT");

                logs = JSON.parse(JSON.stringify(logs));

                //console.log(logs);

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



                let logdata ='{"transaction_id":"'+logs[0].transaction_id+'","client_id":"'+logs[0].client_id+'","transaction_type":"'+logs[0].transaction_type+'","timestamp":"'+logs[0].timestamp+'"}';

                for(let a = 1; a <= 100; a++)
                {
                    logdata += ',{"transaction_id":"'+logs[a].transaction_id+'","client_id":"'+logs[a].client_id+'","transaction_type":"'+logs[a].transaction_type+'","timestamp":"'+logs[a].timestamp+'"}';
                }
            
                //request.write('{"system" : "CIS","data":['+ logdata+']}');
                //console.log('{"system" : "CIS","data":['+ logdata+']}');  

                

                await connection.query("START TRANSACTION");

                let del = await connection.query(queries.log_delete,[id,'RETRIEVE_EMAIL_'+system]);

                await connection.query("COMMIT");

                del = JSON.parse(JSON.stringify(del));
                //console.log(logs);

                console.log("Logged Retrive email");
            }
            else
            {
                await connection.query("START TRANSACTION");

                let logs = await connection.query(queries.log_delete,[id,'RETRIEVE_EMAIL_'+system]);

                await connection.query("COMMIT");

                logs = JSON.parse(JSON.stringify(logs));
               // console.log(logs);

                console.log("Logged Retrive email");
            }

            
            return count;           
        }
        catch(exception)
        {
            console.log(exception);
            throw exception;
        }
        finally
        {
            await connection.release();
            await connection.destroy();
        }
    }
};
