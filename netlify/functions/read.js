const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const Profile = require('./model');
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const cors = require('cors');

app.use(cors());
app.use(express.json());
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3xpjjhd.mongodb.net/`);

app.get('/employees', async (req, res) => {
  try {
    let query = {};
    if (req.query.id) query.id = req.query.id;
    if (req.query.department) query.department = req.query.department;
    if (req.query.position) query.position = req.query.position;
    if (req.query.minSalary && req.query.maxSalary){
      query.salary = { $gte: parseInt(req.query.minSalary), $lte: parseInt(req.query.maxSalary) };
    }
    const employees = await Profile.find(query);
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error retrieving employee data:', error);
    res.status(500).send(`⚠️⚠️⚠️ ALERT!! ERROR IN RETRIEVING EMPLOYEE DATA: ` + error);
  }
});

app.get('/employees/all', async (req, res) => {
  try {
    const employees = await Profile.find();
    res.status(200).json(employees);
  } catch (error) {
    console.error('Error retrieving all employee data:', error);
    res.status(500).send(`⚠️⚠️⚠️ ALERT!! ERROR IN RETRIEVING ALL EMPLOYEE DATA: ` + error);
  }
});

app.listen(PORT, () => console.log("Server is listening on port: " + PORT));