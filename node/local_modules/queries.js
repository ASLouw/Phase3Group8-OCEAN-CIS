module.exports = {
    insert_clientinfo: 'INSERT INTO clientinfo(clientid,client_name, client_surname, method_of_notification ,active, password, cell_number, email) VALUES (?,?,?,?,?,?.?,?)',
    get_ClientEmail: 'SELECT email FROM clientinfo WHERE clientinfo.clientid = ?',
    update_clientinfo: 'UPDATE clientinfo SET clientinfo.client_name = ?, clientinfo.client_surname = ?, clientinfo.method_of_notification = ?, clientinfo.password = ?, clientinfo.cell_number = ?, clientinfo.email = ? WHERE clientinfo.clientid = ?',   
    delete_clientinfo: 'UPDATE clientinfo SET clientinfo.active = 0 WHERE clientinfo.clientid = ?',
    get_Logs: "SELECT * FROM transactions WHERE timestamp >= ? AND timestamp <= ? AND clientid = ?",
    get_cleintActive: "SELECT active FROM clientinfo WHERE clientinfo.clientid = ?"
}