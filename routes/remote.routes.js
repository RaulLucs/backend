const remotes = require('../controllers/remote.controller');
const router = require('express').Router();

module.exports = (app) => {
  router.post('/', remotes.create);
  router.get('/', remotes.findAll);
  router.get('/:id', remotes.findOne);
  router.put('/:id', remotes.update);
  app.use('/api/remotes', router);
};
