const mongoose = require('mongoose');
const cors = require('cors');
const Profile = require('./model');

exports.handler = async function (event, context) {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3xpjjhd.mongodb.net/`);
  const { httpMethod } = event;

  if (httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const employees = await Profile.find();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(employees),
    };
  } catch (error) {
    console.error('Error retrieving all employee data:', error);

    return {
      statusCode: 500,
      body: `⚠️⚠️⚠️ ALERT!! ERROR IN RETRIEVING ALL EMPLOYEE DATA: ${error}`,
    };
  }
};