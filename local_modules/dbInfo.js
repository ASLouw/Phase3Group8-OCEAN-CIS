const dataBaseConnection = require("./dbConnection");
const queries = require("./queries");

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

            console.log(queries.get_cleintActive,[id]);
  
            await connection.query("COMMIT");
            //clientInfo = JSON.parse(JSON.stringify(clientInfo));

            console.log("DBinfo: " + clientActive);

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
};
