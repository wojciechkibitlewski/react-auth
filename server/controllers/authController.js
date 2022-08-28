const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const User = require('../model/User');

const handleLogin = asyncHandler(async(req, res) => {
    const { email, password} = req.body;
    if(!email || !password) return res.status(400).json({ "message": "Email and password are required! "});

    const foundUser = await User.findOne({email: email }).exec();
    if(!foundUser) return res.sendStatus(401);

    const match = await bcrypt.compare(password, foundUser.password);
    if(match) {
        // create JWTs 
        res.json({ "success": `User ${foundUser.name} ${foundUser.surname} is logged in!`});
    } else {
        res.sendStatus(401);
    } 

})

module.exports = { handleLogin};
