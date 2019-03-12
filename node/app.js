//dependencies
const dbInfo = require("./local_modules/dbInfo");
const express = require('express');
const clients = require('./local_modules/routes/clients');
const app = express()
const clientInfo = new dbInfo();
const port = 3000;

app.get('/useremail/:userId', (req, res) => res.send(clients.getEmail(req.params)));
app.get('/userpassword/:userId', (req, res) => res.send(clients.getPassword(req.params)));

app.listen(port, () => console.log(`App listening on port ${port}!`))
/*const app = async() => {
    //let saveClient = await clientInfo.saveEntry(1,"Bob", "Doe", "SMS", 1,"qwerty", "0784693485", "bobDoe@gamil.com"
    //);

   // console.log("Saved client -->", saveClient);



    let updateClient = await clientInfo.updateEntry("Jhon","Doe","Email","qwerty","0784693485","jhonDoe@gamil.com",1);

    console.log("Updated client -->", updateClient);

    let deleteClient = await clientInfo.deleteEntry(1);

    console.log("Deleted client -->", deleteClient);

    let clientList = await clientInfo.readEntries()
    console.log("List -->",clientList);
}

app();*/
