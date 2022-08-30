const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../model/User");

const handleNewUser = asyncHandler(async (req, res) => {
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
});

module.exports = { handleNewUser };
