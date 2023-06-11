// https://mongoosejs.com/
const mongoose = require("mongoose");

const { Schema } = mongoose;


const EmployeeSchema = new Schema({
  name: String,
  level: String,
  position: String,
  salary: Number,
  desiredSalary: Number,
  favouriteColor: String,
  startingDate: Date,
  attendance: String,
  equipment: Object,
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Employee", EmployeeSchema);
