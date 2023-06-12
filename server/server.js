require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const EmployeeModel = require("./db/employee.model");
const EquipmentModel = require("./db/equipment.model");
const BrandModel = require("./db/brand.model")

const { MONGO_URL, PORT = 8080 } = process.env;

if (!MONGO_URL) {
  console.error("Missing MONGO_URL environment variable");
  process.exit(1);
}

const app = express();
app.use(express.json());

app.get("/api/brands", async (req, res) => {
  const brands = await BrandModel.find();
  return res.json(brands)
})

app.get("/api/employees", async (req, res) => {
  const page =  parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  const order = req.query.order
  const key = req.query.key
  const sort = {[key]: order}
  
  const employees = await EmployeeModel.find().sort(sort)
  
  const startIndex = (page - 1) * limit
  const endIndex = page * limit
  const possiblePages = await EmployeeModel.countDocuments().exec() / limit

  const results = {};
  results.possiblePages = possiblePages

    if (endIndex < await EmployeeModel.countDocuments().exec()) {
      results.next = {
        page: page + 1,
        limit: limit
      }
    }

    if(startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit
      }
    }

  results.employees = employees.slice(startIndex, endIndex)
  
  return res.json(results);
});

app.get('/api/employees/:search', async(req, res) => {
  const employees = await EmployeeModel.find(
    { $or: [{name: {$regex: req.params.search, $options:"i"}}, {level: {$regex: req.params.search, $options:"i"}}, {position: {$regex: req.params.search, $options:"i"}}] })
  return res.json(employees);
});

app.get("/api/get/employees/:id", async (req, res) => {
  const employee = await EmployeeModel.findById(req.params.id);
  return res.json(employee);
});

app.get("/api/equipments", async (req, res) => {
  const equipments = await EquipmentModel.find().sort({ created: "desc"});
  return res.json(equipments)
})

app.get("/api/get/equipments/:id", async (req, res) => {
  const equipment = await EquipmentModel.findById(req.params.id);
  return res.json(equipment) 
})

app.post("/api/equipments", async (req, res, next) => {
  const equipment = req.body

  try {
    const savedEquipment = await EquipmentModel.create(equipment);
    return res.json(savedEquipment)
  } catch (error) {
    return next(error)
  }
});

app.patch("/api/equipments/:id", async(req, res, next) => {
  try {
    const equipment = await EquipmentModel.findOne({_id: req.params.id})
    equipment.name = req.body.name
    equipment.type = req.body.type
    equipment.amount = req.body.amount
    await equipment.save()
    return res.json(equipment)
  } catch (error) {
    return next(error)
  }
})

app.delete("/api/equipments/:id", async (req, res, next) => {
  try {
    const equipment = await EquipmentModel.findById(req.params.id);
    const deleted = equipment.delete();
    return res.json(deleted)
  } catch (error) {
    return next(err);
  }
})

app.post("/api/employees/", async (req, res, next) => {
  const employee = req.body;

  try {
    const saved = await EmployeeModel.create(employee);
    return res.json(saved);
  } catch (err) {
    return next(err);
  }
});

app.patch("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findOneAndUpdate(
      { _id: req.params.id },
      { $set: { ...req.body } },
      { new: true }
    );
    return res.json(employee);
  } catch (err) {
    return next(err);
  }
});

app.delete("/api/employees/:id", async (req, res, next) => {
  try {
    const employee = await EmployeeModel.findById(req.params.id);
    const deleted = await employee.delete();
    return res.json(deleted);
  } catch (err) {
    return next(err);
  }
});

const main = async () => {
  await mongoose.connect(MONGO_URL);

  app.listen(PORT, () => {
    console.log("App is listening on 8080");
  });
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
