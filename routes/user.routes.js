const users = require("../controllers/user.controller.js");
const router = require("express").Router();
const auth = require("../middleware/auth");

module.exports = (app) => {
  router.post("/", users.create);
  router.get("/", users.findAll);
  router.get("/:id", users.findOne);
  router.put("/:id", users.update);
  router.post("/login", users.login);
  app.use("/api/users", router);
};
