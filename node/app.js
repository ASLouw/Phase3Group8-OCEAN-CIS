//dependencies
const dbInfo = require("./dbInfo");
const databaseInfo = new dbInfo();

const app = async() => {
    let saveClient = await databaseInfo.saveClientEntry(1,"Bob", "Doe", "SMS", 1,"qwerty", "0784693485", "bobDoe@gamil.com"
    );

    console.log("Saved client -->", saveClient);

    

    let updateClient = await databaseInfo.updateClientEntry("Jhon","Doe","Email","qwerty","0784693485","jhonDoe@gamil.com",1);

    console.log("Updated client -->", updateClient);

    let deleteClient = await databaseInfo.deleteClientEntry(1);

    console.log("Deleted client -->", deleteClient);

    let clientList = await databaseInfo.readClientEntries()
    console.log("List -->",clientList);

    let saveTransaction = await databaseInfo.saveTransactionEntry(1,1,"7","100","93", "2019-03-12 22:51:56"  );
    console.log("Saved transaction -->", saveTransaction);

    let saveTransaction2 = await databaseInfo.saveTransactionEntry(2,1,"25","100","75", "2019-03-12 23:12:56"  );
    console.log("Saved transaction -->", saveTransaction2);

    let updateTransaction = await databaseInfo.updateCardEntry("45", "90", "45", "2019-03-13 17:31:56",1);

    console.log("Updated transaction -->", updateTransaction);

    let deleteTransaction = await databaseInfo.deleteTransactionEntry(1);

    console.log("Deleted transaction -->", deleteTransaction);

    let transactionList = await databaseInfo.readTransactionEntries()
    console.log("List -->",transactionList);
}

app();