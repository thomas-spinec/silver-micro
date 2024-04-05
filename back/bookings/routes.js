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

// router.patch(
//     "/",
//     [
//         isAuthenticatedMiddleware.check,
//         SchemaValidationMiddleware.verify(updateBookingPayload),
//     ],
//     BookingController.updateBooking
// );

router.get(
  "/all",
  [isAuthenticatedMiddleware.check],
  BookingController.getAllBookings
);

// router.patch(
//     "/change-role/:bookingId",
//     [
//         isAuthenticatedMiddleware.check,
//         CheckPermissionMiddleware.has(roles.ADMIN),
//         SchemaValidationMiddleware.verify(changeRolePayload),
//     ],
//     BookingController.changeRole
// );

router.delete(
  "/:bookingId",
  [isAuthenticatedMiddleware.check],
  BookingController.deleteBooking
);

module.exports = router;
