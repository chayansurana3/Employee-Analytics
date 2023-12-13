const mongoose = require('mongoose');
const Profile = require('./model');
const cors = require('cors');
const corsMiddleware = cors();

exports.handler = async function (event, context) {
  const { httpMethod } = event;

  if (httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  try {
    const corsHandler = corsMiddleware(event, context);
    if (corsHandler) return corsHandler;

    const employees = await Profile.find();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', 
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