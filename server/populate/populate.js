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
const BrandModel = require("../db/brand.model");
const brandIds = require("./brandIDs.json");
const DivisionModel = require("../db/divisons.model");
const divisionNames = require("./divisionsNames.json");
const cities = require("./cities.json");
const countries = require("./countries.json")


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
  }));

  await EmployeeModel.create(...employees);
  console.log("Employees created");
};

  const populateBrands = async () => {

  /*   const brands = brandNames.map((name) => {
      return {name}
    }) */

    const brands = brandNames.map((name) => ({
      name
    }))

    await BrandModel.create(...brands);
    console.log("brands created");
  };

  const populateDivisons = async () => {
    await DivisionModel.deleteMany({});

    const divisions = divisionNames.map((name) =>
    ({
      name,
      budget: pick(desiredSalaries),
      location: {city: pick(cities), country: pick(countries)}
    }))

    await DivisionModel.create(...divisions)
    console.log('divisions created')
  }

  const connectEmployeesWithDivisions = async () => {
    const divisionIds = await DivisionModel.find({}, '_id');
    const employees = await EmployeeModel.find();

    employees.forEach((employee) => {
      employee.division = pick(divisionIds)
      employee.save()
    })
  }

  const connectEmployeesWithFavBrands = async () => {
    const brandIds = await BrandModel.find({}, '_id');
    const employees = await EmployeeModel.find();

    employees.forEach((employee) => {
      employee.favouriteBrand = pick(brandIds)
      employee.save()
    })
  }

  const connectDivisionsWithEmps = async () => {
    const employeeIds = await EmployeeModel.find({}, '_id')
    const divisions = await DivisionModel.find();

    divisions.forEach((division) => {
      division.boss = pick(employeeIds)
      division.save()
    })
  }

const main = async () => {
  await mongoose.connect(mongoUrl);

  await populateEmployees();

  await populateBrands();

  await populateDivisons();

  await connectEmployeesWithDivisions();

  await connectEmployeesWithFavBrands();

  await connectDivisionsWithEmps();

  await mongoose.disconnect();
};

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
