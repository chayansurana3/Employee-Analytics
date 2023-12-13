const mongoose = require('mongoose');
const Profile = require('./model');

exports.handler = async function(event, context) {
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