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

router.get("/all", RestaurantController.getAllRestaurants);

router.post(
  "/",
  [isAuthenticatedMiddleware.check],
  RestaurantController.createRestaurant
);

module.exports = router;
