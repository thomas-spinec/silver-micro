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
  "/",
  [isAuthenticatedMiddleware.check],
  BookingController.getBooking
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
