/*
Loading the .env file and creates environment variables from it
*/
require("dotenv").config();
const mongoose = require("mongoose");
const names = require("./names.json");
const levels = require("./levels.json");
const positions = require("./positions.json");
const salaries = require("./salary.json");
const desiredSalaries = require("./desiredSalary.json");
const favouriteColors = require("./favouriteColor.json");
const startingDates = require("./startingDate.json");
const attendances = require("./attendance.json");
const brandNames = require("./brandNames.json")
const EmployeeModel = require("../db/employee.model");
const BrandModel = require("../db/brand.model")

const mongoUrl = process.env.MONGO_URL;

if (!mongoUrl) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1); // exit the current program
}

const pick = (from) => from[Math.floor(Math.random() * (from.length - 0))];

const populateEmployees = async () => {
  await EmployeeModel.deleteMany({});

  const employees = names.map((name) => ({
    name,
    level: pick(levels),
    position: pick(positions),
    salary: pick(salaries),
    desiredSalary: pick(desiredSalaries),
    favouriteColor: pick(favouriteColors),
    startingDate: pick(startingDates),
    attendance: pick(attendances),
    equipment: {name: "mock", type: "mock", amount: 0},
    favouriteBrand: "123456789012345678901234"
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

  const populateBrands = async () => {
    await BrandModel.deleteMany({});

  /*   const brands = brandNames.map((name) => {
      return {name}
    }) */

    const brands = brandNames.map((name) => ({
      name
    }))

    await BrandModel.create(...brands);
    console.log("brands created");
  };

  

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateBrands();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
