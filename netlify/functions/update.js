const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const PORT = process.env.PORT || 3001;
const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;
const Profile = require('./model');
const cors = require('cors');

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3xpjjhd.mongodb.net/`);

app.post('/update', async (req, res) => {

  const empid = req.body.empId;
  try {
    const existingProfile = await Profile.findOne({ empId: empid });
    if (!existingProfile) return res.status(404).send('Profile not found');
    
    const updateObj = {};
    
    if (req.body.email) {updateObj.email = req.body.Email;}
    if (req.body.firstname) {updateObj.firstName = req.body.firstname;}
    if (req.body.lastname) {updateObj.lastName = req.body.lastname;}
    if (req.body.gender) {updateObj.gender = req.body.gender;}
    if (req.body.department) {updateObj.gender = req.body.department;}
    if (req.body.position) {updateObj.gender = req.body.position;}
    if (req.body.age) {updateObj.gender = req.body.age;}
    if (req.body.salary) {updateObj.gender = req.body.salary;}
    
    if (Object.keys(updateObj).length > 0) await Profile.updateOne({ _id: existingProfile._id }, { $set: updateObj });
    const updatedProfile = await Profile.findById(existingProfile._id);
    res.status(200).send('Your data has been updated successfully!!');
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, console.log("Server is listening on port: " + PORT));