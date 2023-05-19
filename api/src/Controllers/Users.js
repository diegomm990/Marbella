const Users = require("../Models/Users");
const asyncHandler = require("express-async-handler");
const { generateToken } = require("../utils/generateToken");

const getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.status(201).json(users);
  } catch (error) {
    console.log(error);
  }
};
const registerUser = asyncHandler(async (req, res) => {
  const { name, lastname, email, password, admin, address, phone } = req.body;

  const userExists = await Users.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await Users.create({
    name,
    lastname,
    email,
    password,
    admin,
    address: {
      street: "",
      number: 0,
      city: "",
      province: "",
      zipCode: "",
    },
    phone: 0,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      admin: user.admin,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Something is missing");
  }
});

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      address: user.address,
      admin: user.admin,
      phone: user.phone,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid mail or password");
  }
});

const updateUser = async (req, res) => {
  let { email, address, phone } = req.body;
  let user = await Users.findOne({ email });
  try {
    if (user) {
      if (address) {
        if (user.address[0] === "") {
          await Users.findByIdAndUpdate(user._id, { address });
        } else {
          await Users.findByIdAndUpdate(user._id, {
            $push: { address },
          });
        }
      }
      if (phone) {
        await Users.findByIdAndUpdate(user._id, { phone });
      }
      let updated = await Users.findById(user._id);
      res.status(201).send(updated);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { registerUser, authUser, updateUser, getUsers };
