const { User } = require("../models/user.model");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// Create and Save a new User
exports.create = async (req, res) => {
  const {
    first_name,
    last_name,
    email_address,
    password,
    gender,
    date_of_birth,
    nationality,
    role,
    office_id,
  } = req.body;
  //Password encryption
  encyrptedPassword = await bcrypt.hash(password, 10);
  // Create a User
  const user = {
    first_name,
    last_name,
    email_address: email_address.toLowerCase(),
    password: encyrptedPassword,
    gender,
    date_of_birth,
    nationality,
    office_id,
    role,
  };

  // Save User in the database
  User.create(user)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.message === "Validation error") {
        res.status(400).send({
          message: "User already exists",
          statusCode: 400,
        });
      } else {
        res.status(400).send({
          message:
            err.message || "Some error occurred while creating the User.",
        });
      }
    });
};

// Retrieve all Users from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  User.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || "Some error occurred while retrieving users.",
      });
    });
};
// Find a single User with an id
exports.findOne = (req, res) => {
  const id = req.params.id;
  User.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find User with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving User with id=" + id,
      });
    });
};
// Update a User by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};
// User login
exports.login = async (req, res) => {
  try {
    const { email_address, password } = req.body;

    if (!(email_address && password)) {
      res.status(400).send("All input is required");
    }

    const user = await User.findOne({ email_address });
    console.log("HI");
    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign({ user_id: user.id }, process.env.TOKEN_KEY, {
        expiresIn: "2h",
      });

      res.status(200).json({ access_token: token });
    } else
      return res.json({
        statusCode: 400,
        message: "Email or password was incorrect.",
        error: "Bad request",
      });
  } catch (err) {
    console.log(err);
  }
};
