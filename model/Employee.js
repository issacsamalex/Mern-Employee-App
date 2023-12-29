const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    position: {
        type: String
    },
    location: {
        type: String
    },
    salary: {
        type: String
    }
});

module.exports = mongoose.model('employeelist', employeeSchema);