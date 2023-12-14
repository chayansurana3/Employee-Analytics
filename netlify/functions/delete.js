const mongoose = require('mongoose');
const Profile = require('./model');

exports.handler = async function(event, context) {
  const username = process.env.MONGODB_USERNAME;
  const password = process.env.MONGODB_PASSWORD;
  mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.3xpjjhd.mongodb.net/`);
  
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
    console.log('Received request to delete employee with ID:', empId);

    if (!existingProfile) {
      console.log('NOT FOUND', empId);
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
    console.error('Error in delete function:', error);
    return {
      statusCode: 500,
      body: 'Internal Server Error',
    };
  }
};