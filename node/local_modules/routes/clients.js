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
}
module.exports={
   getEmail: function(params) {
     /*
     TODO link to sql
     */
     id = params.userId
     retVal = searchByID(id);
     return {email: retVal.email};
  },
  getPassword: function(params) {
    /*
    TODO link to sql
    */
    id = params.userId
    retVal = searchByID(id);
    return {password: retVal.password};
 }
}
