const mongoose = require('mongoose');
const Profile = require('./model');

exports.handler = async function(event, context) {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3xpjjhd.mongodb.net/`);
  
  const { httpMethod, body } = event;

  if (httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const data = JSON.parse(body);
  const empId = data.empId;
  const existingProfile = await Profile.findOne({ empId });

  if (existingProfile) {
    try {
      await Profile.findOneAndUpdate(
        { empId },
        {
          email: data.email,
          firstName: data.firstname,
          lastName: data.lastname,
          age: isNaN(data.age) ? 0 : parseInt(data.age),
          gender: data.gender,
          position: data.position,
          salary: data.salary,
          department: data.department,
        },
        { new: true }
      );

      return {
        statusCode: 200,
        body: '✅✅SUCCESS!!!',
      };
    } catch (error) {
      console.error('Error updating profile:', error);
      return {
        statusCode: 400,
        body: `⚠️⚠️⚠️ ALERT!! ERROR IN UPDATING YOUR DATA: ` + error,
      };
    }
  } else {
    const newProfileData = {
      empId,
      email: data.email,
      firstName: data.firstname,
      lastName: data.lastname,
      age: isNaN(data.age) ? 0 : parseInt(data.age),
      gender: data.gender,
      position: data.position,
      salary: data.salary,
      department: data.department,
    };

    try {
      await Profile.create(newProfileData);

      return {
        statusCode: 200,
        body: '✅✅SUCCESS!!!',
      };
    } catch (error) {
      console.error('Error creating profile:', error);
      return {
        statusCode: 400,
        body: `⚠️⚠️⚠️ ALERT!! ERROR IN STORING YOUR DATA: ` + error,
      };
    }
  }
};