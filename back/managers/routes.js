const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
// const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const ManagerController = require("./controllers/ManagerControllers");

const { roles } = require("../config");
// JSON Schema Imports for payload verification
// const updateRestaurantPayload = require("./schemas/updateRestaurantPayload");

router.get(
  "/all/:restaurantId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    CheckPermissionMiddleware.isStaffFromThisRestaurant(roles.PATRON),
  ],
  ManagerController.getAllManagers
);

router.post(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    CheckPermissionMiddleware.isStaffFromThisRestaurant(roles.PATRON),
  ],
  ManagerController.createManager
);

router.put(
  "/",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.has(roles.ADMIN),
    CheckPermissionMiddleware.isStaffFromThisRestaurant(roles.PATRON),
  ],
  ManagerController.updateManager
);

router.delete(
  "/delete/:restaurantId/:managerId",
  [
    isAuthenticatedMiddleware.check,
    // CheckPermissionMiddleware.isUserConnectedSuperAdmin(roles.SUPER),
    CheckPermissionMiddleware.isThisStaffPatron(roles.PATRON),
    CheckPermissionMiddleware.isStaffFromThisRestaurant(roles.PATRON),
    CheckPermissionMiddleware.has(roles.ADMIN),
  ],
  ManagerController.deleteManager
);

module.exports = router;
