import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { differenceInCalendarDays, format } from 'date-fns';
import bookingService from '../services/bookings';
import profileService from '../services/profile';

const BookingWidget = ({ place }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Initialize booking details from the state passed from the Bookings component
  const initialBookingDetails = location.state || {};
  const [checkIn, setCheckIn] = useState(initialBookingDetails.checkIn ? format(new Date(initialBookingDetails.checkIn), 'yyyy-MM-dd') : '');
  const [checkOut, setCheckOut] = useState(initialBookingDetails.checkOut ? format(new Date(initialBookingDetails.checkOut), 'yyyy-MM-dd') : '');
  const [name, setName] = useState(initialBookingDetails.name || '');
  const [phone, setPhone] = useState(initialBookingDetails.phone || '');
  const [persons, setPersons] = useState(initialBookingDetails.persons || 1);
  const bookingId = initialBookingDetails.bookingId;

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('bonstay-token');
      const storedToken = JSON.parse(token);
      const user = await profileService.profile(storedToken);

      if (user) {
        setName(user.name);
        setPhone(user.phone);
      }
    };

    fetchUser();
  }, []);

  let numberOfNights = 0;
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
  }

  const bookPlace = async () => {
    const bookingDetails = {
      checkIn,
      checkOut,
      persons,
      name,
      phone,
      place: place.id,
      price: numberOfNights * place.price,
    };

    const token = localStorage.getItem('bonstay-token');
    const storedToken = JSON.parse(token);

    try {
      if (bookingId) {
        await bookingService.updateBooking(storedToken, bookingId, bookingDetails);
        alert('Booking updated successfully.');
      } else {
        await bookingService.addBooking(storedToken, bookingDetails);
        alert('Booking added successfully.');
      }
      navigate('/account/bookings');
    } catch (error) {
      alert(error.response.data.error);
    }
  };

  return (
    <div
      className="bg-white rounded-2xl p-4"
      style={{
        paddingLeft: '16px',
        paddingRight: '16px',
        ...(window.innerWidth >= 1024 ? {
          paddingLeft: '32px',
          paddingRight: '32px',
        } : {}),
      }}
    >
      <div className="text-md text-center mb-4 md:text-lg">
        <span>Price: ${place.price} night</span>
      </div>
      <div className="border rounded-2xl p-4 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <label htmlFor="checkIn" className="block text-xs md:text-sm lg:text-xs">Check In</label>
            <input
              type="date"
              id="checkIn"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 appearance-none text-xs md:text-sm lg:text-xs"
            />
          </div>

          <div>
            <label htmlFor="checkOut" className="block text-xs md:text-sm lg:text-xs">Check Out</label>
            <input
              type="date"
              id="checkOut"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-2 py-1 appearance-none text-xs md:text-sm lg:text-xs"
            />
          </div>
        </div>

        <div>
          <label htmlFor="persons" className="block text-xs md:text-sm lg:text-xs">Number of Guests</label>
          <input
            type="number"
            id="persons"
            min="1"
            value={persons}
            onChange={(e) => setPersons(e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-2 py-1 appearance-none text-xs md:text-sm lg:text-xs"
          />
        </div>

        {numberOfNights > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label htmlFor="name" className="block text-xs md:text-sm lg:text-xs">Your Full Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 appearance-none text-xs md:text-sm lg:text-xs"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-xs md:text-sm lg:text-xs">Phone Number:</label>
              <input
                type="tel"
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-2 py-1 appearance-none text-xs md:text-sm lg:text-xs"
              />
            </div>
          </div>
        )}
      </div>

      <button
        onClick={bookPlace}
        className="w-full py-2 mt-4 bg-primary text-white rounded-lg text-xs tracking-wide sm:text-sm"
      >
        Book this place
        {numberOfNights > 0 && (
          <span className='ml-1'>for ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  );
};

export default BookingWidget;
