const asyncHandler = require('express-async-handler');
const User = require('../model/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const handleLogin = asyncHandler(async(req, res) => {
    const { email, password} = req.body;
    if(!email || !password) return res.status(400).json({ "message": "Email and password are required! "});

    const foundUser = await User.findOne({email: email }).exec();
    if(!foundUser) return res.sendStatus(401);

    const match = bcrypt.compare(password, foundUser.password);
    
    if(match) {
        const roles = Object.values(foundUser.roles);

        const accessToken = jwt.sign(
            { 
                "UserInfo": {
                    "username": foundUser.email,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { "username": foundUser.email },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '7d' }
        );
        //save to database
        
        foundUser.refreshToken = refreshToken;
        const result = await foundUser.save();
        console.log(result);
        
        res.cookie('jwt', refreshToken, {
            httpOnly: true,  
            /* secure: process.env.NODE_ENV !== 'development' ? true : false, */
            sameSite: 'None', 
            maxAge: 7 * 24 * 60 * 60 * 1000 
        })
        res.json({ accessToken });
    } else {
        res.sendStatus(401);
    }

})

module.exports = { handleLogin};

