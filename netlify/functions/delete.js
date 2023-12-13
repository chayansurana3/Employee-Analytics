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

app.delete('/delete/:empId', async (req, res) => {
  const empId = req.params.empId;

  try {
    const existingProfile = await Profile.findOne({ empID: empId });
    if (!existingProfile) return res.status(404).send('Profile not found');
    await Profile.deleteOne({ _id: existingProfile._id });
    res.send('Employee has been deleted successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.listen(PORT, () => console.log("Server is listening on port: " + PORT));