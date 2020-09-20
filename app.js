const { updateData } = require('./lib');
const { sequelize } = require('./db');
const { KardexModel } = require('./Models/kardex_telaCruda_valorizado');

updateData(sequelize, KardexModel, "D", "09", "2020", false).then(() => {
    console.log("data updated");
}).catch(function (error) {
    console.log(error);
});