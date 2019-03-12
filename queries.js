module.exports = {
    insert_clientinfo: 'INSERT INTO clientinfo(client_id,client_name, client_surname, method_of_notification ,active, password, cell_number, email) VALUES (?,?,?,?,?,?.?,?)',
    read_clientinfo: 'SELECT * FROM clientinfo',
    update_clientinfo: 'UPDATE clientinfo SET clientinfo.client_name = ?, clientinfo.client_surname = ?, clientinfo.method_of_notification = ?, clientinfo.password = ?, clientinfo.cell_number = ?, clientinfo.email = ? WHERE clientinfo.client_id = ?',   
    delete_clientinfo: 'UPDATE clientinfo SET clientinfo.active = 0 WHERE clientinfo.client_id = ?',
    insert_cardlist: 'INSERT INTO cardlist(card_id,client_id,active) VALUES (?,?,?)',
    read_cardlist: 'SELECT * FROM cardlist',
    update_cardlist: 'UPDATE cardlist SET cardlist.active = ? WHERE cardlist.card_id = ?',   
    delete_cardlist: 'UPDATE cardlist SET cardlist.active = 0 WHERE cardlist.card_id = ?',
    insert_transactions: 'INSERT INTO transactions(transaction_id,client_id,active,value_changed,old_value, new_value,timestamp) VALUES (?,?,?)',
    read_transactions: 'SELECT * FROM transactions',
    update_transactions: 'UPDATE transactions SET transactions.value_changed = ?, transactions.old_value = ?, transactions.new_value = ?, transactions.timestamp = ? WHERE transactions.transaction_id = ?',   
    delete_transactions: 'DELETE FROM transactions WHERE transactions.transaction_id = ?'
}