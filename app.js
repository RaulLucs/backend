const { sequelize } = require("./config/sequelize.config");
const userRoutes = require("./routes/user.routes");
const buildingRoutes = require("./routes/building.routes");
const officeRoutes = require("./routes/office.routes");
const remoteRoutes = require("./routes/remote.routes");
const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const corsOptions = {
  origin: "http://localhost:3000",
};

app.get("/", function (req, res) {
  //when we get an http get request to the root/homepage
  res.send("Hello, Assist!");
});

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

sequelize.sync({ force: true });
//sequelize.sync();
userRoutes(app);
buildingRoutes(app);
officeRoutes(app);
remoteRoutes(app);
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
