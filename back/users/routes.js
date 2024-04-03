const router = require("express").Router();

// Import the user controller
const UserController = require("./controllers/UserController");

// Import the roles schema
const { roles } = require("../config");

// ========================> CREATE USER
router.post("/", UserController.createUser);

// ========================> GET USER (will be the logged in user)
router.get("/", UserController.getUser);

// ========================> GET ALL USERS
router.get("/all", UserController.getAllUsers);

// export the router
module.exports = router;
