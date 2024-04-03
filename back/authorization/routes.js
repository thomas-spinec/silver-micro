const router = require("express").Router();

// Import the authorization controller
const AuthorizationController = require("./controllers/AuthorizationController");

const { roles } = require("../config");

// ========================> ROUTE DE TEST
router.get("/", (req, res) => {
  res.send("Hello World!");
});
// ========================> SIGNUP
router.post("/signup", AuthorizationController.register);

// ========================> LOGIN
router.post("/login", AuthorizationController.login);

// export the router
module.exports = router;
