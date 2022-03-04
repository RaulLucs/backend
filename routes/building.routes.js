const buildings = require('../controllers/building.controller');
const router = require('express').Router();

module.exports = (app) => {
  router.post('/', buildings.create);
  router.get('/', buildings.findAll);
  router.get('/:id', buildings.findOne);
  router.put('/:id', buildings.update);
  app.use('/api/buildings', router);
};
