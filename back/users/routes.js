// const router = require("express").Router();

// // Import the user controller
// const UserController = require("./controllers/UserController");

// // Import the roles schema
// const { roles } = require("../config");

// // ========================> GET USER (will be the logged in user)
// router.get("/", UserController.getUser);

// // ========================> GET ALL USERS
// router.get("/all", UserController.getAllUsers);

// // export the router
// module.exports = router;

// ==============================================================================
// =====================================> SUITE <=================================

const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
// const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const UserController = require("./controllers/UserController");

// JSON Schema Imports for payload verification
// const updateUserPayload = require("./schemas/updateUserPayload");
// const changeRolePayload = require("./schemas/changeRolePayload");

const { roles } = require("../config");

router.get("/", [isAuthenticatedMiddleware.check], UserController.getUser);

// router.patch(
//   "/",
//   [
//     isAuthenticatedMiddleware.check,
//     SchemaValidationMiddleware.verify(updateUserPayload),
//   ],
//   UserController.updateUser
// );

router.get(
  "/all",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UserController.getAllUsers
);

// router.patch(
//   "/change-role/:userId",
//   [
//     isAuthenticatedMiddleware.check,
//     CheckPermissionMiddleware.has(roles.ADMIN),
//     SchemaValidationMiddleware.verify(changeRolePayload),
//   ],
//   UserController.changeRole
// );

router.delete(
  "/:userId",
  [isAuthenticatedMiddleware.check, CheckPermissionMiddleware.has(roles.ADMIN)],
  UserController.deleteUser
);

module.exports = router;
