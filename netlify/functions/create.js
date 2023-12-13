const express = require('express');
const app = express();
const path = require('path');
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
mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3xpjjhd.mongodb.net/`);

app.post('/submit', async (req, res) => {
  const empId = req.body.empId;
  const existingProfile = await Profile.findOne({ empId });

  if (existingProfile) {
    try {
      await Profile.findOneAndUpdate(
        { empId },
        {
          email: req.body.email,
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          age: isNaN(req.body.age) ? 0 : parseInt(req.body.age),
          gender: req.body.gender,
          position: req.body.position,
          salary: req.body.salary,
          department: req.body.department
        },
        { new: true }
      );
      res.status(200).send('✅✅SUCCESS!!!');
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(400).send(`⚠️⚠️⚠️ ALERT!! ERROR IN UPDATING YOUR DATA: ` + error);
    }
  } else {
    const newProfileData = {
      empId,
      email: req.body.email,
      firstName: req.body.firstname,
      lastName: req.body.lastname,
      age: isNaN(req.body.age) ? 0 : parseInt(req.body.age),
      gender: req.body.gender,
      position: req.body.position,
      salary: req.body.salary,
      department: req.body.department
    };

    Profile.create(newProfileData)
      .then(createdProfile => {
        res.status(200).send("✅✅SUCCESS!!!")
      })
      .catch(error => {
        console.error('Error creating profile:', error);
        res.status(400).send(`⚠️⚠️⚠️ ALERT!! ERROR IN STORING YOUR DATA: ` + error);
    });
  }
});

app.listen(PORT, console.log("Server is listening on port: " + PORT));