const connection = require("../config/connection");

const orm = {
    selectAll(tablename, callBack) {
        const queryString = `SELECT * FROM ${tablename};`;
        connection.query(queryString, (err, result) => {
            if (err) {
                throw err;
            };
            callBack(result);
        });
    },
    insertOne(table, column, valuePassed, callBack) {
        connection.query("INSERT INTO ??(??) VALUES( ? )", [table, column, valuePassed], (err, res) => {
            if (err) throw err;
            callBack(res);
        });
    },
    updateOne(table, id, valuePassed, callBack) {
        connection.query("UPDATE ?? SET devoured = ? WHERE id = ?", [table, valuePassed, id], (err, res) => {
            if (err) throw err;
            callBack(res);
        });
    },
    deleteOne(table, id, callBack) {
        connection.query("DROP STUFF HERE", (err, res) => {
            if (err) throw err;
            callBack(res);
        });
    },
}

module.exports = orm;