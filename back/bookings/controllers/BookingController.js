const BookingModel = require("../../common/models/Booking");

module.exports = {
  // ========================> CREATE BOOKING
  createBooking: (req, res) => {
    const { body: payload } = req;

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
  updateBooking: (req, res) => {
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

    BookingModel.updateBooking({ id: bookingId }, payload)
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
