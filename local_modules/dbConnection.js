const mysql = require('promise-mysql');

const dbConfig = { host:"eu-cdbr-west-02.cleardb.net", user:"bdffef71b5c89d", password:"6e8120b4", database:"heroku_e0c1ec409484908"}

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
