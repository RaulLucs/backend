const { Building } = require('../models/building.model');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.create = (req, res) => {
  const { building_name, floors_count, building_address } = req.body;

  const building = {
    building_name,
    floors_count,
    building_address,
  };
  Building.create(building)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.message === 'Validation error') {
        res.status(400).send({
          message: 'User already exists',
          statusCode: 400,
        });
      } else {
        res.status(400).send({
          message:
            err.message || 'Some error occurred while creating the Building.',
        });
      }
    });
};
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;
  Building.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving users.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Building.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Building with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Building with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Building.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Building was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update Building with id=${id}. Maybe Building was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Building with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Building.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Building was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Building with id=${id}. Maybe Building was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Building with id=' + id,
      });
    });
};
