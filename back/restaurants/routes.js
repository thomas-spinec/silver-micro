const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("./../common/middlewares/IsAuthenticatedMiddleware");
// const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const RestaurantController = require("./controllers/RestaurantController");

// JSON Schema Imports for payload verification
// const updateRestaurantPayload = require("./schemas/updateRestaurantPayload");

router.get(
  "/",
  [isAuthenticatedMiddleware.check],
  RestaurantController.getRestaurant
);

// router.patch(
//   "/",
//   [
//     isAuthenticatedMiddleware.check,
//     SchemaValidationMiddleware.verify(updateRestaurantPayload),
//   ],
//   RestaurantController.updateRestaurant
// );

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  RestaurantController.getAllRestaurants
);

// router.patch(
//   "/change-role/:restaurantId",
//   [
//     isAuthenticatedMiddleware.check,
//     CheckPermissionMiddleware.has(roles.ADMIN),
//     SchemaValidationMiddleware.verify(changeRolePayload),
//   ],
//   RestaurantController.changeRole
// );

// router.delete(
//   "/:restaurantId",
//   [isAuthenticatedMiddleware.check],
//   RestaurantController.deleteRestaurant
// );

module.exports = router;
