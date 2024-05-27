import { useState, useEffect, useContext } from "react";

import { bookingActions } from "../../services/bookingsServices";

import { X } from "lucide-react";

function ModalBooking({ setModalBooking, id, maxCapacity }) {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState({
    status: null,
    message: null,
  });
  const [nbParticipants, setNbParticipants] = useState(1);
  const [date, setDate] = useState(null);
  const [hour, setHour] = useState(null);
  const [comment, setComment] = useState(null);
  const [timeObject, setTimeObject] = useState([
    { time: "10:00", isDisabled: false },
    { time: "11:00", isDisabled: false },
    { time: "12:00", isDisabled: false },
    { time: "13:00", isDisabled: false },
    { time: "14:00", isDisabled: false },
    { time: "18:00", isDisabled: false },
    { time: "19:00", isDisabled: false },
    { time: "20:00", isDisabled: false },
    { time: "21:00", isDisabled: false },
    { time: "22:00", isDisabled: false },
  ]);
  const timeArray = [
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
  ];

  const fetchBookings = async () => {
    const data = await bookingActions.findByRestaurant(id);
    if (data.status) {
      setBookings(data.data);
    } else {
      setError(data.error.message);
    }
  };

  const isBookingAvailable = (time) => {
    let nbParticipantsPerTime = nbParticipants;
    let isDisabled = false;
    bookings.forEach((booking) => {
      let bookingDate = booking.bookingDate.split("T")[0];
      let bookingTime = booking.bookingDate.split("T")[1];
      bookingTime = bookingTime.split(":")[0] + ":" + bookingTime.split(":")[1];

      if (bookingDate === date && bookingTime === time) {
        nbParticipantsPerTime =
          parseInt(nbParticipantsPerTime) + parseInt(booking.numberOfGuests);
      }
    });
    if (nbParticipantsPerTime > maxCapacity) {
      timeObject.forEach((timeObj) => {
        if (timeObj.time === time) {
          timeObj.isDisabled = true;
        }
      });
    } else {
      timeObject.forEach((timeObj) => {
        if (timeObj.time === time) {
          timeObj.isDisabled = false;
        }
      });
    }
  };

  const book = async (dataToPost) => {
    const data = await bookingActions.create(dataToPost);
    if (data.status) {
      console.log("BOOKING CREATED", data);
      setError({
        status: true,
        message: "Réservation effectuée, vous allez être redirigé.",
      });
      setTimeout(() => {
        setModalBooking(false);
      }, 2000);
    } else {
      console.log("ERROR", data.error.message);
      setError({
        status: false,
        message: data.error.message,
      });
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  return (
    <div className="bg-white p-4 opacity-90 w-[100vw] h-[100%] absolute top-0 left-0 z-10">
      <div className=" w-[80%] h-[80%] absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white opacity-100 p-4 z-20 border-[1px] border-black rounded-md">
        <div className="flex justify-end">
          <button onClick={() => setModalBooking(false)}>
            <X size="24" />
          </button>
        </div>

        <form>
          <div>
            <label htmlFor="nbParticipants">Nombre de participants</label>
            <input
              type="number"
              name="nbParticipants"
              id="nbParticipants"
              min="1"
              value={nbParticipants}
              max={maxCapacity}
              onChange={(e) => {
                // isTimeArrayAvailable();
                if (e.target.value >= 1 && e.target.value <= maxCapacity) {
                  setNbParticipants(e.target.value);
                }
              }}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              required
              min={new Date().toISOString().split("T")[0]}
              id="date"
              onChange={(e) => {
                setDate(e.target.value);
              }}
            />
          </div>
          {date && (
            <div className="flex gap-2 flex-wrap ">
              {timeArray.map((time, i) => {
                let nbParticipantsPerTime = nbParticipants;
                isBookingAvailable(time);
                let isDisabled = timeObject[i].isDisabled;

                return (
                  <div key={time}>
                    <button
                      value={time}
                      disabled={timeObject[i].isDisabled}
                      className={`${
                        isDisabled ? "bg-purple-500" : "bg-transparent"
                      }
                        ${time === hour ? "border-orange-400 border-2 " : ""}
                      `}
                      type="button"
                      onClick={() => {
                        setHour(time);
                      }}
                    >
                      {time}
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          <div className="flex flex-col">
            <label htmlFor="comment">Commentaire (éventuelles allergies)</label>
            <textarea
              name="comment"
              id="comment"
              cols="30"
              rows="10"
              placeholder="Ajoutez un commentaire"
              onChange={(e) => {
                if (e.target.value === "") {
                  setComment(null);
                } else {
                  setComment(e.target.value);
                }
              }}
            ></textarea>
          </div>
          <button
            type="button"
            disabled={!date || !hour}
            onClick={() => {
              let formattedDate = date + " " + hour;
              let dataToPost = {
                restaurantId: id,
                numberOfGuests: nbParticipants,
                bookingDate: formattedDate,
                comment: comment,
              };
              console.log("DATA TO POST", dataToPost);
              book(dataToPost);
            }}
          >
            Valider
          </button>
        </form>
        {error && (
          <div>
            <p
              className={`flex justify-center ${
                error.status ? "text-green-500" : "text-red-500"
              }`}
            >
              {error.message}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default ModalBooking;
