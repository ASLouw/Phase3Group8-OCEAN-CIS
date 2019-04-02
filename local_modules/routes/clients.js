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



module.exports={
  notifyAll:function(changeObj)
  {
    var listen={};
    for (var i=0; i<listeners.length;i++)
    {
      listen = listeners[i];
      axios.post(listen, changeObj).catch(function (error) {
        console.log("Could not send the update to this listeners: "+listen);
      });
    }
  },
  createUser: function(params)
  {
    //used with crud
    id = params.client_id;
    console.log(id);
    module.exports.notifyAll({
      "ID":id,
      "Operation":"CREATE"
    });
    return "Systems notified of client added";
  },
  deleteUser: function(params)
  {
    id = params.client_id;
    system = params.system;

    //console.log("System: " + system)

    /*console.log(id);
    return "Systems notified of client deleted";*/

      return databaseInfo.deleteEntry(id).then(function(value)
      {
          //console.log("Value: " +value);

        count = databaseInfo.logDelete(id,system);

        //console.log("clients.js: " +count);

        if(value == true)
        {
          module.exports.notifyAll({
            "ID":id,
            "Operation":"DELETE"
          });
          return true;
        }
        else if(value == "cleint does not exist")
          return "cleint does not exist"
        else
          return false;
      });

  },
  getEmail: async function(params) {

    id = params.client_id;
    system = params.system;

   return databaseInfo.getClientEmailFromDb(id).then(function(value)
    {
      console.log(value);
      if(value != "cleint does not exist")
      {
        log = databaseInfo.logGetEmail(id,system);
        return {email: value}
      }
      else
        return "cleint does not exist";
    })

  },
  getActive: async function(params) {
   id = params.client_id;
   system = params.system;
   /*if(system == undefined)
    system = "CIS";*/


  return databaseInfo.getClientActiveFromDb(id).then(function(value){console.log(value);

    if(value == "cleint does not exist")
    {
      return "cleint does not exist";
    }
    else if(value == "1")
    {
      log = databaseInfo.logGetActive(id,system);
      return true;
    }
    else
    {
      log = databaseInfo.logGetActive(id,system);
      return false;
    }

    });
  },
  reactivateUser: function(params)
  {
    //used with crud
    //console.log("ID: " +params.client_id);
    id = params.client_id;
    module.exports.notifyAll({
      "ID":id,
      "Operation":"CREATE"
    });

    //console.log("Systems notified of re-activation");
    return "Systems notified of re-activation";
  },
  deleteUserFromInterface: function(params)
  {
    //used with crud
    //console.log("ID: " +params.client_id);
    id = params.client_id;
    module.exports.notifyAll({
      "ID":id,
      "Operation":"DELETE"
    });

    //console.log("Systems notified of re-activation");
    return "Systems notified of deletion";
  },
 subscribe: function(params)
 {
   console.log(params);
   listeners.push(params.URL);
   return "subscribed!";
 }
}
