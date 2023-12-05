const mongoose = require('mongoose');

const formDataSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    mobileNumber: String,
    phoneNumber: String,
    preferredDatetime: Date,
});

const FormData = mongoose.model('FormData', formDataSchema);

module.exports = FormData;
