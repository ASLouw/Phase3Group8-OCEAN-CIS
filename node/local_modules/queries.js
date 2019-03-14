module.exports = {
    insert_clientinfo: 'INSERT INTO clientinfo(client_id,client_name, client_surname, method_of_notification ,active, password, cell_number, email) VALUES (?,?,?,?,?,?.?,?)',
    get_ClientEmail: 'SELECT email FROM clientinfo WHERE clientinfo.client_id = ?',
    update_clientinfo: 'UPDATE clientinfo SET clientinfo.client_name = ?, clientinfo.client_surname = ?, clientinfo.method_of_notification = ?, clientinfo.password = ?, clientinfo.cell_number = ?, clientinfo.email = ? WHERE clientinfo.client_id = ?',   
    delete_clientinfo: 'UPDATE clientinfo SET clientinfo.active = 0 WHERE clientinfo.client_id = ?'
}