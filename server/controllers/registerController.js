const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/User');

const handleNewUser = asyncHandler( async(req, res) =>{
    const {name, surname, email, password, roles, active } = req.body
    if(!email|| !password) return res.status(400).json({ "message": "Email and password are required! "});

    // check for duplicate
    const duplicate = await User.findOne({
        email: email 
    }).lean().exec()
    // allow update to the orginal user
    if (duplicate) {
        return res.status(409).json( {message: 'Duplicate user email'})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userObj = { "name": name, "surname": surname, "email": email, "password": hashedPassword, "active": true};
        
        const user = await User.create(userObj);
        if(user) {
            res.status(201).json( {message: `New user ${name} ${surname} created`})
        } else {
            res.status(400).json({message: 'Invalid user data received'})
        }

    } catch (error) {
        res.status(500).json({ "message": error.message})
    }

})

module.exports = { handleNewUser };