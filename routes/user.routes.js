const users = require('../controllers/user.controller.js');
const router = require('express').Router();

module.exports = (app) => {
  router.post('/', users.create);
  router.get('/', users.findAll);
  router.get('/:id', users.findOne);
  router.put('/:id', users.update);
  app.use('/api/users', router);
};
