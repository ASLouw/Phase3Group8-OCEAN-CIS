//dependencies
const dbInfo = require("./dbInfo");
const clientInfo = new dbInfo();

const app = async() => {
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

app();