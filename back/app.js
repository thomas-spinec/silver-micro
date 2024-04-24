const express = require("express");
const cors = require("cors");
const app = express();
const { Sequelize } = require("sequelize");

const { port } = require("./config");
const { database, username, password, host, dbPort } = require("./dataEnv");
const PORT = port;

// Routes
const AuthorizationRoutes = require("./authorization/routes");
const UsersRoutes = require("./users/routes");
const RestaurantsRoutes = require("./restaurants/routes");
const BookingsRoutes = require("./bookings/routes");

// Sequelize model imports
const UserModel = require("./common/models/User");
const RestaurantModel = require("./common/models/Restaurant");
const BookingModel = require("./common/models/Booking");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());

// Database connection (mariaDB)
const sequelize = new Sequelize({
  dialect: "mysql",
  database: `${database}`,
  username: `${username}`,
  password: `${password}`,
  host: `${host}`,
  port: `${dbPort}`,
  logging: false,
});

// test the connection
try {
  sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// Initialize the models
UserModel.initialize(sequelize);
RestaurantModel.initialize(sequelize);
BookingModel.initialize(sequelize);

// ========================> ROUTES
// syncing models that are defined on sequelize with the tables that already exist in the database
// it creates models as tables that do not exist in the database

sequelize
  .sync()
  .then(() => {
    console.log("All models were synchronized successfully.");

    // attaching the routes to the app
    app.use("/", AuthorizationRoutes);
    app.use("/user", UsersRoutes);
    app.use("/restaurant", RestaurantsRoutes);
    app.use("/booking", BookingsRoutes);

    app.listen(PORT, () => {
      console.log(`Example app listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("An error occurred while synchronizing the models:", err);
  });

// app.get("/", (req, res) => {
//   res.send("Hello World!");
// });

// app.get("/status", (req, res) => {
//   const status = {
//     status: "running",
//   };
//   res.send(status);
// });
