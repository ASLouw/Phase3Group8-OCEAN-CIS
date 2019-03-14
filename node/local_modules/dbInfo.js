const dataBaseConnection = require("./dbConnection");
const queries = require("./queries");

module.exports = class ClientInfoDB 
{
    async saveEntry(id,name,surname,method,active,password,cell,email)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");            
            await connection.query(queries.insert_clientinfo,[id, name, surname, method, active, password,cell, email]);

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
            await connection.query(queries.delete_clientinfo,[id]);
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

    async getClientEmailFromDb(id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            //console.log(queries.get_ClientEmail,[id]);
            let clientInfo = await connection.query(queries.get_ClientEmail,[id]);

            await connection.query("COMMIT");
            //clientInfo = JSON.parse(JSON.stringify(clientInfo));

            //console.log(clientInfo[0].email);
            return new Promise (function (res,reject) { res(clientInfo[0].email)});            
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