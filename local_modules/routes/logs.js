const axios = require('axios')
const dbInfo = require("../dbInfo");
const databaseInfo = new dbInfo();

module.exports={  
  getLogs: async function(params) {
     
    id = params.client_id;
    startDate = params.startDate; 
    endDate = params.endDate;

   logs = await databaseInfo.getLogsFromDb(id,startDate,endDate);

    console.log(logs);

   return  { logs};

    
  }
}
