const mongoose = require('mongoose');
const Profile = require('./model');

exports.handler = async function(event, context) {
  const { httpMethod, path } = event;

  if (httpMethod !== 'DELETE') {
    return {
      statusCode: 405,
      body: 'Method Not Allowed',
    };
  }

  const empId = path.split('/').pop();

  try {
    const existingProfile = await Profile.findOne({ empID: empId });

    if (!existingProfile) {
      return {
        statusCode: 404,
        body: 'Profile not found',
      };
    }

    await Profile.deleteOne({ _id: existingProfile._id });

    return {
      statusCode: 200,
      body: 'Employee has been deleted successfully',
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};