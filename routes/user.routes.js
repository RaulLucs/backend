const users = require("../controllers/user.controller.js");
const router = require("express").Router();
const auth = require("../middleware/auth");

module.exports = (app) => {
  router.post("/", auth, users.create);
  router.get("/", auth, users.findAll);
  router.get("/:id", auth, users.findOne);
  router.put("/:id", auth, users.update);
  router.post("/login", users.login);
  app.use("/api/users", router);
};
