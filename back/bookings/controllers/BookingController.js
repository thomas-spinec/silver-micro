const BookingModel = require("../../common/models/Booking");

module.exports = {
  // ========================> CREATE BOOKING
  createBooking: (req, res) => {
    const { body: payload } = req;
    payload.userId = req.user.userId;
    BookingModel.createBooking(payload)
      .then((booking) => {
        return res.status(201).json({
          status: true,
          data: booking.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET BOOKING
  getBooking: (req, res) => {
    const { bookingId } = req.params;

    BookingModel.findBooking({ id: bookingId })
      .then((booking) => {
        return res.status(200).json({
          status: true,
          data: booking.toJSON(),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET BOOKING BY USER
  getBookingByUser: (req, res) => {
    console.log("AAAA");
    return res.status(200).json({
      status: true,
      data: "Hello World",
    });
    const { userId } = req.user;
    console.log("REQ", req);
    console.log("USER", userId);

    BookingModel.findAllBookings({ userId: userId })
      .then((booking) => {
        if (!booking) {
          return res.status(404).json({
            status: false,
            error: {
              message: "No bookings found for the user.",
            },
          });
        }
        return res.status(200).json({
          status: true,
          data: booking,
        });
      })
      .catch((err) => {
        console.log("err", err);
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET BOOKING BY RESTAURANT
  getBookingByRestaurant: (req, res) => {
    const { restaurantId } = req.params;

    BookingModel.findAllBookings({ restaurantId: restaurantId })
      .then((booking) => {
        if (!booking) {
          return res.status(404).json({
            status: false,
            error: {
              message: "No bookings found for the restaurant.",
            },
          });
        }
        return res.status(200).json({
          status: true,
          data: booking,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> GET ALL BOOKINGS
  getAllBookings: (req, res) => {
    BookingModel.findAllBookings()
      .then((bookings) => {
        return res.status(200).json({
          status: true,
          data: bookings.map((booking) => booking.toJSON()),
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> UPDATE BOOKING
  updateBooking: async (req, res) => {
    const {
      params: { bookingId },
      body: payload,
    } = req;

    // IF the payload does not have any keys,
    // THEN we can return an error, as nothing can be updated
    if (!Object.keys(payload).length) {
      return res.status(400).json({
        status: false,
        error: {
          message: "Body is empty, hence can not update the booking.",
        },
      });
    }

    const { userId } = req.user;
    const booking = await BookingModel.findBooking({ id: bookingId });

    if (booking === null) {
      return res.status(404).json({
        status: false,
        error: {
          message: "Booking not found.",
        },
      });
    }

    BookingModel.updateBooking({ id: bookingId }, payload)
      .then((booking) => {
        return res.status(200).json({
          status: true,
          message: "Booking updated successfully.",
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },

  // ========================> DELETE BOOKING
  deleteBooking: (req, res) => {
    const { bookingId } = req.params;

    BookingModel.deleteBooking({ id: bookingId })
      .then(() => {
        return res.status(200).json({
          status: true,
          data: {
            message: "Booking deleted successfully.",
          },
        });
      })
      .catch((err) => {
        return res.status(500).json({
          status: false,
          error: err,
        });
      });
  },
};
