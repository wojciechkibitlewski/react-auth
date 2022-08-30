const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    roles: {
        User: {
            type: Number,
            default: 1030
        },
        Editor: Number,
        Admin: Number
    },
    active: {
        type: Boolean,
        default: true
    },
    refreshToken: String
   
})

module.exports = mongoose.model('User', userSchema)