const mongoose = require ("mongoose");
const validator = require ("validator");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validate(value) {
            if(!validator.isEmail(value)){
                throw Error('not validated email')
            }
        }
    },
    mobile:{
        type: String,
        required: true,
        unique: true,
        minlength:10,
        maxlength:10
    },
     gender:{
        type: String,
        required: true,
    },
    status:{
        type: String,
        enum:["Active", "In-Active"],
        default: "Active"
    },
    dateCreated: Date,
    dateUpdated: Date
})

const users = new mongoose.model("Users", userSchema);
module.exports = users;