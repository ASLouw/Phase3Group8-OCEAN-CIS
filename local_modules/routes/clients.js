const axios = require('axios')
const dbInfo = require("../dbInfo");
const databaseInfo = new dbInfo();

/*const userList = [
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
];*/
var listeners = []

/*function searchByID(id)
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
};*/

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

    id = params.client_id;
    console.log(id);
    notifyAll({});
    return "Systems notified of client added";
  },
  deleteUser: function(params)
  {
    id = params.client_id;

    /*console.log(id);
    notifyAll({});
    return "Systems notified of client deleted";*/

    return databaseInfo.deleteEntry(id).then(function(value)
    {
        //console.log("Value: " +value);
      if(value == true)
      {
        notifyAll({});
        return true;
      }      
      else
        return false;
    });
  },
  getEmail: async function(params) {
    
    id = params.client_id;

   return databaseInfo.getClientEmailFromDb(id).then(function(value){console.log(value);
     return {email: value}});
  },
  getActive: async function(params) {    
   id = params.client_id;
  
  return databaseInfo.getClientActiveFromDb(id).then(function(value){console.log(value);
    if(value == "1")
      return true;
    else
    return false;
    });  
  },
  reactivateUser: function(params)
  {

    //console.log("ID: " +params.client_id);
    id = params.client_id;
    notifyAll({});

    //console.log("Systems notified of re-activation");
    return "Systems notified of re-activation";    
  },
  deleteUserFromInterface: function(params)
  {

    //console.log("ID: " +params.client_id);
    id = params.client_id;
    notifyAll({});

    //console.log("Systems notified of re-activation");
    return "Systems notified of deletion";    
  },
  /*getUsers: function(params){
    /*
    TODO link to sql
    

    return userList;
  },*/
 subscribe: function(params)
 {
   console.log(params);
   listeners.push(params.URL);
   return "subscribed!";
 }
}
