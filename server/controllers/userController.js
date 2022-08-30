const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');

const User = require('../model/User');
const { param } = require('../routers/root');

// @desc Get user
// @route GET /users/:id
// @access Private

const getUser = asyncHandler( async(req,res) => {
    if (!req?.params?.id) return res.status(400).json({ 'message': 'User ID required.' });

    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.params.id}.` });
    }
    res.json(user);
    
})

// @desc Get all users
// @route GET /users
// @access Private

const getAllUsers = asyncHandler( async(req,res) => {
    const users = await User.find().exec();
    
    if(!users?.length) {
        return res.status(400).json({message: 'No users found'})
    }
    res.json(users)
})

// @desc Create user
// @route POST /users
// @access Private

const createNewUser = asyncHandler( async(req,res) => {
    const { name, surname, email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required! " });

  // check for duplicate
  const duplicate = await User.findOne({
    email: email,
  })
    .lean()
    .exec();
  // allow update to the orginal user
  if (duplicate) {
    return res.status(409).json({ message: "Duplicate user email" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await User.create({
      name: name,
      surname: surname,
      email: email,
      password: hashedPassword,
      active: true,
    });
    console.log(result);

    res.status(201).json({ success: `New user ${name} ${surname} created!` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
})

// @desc Update user
// @route PATCH /userss
// @access Private

const updateUser = asyncHandler( async(req,res) => {
    const {id, name, surname, email, password, roles, active } = req.body
    
    const user = await User.findById(id).exec()
    if(!user) {
        return res.status(400).json( {message: 'User not found'})
    }

    // check for duplicate
    const duplicate = await User.findOne({
        email: email 
    }).lean().exec()
    // allow update to the orginal user
    if (duplicate && duplicate?._id.toString() !== id) {
        return res.status(409).json( {message: 'Duplicate user email'})
    }

    user.name = name
    user.surname = surname
    user.email = email
    user.password = password
    user.active = active
    //user.roles = roles

    const updateUser = await user.save()
    res.json({ message: `${updateUser.name} ${updateUser.surname} updated`})
    
})

// @desc Delete a user
// @route DELETE /users
// @access Private

const deleteUser = asyncHandler( async(req,res) => {
    const { id } = req.body

    if(!id) {
        return res.status(400).json( {message: 'User ID required'})
    }
    
    const user = await User.findById(id).exec()

    if(!user) {
        return res.status(400).json( {message: 'User not found'})
    }
    const result = await user.deleteOne()
    const reply = `User ${result.name} ${result.surname} with ID ${id} deleted`
    res.json (reply)

})

module.exports = {
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser,
    getUser
}