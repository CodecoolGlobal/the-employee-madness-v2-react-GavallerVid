const mongoose = require('mongoose');

const {Schema} = mongoose;

const EquipmentModel = new Schema ({
    name: String,
    type: String,
    amount: Number
});

module.exports = mongoose.model('eqipment', EquipmentModel)