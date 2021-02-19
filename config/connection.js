// Set up MySQL connection.
const mysql = require('mysql');
let connection;
if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    connection = mysql.createConnection({
        host: 'localhost',
        port: 3306,
        user: 'root',
        // NOTE: Be sure to add your MySQL password here!
        password: 'Go Flumph Yourself',
        database: 'nameOfDataBase',
    });
}
// Make connection.
connection.connect();
// Export connection for our ORM to use.
module.exports = connection;