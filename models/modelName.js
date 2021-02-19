const orm = require("../config/orm");
const modelName = {
    //SELECTS ALL BURGERS
    all(callback) {
        orm.selectAll("TableNameGoes Here", (res) => callback(res));
    },
    create(table, column, valuePassed, callback) {
        //INSERT ONE
        orm.insertOne(table, column, valuePassed, (res) => callback(res));
    },
    update(table, column, valuePassed, callback) {
        //UPDATE A BURGER
        orm.updateOne(table, column, valuePassed, (res) => callback(res));
    },
    delete(table, id, callback) {
        //UPDATE A BURGER
        orm.deleteOne(table, id, valuePassed, (res) => callback(res));
    }
};
module.exports = modelName;