const axios = require('axios')
const dbInfo = require("../dbInfo");
const databaseInfo = new dbInfo();

const userList = [
  {
    userId: 00,
    email: "00@gmail.com",
    password:"3i4wtujfvdjenciuwrfnesl_AA+_SF"
  },
  {
    userId: 01,
    email: "01@gmail.com",
    password:"fsjdnvjndfvjhbrghrthwpbdsv"
  },
  {
    userId: 02,
    email: "02@gmail.com",
    password:"fnskdnfakdfnsdfacoerijfascn"
  },
  {
    userId: 03,
    email: "03@gmail.com",
    password:"ndjksfnskafdjkafsl"
  },
  {
    userId: 04,
    email: "04@gmail.com",
    password:"nfsdfksfaksdfgjsf"
  },
  {
    userId: 05,
    email: "05@gmail.com",
    password:"skjfhksjahfaklsf"
  }
];
var listeners = []

function searchByID(id)
{
  var retVal = {}
  var u = null;
  for(var i = 0; i< userList.length;i++)
  {
    u = userList[i]
    if(u.userId == id)
    {
      retVal = u;
      break;
    }
  }
  return retVal;
};

function notifyAll(changeObj)
{
  var listen={};
  for (var i=0; i<listeners.length;i++)
  {
    listen = listeners[i];
    axios.post(listen, changeObj)
  }
};

module.exports={
  createUser: function(params)
  {
    notifyAll({});
    return "user created!"
  },
  deleteUser: function(params)
  {
    /*
    TODO link to sql
    */
    notifyAll({});
    return "user created!"
  },
  getEmail: async function(params) {
     /*
     TODO link to sql
     */

    id = params.userId; 

    
    //works aswell if you log task 
    //return await new Promise (function(success, reject){success(databaseInfo.getClientEmailFromDb(id).then(function (task){console.log(task); return task; }))});



  //this works for the console.log
  /* clientemail = await databaseInfo.getClientEmailFromDb(id);

    console.log(clientemail);

   return  {email: clientemail};*/

    
  },
  getUsers: function(params){
    /*
    TODO link to sql
    */

    return userList;
  },
 subscribe: function(params)
 {
   console.log(params);
   listeners.push(params.URL);
   return "subscribed!";
 }
}
