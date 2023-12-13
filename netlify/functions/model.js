const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
    empId: {
      type: Number,
      required: [true, 'emp id is required']
    },
    firstName: {
      type: String,
      required: [true, 'first name is required']
    },
    lastName: {
      type: String,
      required: [true, 'last name is required']
    },
    department: {
        type: String,
        required: [true, 'department is a required field']
    },
    position: {
        type: String,
        required: [true, 'position is a required field']
    },
    email: {
        type: String,
        required: [true, 'email is required']
    },
    gender: String,
    age: Number,
    salary: Number,
});

const Profile = mongoose.model('Profile', profileSchema);

module.exports = Profile;