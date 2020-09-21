const { Op } = require("sequelize");

async function updateData(sequelize, KardexModel, productCode, month, year, updatePrice = true) {
    const transaction = await sequelize.transaction();

    let fetchedData = await KardexModel.findAll({
        where: {
            [Op.and]: [
                { codigoTransaccion: productCode, },
                sequelize.where(sequelize.fn('YEAR', sequelize.col('fechaRegistro')), year),
                sequelize.where(sequelize.fn('MONTH', sequelize.col('fechaRegistro')), month)
            ]
        },
        order: [
            ['ordenArticulo', 'asc']
        ],
        transaction: transaction,
        lock: transaction.LOCK.UPDATE
    });

    let uniqueOrders = [];
    let totalRecords = fetchedData.length;
    let saldoKgArticulo, saldoRollosArticulo, saldoPrecioArticulo, costIncrease, costDecrease, previousCost, index;

    if (totalRecords) {
        try {
            for (index = 0; index < totalRecords; index++) {
                let record = fetchedData[index];
                let order = index + 1;

                // If there are two items with the same order number
                if (uniqueOrders.includes(record.ordenArticulo)) {
                    throw "ordenArticulo has duplicate values!";
                } else {
                    uniqueOrders.push(record.ordenArticulo);
                }

                // if both ingresoKg and salidaKg are less than or equal to 0
                if (record.ingresoKg <= 0 && record.salidaKg <= 0) {
                    throw "ingresoKg & salidaKg both values are zero or less!";
                }

                // if both ingresoCajas and salidaCajas are less than or equal to 0
                if (record.ingresoRollos <= 0 && record.salidaRollos <= 0) {
                    throw "ingresoRollos & salidaRollos both values are zero or less!";
                }

                // updates for first record
                if (index == 0) {
                    // remaining kg
                    saldoKgArticulo = record.ingresoKg - record.salidaKg;
                    // remianing units
                    saldoRollosArticulo = record.ingresoRollos - record.salidaRollos;
                    // price
                    saldoPrecioArticulo = Number.parseFloat(Number.parseFloat((((record.ingresoKg * record.ingresoPrecioArticulo) - (record.salidaKg * record.salidaPrecioArticulo)) / (record.ingresoKg - record.salidaKg))).toFixed(4));
                } else {
                    costIncrease = record.ingresoKg * record.ingresoPrecioArticulo;
                    costDecrease = record.salidaKg * record.salidaPrecioArticulo;
                    previousCost = Number.parseFloat(Number.parseFloat(saldoKgArticulo * saldoPrecioArticulo).toFixed(4));
                    // price
                    saldoPrecioArticulo = Number.parseFloat(Number.parseFloat((previousCost + costIncrease - costDecrease) / (saldoKgArticulo + record.ingresoKg - record.salidaKg)).toFixed(4));
                    // Remaining KG 
                    saldoKgArticulo = saldoKgArticulo + record.ingresoKg - record.salidaKg;
                    // remaining units
                    saldoRollosArticulo = saldoRollosArticulo + record.ingresoRollos - record.salidaRollos;
                }

                if (saldoKgArticulo == 0) {
                    throw "Remaining KG is zero!";
                }

                console.log("<====================================>")
                console.log("saldoKgArticulo: ", saldoKgArticulo);
                console.log("saldoRollosArticulo: ", saldoRollosArticulo);
                console.log("costIncrease: ", costIncrease);
                console.log("costDecrease: ", costDecrease);
                console.log("previousCost: ", previousCost);
                console.log("saldoPrecioArticulo: ", saldoPrecioArticulo);

                // update the remaining units
                record.saldoKgArticulo = saldoKgArticulo;
                record.saldoRollosArticulo = saldoRollosArticulo;

                // Need to update the price?
                if (updatePrice) {
                    record.saldoPrecioArticulo = saldoPrecioArticulo;
                }

                // Update the order
                if (order != record.ordenArticulo) {
                    record.ordenArticulo = order;
                }

                // Save the record into the db
                await record.save({
                    transaction: transaction
                });
            }
        } catch (error) {
            await transaction.rollback();
            console.error(error);
            throw error;
        }
    }

    await transaction.commit();
    return true;
}

module.exports = {
    updateData: updateData
}