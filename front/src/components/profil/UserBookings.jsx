import React, { useEffect, useState } from "react";
import { bookingActions } from "../../services/bookingsServices";

function UserBookings({ connected, setConnected }) {
  const [bookings, setBookings] = useState();
  const [error, setError] = useState({
    status: null,
    message: null,
  });

  const fetchBookings = async () => {
    const data = await bookingActions.findByUser();
    if (data.status) {
      setBookings(data.data);
      setError({
        status: null,
        message: null,
      });
    } else {
      if (data.error === "Invalid access token provided, please login again.") {
        setError({
          status: false,
          message: "Vous n'êtes pas connecté",
        });
        setConnected(false);
      } else {
        setError({
          status: false,
          message: data.error.message,
        });
      }
    }
  };

  const displayBookings = (bookings) => {
    return bookings.map((booking, index) => {
      let date = booking.bookingDate.split("T")[0];
      date =
        date.split("-")[2] +
        "/" +
        date.split("-")[1] +
        "/" +
        date.split("-")[0];
      let hour = booking.bookingDate.split("T")[1];
      hour = hour.split(":")[0] + "h" + hour.split(":")[1];
      let nbGuests = booking.numberOfGuests;
      let restaurantName = booking.restaurant.name;
      let restaurantAddress = booking.restaurant.address;
      let restaurantCity = booking.restaurant.city;
      let restaurantZipcode = booking.restaurant.zipcode;

      return (
        <div className="border p-4" key={index}>
          <h3></h3>
          <p>
            {date} à {hour} - {nbGuests} personnes
          </p>
          <p>
            {restaurantName} - {restaurantAddress} - {restaurantZipcode}{" "}
            {restaurantCity}
          </p>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchBookings();
  }, [connected]);

  useEffect(() => {
    if (bookings) {
      // console.log(bookings);
    }
  }, [bookings]);

  useEffect(() => {
    if (error.status === false) {
      setTimeout(() => {
        setError({
          status: null,
          message: null,
        });
      }, 3000);
    }
  }, [error]);

  return (
    <div>
      <h2>Mes réservations</h2>
      {/* si la length =0  */}
      {bookings?.length === 0 && <p>Vous n'avez pas encore de réservations</p>}
      {/* si la length >0 */}
      {bookings?.length > 0 && (
        <div className="flex flex-wrap justify-evenly gap-6">
          {displayBookings(bookings)}
        </div>
      )}
      {error.status === false && (
        <p className="text-Primary-Purple/400 font-['ClashDisplay-SemiBold']">
          {error.message}
        </p>
      )}
    </div>
  );
}

export default UserBookings;
