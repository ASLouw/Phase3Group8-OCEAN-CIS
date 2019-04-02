module.exports = {
    insert_clientinfo: 'INSERT INTO clientinfo(client_id,client_name, client_surname, method_of_notification ,active, password, cell_number, email) VALUES (?,?,?,?,?,?.?,?)',
    get_ClientEmail: 'SELECT email FROM clientinfo WHERE clientinfo.client_id = ?',
    update_clientinfo: 'UPDATE clientinfo SET clientinfo.client_name = ?, clientinfo.client_surname = ?, clientinfo.method_of_notification = ?, clientinfo.password = ?, clientinfo.cell_number = ?, clientinfo.email = ? WHERE clientinfo.client_id = ?',
    delete_clientinfo: 'UPDATE clientinfo SET clientinfo.active = 0 WHERE clientinfo.client_id = ?',
    //get_Logs: "SELECT * FROM transactions WHERE timestamp >= ? AND timestamp <= ? AND client_id = ?",
    get_cleintActive: "SELECT active FROM clientinfo WHERE clientinfo.client_id = ?",
    get_log_count: "SELECT COUNT(transaction_id) as total FROM transactions",
    get_logs: "SELECT transaction_id, client_id, transaction_type, UNIX_TIMESTAMP(timestamp) as timestamp FROM transactions",
    log_delete: "INSERT INTO transactions (client_id, transaction_type) VALUES (?, 'DELETED')",
    insert_subscription: "INSERT INTO subscriptions VALUES(?,?)",
    get_subscriptions: "SELECT * FROM subscriptions",
    update_subscription:"UPDATE subscriptions SET subscriptions.url = ? WHERE subscriptions.subsystem = ?"
}
