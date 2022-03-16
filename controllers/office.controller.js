const { Office } = require('../models/office.model');
const Sequelize = require('sequelize');
const { Building } = require('../models/building.model');
const { User } = require('../models/user.model');
const Op = Sequelize.Op;

exports.create = (req, res) => {
  const {
    office_name,
    building_id,
    floor_number,
    total_desks_count,
    usable_desks_count,
    office_administrator,
  } = req.body;

  const office = {
    office_name,
    building_id,
    floor_number,
    total_desks_count,
    usable_desks_count,
    office_administrator,
  };
  Office.create(office)
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      if (err.message === 'Validation error') {
        res.status(400).send({
          message: 'Office already exists',
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

  Office.findAll({
    where: condition,
    include: [{ model: Building, as: 'building' }],
  })
    .then(async (data) => {
      for (let i = 0; i < data.length; i++) {
        console.log('data', data[i].office_administrator);
        const user = await User.findByPk(data[i].office_administrator);
        if (user === null) {
          data[i]['office_administrator'] = 'Not exist';
        } else {
          data[i]['office_administrator'] =
            user.first_name + ' ' + user.last_name;
        }
      }

      res.send(data);
    })
    .catch((err) => {
      res.status(400).send({
        message: err.message || 'Some error occurred while retrieving office.',
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;
  Office.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Office with id=${id}.`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error retrieving Office with id=' + id,
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;
  Office.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Office was updated successfully.',
        });
      } else {
        res.send({
          message: `Cannot update User with id=${id}. Maybe Office was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Error updating Office with id=' + id,
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;
  Office.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: 'Office was deleted successfully!',
        });
      } else {
        res.send({
          message: `Cannot delete Office with id=${id}. Maybe Office was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: 'Could not delete Office with id=' + id,
      });
    });
};
