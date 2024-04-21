import { differenceInCalendarDays, format } from 'date-fns'
import { useState, useEffect } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import bookingService from '../services/bookings'
import profileService from '../services/profile'

const BookingWidget = ({ place }) => {
  const navigate = useNavigate()
  const location = useLocation()

  // Initialize booking details from the state passed from the Bookings component
  const initialBookingDetails = location.state || {}
  const [checkIn, setCheckIn] = useState(initialBookingDetails.checkIn ? format(new Date(initialBookingDetails.checkIn), 'yyyy-MM-dd') : '')
  const [checkOut, setCheckOut] = useState(initialBookingDetails.checkOut ? format(new Date(initialBookingDetails.checkOut), 'yyyy-MM-dd') : '')
  const [name, setName] = useState(initialBookingDetails.name || '')
  const [phone, setPhone] = useState(initialBookingDetails.phone || '')
  const [persons, setPersons] = useState(initialBookingDetails.persons || 1)
  const bookingId = initialBookingDetails.bookingId


  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('bonstay-token')
      const storedToken = JSON.parse(token)
      const user = await profileService.profile(storedToken)

      if(user) {
        setName(user.name)
        setPhone(user.phone)
      }
    }

    fetchUser()

  }, [])

  let numberOfNights = 0
  if (checkIn && checkOut) {
    numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  }

  const bookPlace = async () => {
    const bookingDetails = {
      checkIn,
      checkOut,
      persons,
      name,
      phone,
      place: place.id,
      price: numberOfNights * place.price
    }

    const token = localStorage.getItem('bonstay-token')
    const storedToken = JSON.parse(token)

    try {
      if(bookingId) {
        await bookingService.updateBooking(storedToken, bookingId, bookingDetails)
        alert('Booking updated successfully.')
      } else {
        await bookingService.addBooking(storedToken, bookingDetails)
        alert('Booking added successfully.')
      }
      navigate('/account/bookings')
    } catch (error) {
      alert(error.response.data.error)
    }

  }
  return (
    <div className="bg-white rounded-2xl p-4">
      <div className="text-2xl text-center">
                    Price: ${place.price} per night
      </div>
      <div className="border rounded-2xl mt-4">
        <div className="flex">
          <div className="py-3 px-4">
            <label>Check In</label>
            <input type="date" value={checkIn} onChange={(e) => setCheckIn(e.target.value)} />
          </div>

          <div className="py-3 px-4 border-l">
            <label>Check Out</label>
            <input type="date" value={checkOut} onChange={(e) => setCheckOut(e.target.value)} />
          </div>
        </div>

        <div className="py-3 px-4 border-l">
          <label>Number of guests</label>
          <input type="number" value={persons} onChange={(e) => setPersons(e.target.value)} />
        </div>

        {numberOfNights > 0 && (
          <div className="py-3 px-4 border-t">
            <label>Your full name:</label>
            <input type="text"
              value={name}
              onChange={ev => setName(ev.target.value)}/>
            <label>Phone number:</label>
            <input type="tel"
              value={phone}
              onChange={ev => setPhone(ev.target.value)}/>
          </div>
        )}
      </div>



      <button onClick={bookPlace} className="primary mt-4">
                    Book this place
        {numberOfNights > 0 && (
          <span> ${numberOfNights * place.price}</span>
        )}
      </button>
    </div>
  )
}

export default BookingWidget