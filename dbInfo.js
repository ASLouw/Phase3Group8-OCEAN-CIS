const dataBaseConnection = require("./dbConnection");
const queries = require("./queries");

module.exports = class dbInfo 
{
    async saveClientEntry(id,name,surname,method,active,password,cell,email)
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

    async updateClientEntry(name,surname,method,password,cell,email,id)
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

    async deleteClientEntry(id)
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

    async readClientEntries()
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            let clientInfo = await connection.query(queries.read_clientinfo);

            await connection.query("COMMIT");
            clientInfo = JSON.parse(JSON.stringify(clientInfo));
            return clientInfo;            
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

    async saveCardEntry(cardID,clientID,active)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");            
            await connection.query(queries.insert_cardlist,[cardID, clientID, active]);

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

    async updateCardEntry(active,id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            await connection.query(queries.update_cardlist,[active,id]);

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

    async deleteCardEntry(id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            await connection.query(queries.delete_cardlist,[id]);
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

    async readCardEntries()
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            let cardInfo = await connection.query(queries.read_cardlist);

            await connection.query("COMMIT");
            cardInfo = JSON.parse(JSON.stringify(cardInfo));
            return cardInfo;            
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

    async saveTransactionEntry(transID,clientID,valChange, oldVal, newVal, time)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");            
            await connection.query(queries.insert_transactions,[transID, clientID, valChange, oldVal, newVal, time]);

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

    async updateCardEntry(valChange, oldVal, newVal, time,id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");

            await connection.query(queries.update_transactions,[valChange, oldVal, newVal, time,id]);

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

    async deleteTransactionEntry(id)
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            await connection.query(queries.delete_transactions,[id]);
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

    async readTransactionEntries()
    {
        let connection = await dataBaseConnection();

        try
        {
            await connection.query("START TRANSACTION");
            let TransactionsInfo = await connection.query(queries.read_transactions);

            await connection.query("COMMIT");
            TransactionsInfo = JSON.parse(JSON.stringify(TransactionsInfo));
            return TransactionsInfo;            
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