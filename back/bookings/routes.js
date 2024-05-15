const router = require("express").Router();

// Middleware Imports
const isAuthenticatedMiddleware = require("../common/middlewares/IsAuthenticatedMiddleware");
// const SchemaValidationMiddleware = require("../common/middlewares/SchemaValidationMiddleware");
const CheckPermissionMiddleware = require("../common/middlewares/CheckPermissionMiddleware");

// Controller Imports
const BookingController = require("./controllers/BookingController");

// JSON Schema Imports for payload verification
// const updateBookingPayload = require("./schemas/updateBookingPayload");

router.get(
  "/book/:bookingId",
  [isAuthenticatedMiddleware.check],
  BookingController.getBooking
);

router.get(
  "/byUser",
  [isAuthenticatedMiddleware.check],
  BookingController.getBookingByUser
);

router.get(
  "/byRestaurant/:restaurantId",
  [
    isAuthenticatedMiddleware.check,
    CheckPermissionMiddleware.isFromThisRestaurant,
  ],
  BookingController.getBookingByRestaurant
);

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  BookingController.getAllBookings
);

router.post(
  "/",
  [isAuthenticatedMiddleware.check],
  BookingController.createBooking
);

router.put(
  "/:bookingId",
  [isAuthenticatedMiddleware.check],
  BookingController.updateBooking
);

router.delete(
  "/:bookingId",
  [isAuthenticatedMiddleware.check],
  BookingController.deleteBooking
);

module.exports = router;
