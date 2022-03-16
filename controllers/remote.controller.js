const { Remote } = require('../models/remote.model');
const Sequelize = require('sequelize');
const { User } = require('../models/user.model');
const Op = Sequelize.Op;

exports.create = (req, res) => {
  const { percentage, reason, user_id } = req.body;

  const remote = {
    percentage,
    reason,
    user_id,
  };
  Remote.create(remote)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.message === 'Validation error') {
        res.status(400).send({
          message: 'Remote already exists',
          statusCode: 400,
        });
      } else {
        res.status(400).send({
          message:
            err.message || 'Some error occurred while creating the Office.',
        });
      }
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  Remote.findAll({
    where: condition,
    include: [{ model: User, as: 'user' }],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving remote.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Remote.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Remote with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Remote with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Remote.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Remote was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Remote was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Remote with id=' + id,
      });
    });
};
