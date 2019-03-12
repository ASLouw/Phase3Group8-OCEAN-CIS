const mysql = require('promise-mysql');

const dbConfig = {user:"root", password:"", database:"u17140634_cos301_client_information_database", host:"localhost"}

module.exports = async () => {
    try
    {
        let pool;
        let conection;
        if(pool)
        conection = pool.getConnection();
        else
        {
            pool = await mysql.createPool(dbConfig);
            conection = pool.getConnection();
        }
        return conection;
    }
    catch(exception)
    {
        throw exception;
    }
}