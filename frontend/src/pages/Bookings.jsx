import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import bookingService from '../services/bookings'
import BookingDates from '../components/BookingDates'
import { BASE_URL } from '../constants'


const Bookings = () => {
    const [bookings, setBookings] = useState([])
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('bonstay-token')
            const storedToken = JSON.parse(token)

            const data = await bookingService.getBookings(storedToken)
            setBookings(data)
            setLoading(false) // Set loading to false when data is loaded
        }

        fetchBookings()
    }, [])

    // Function to handle reschedule button click
    const handleReschedule = (booking) => {
        // Redirect the user to the Place page with existing booking details as query parameters
        navigate(`/place/${booking.place.id}`, {
            state: {
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                persons: booking.persons,
                name: booking.name,
                phone: booking.phone,
                bookingId: booking.id // Add booking ID for reference
            }
        })
    }

    const handleCancel = async (booking) => {
        try {
            const token = localStorage.getItem('bonstay-token')
            const storedToken = JSON.parse(token)

            await bookingService.deleteBooking(storedToken, booking.id)
            setBookings((prevBookings) => prevBookings.filter((b) => b.id !== booking.id))
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="mx-4">
            <AccountNav />
            {loading ? (
                // Loading indicator
                <div className="text-center mt-4">
                    <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                    </svg>
                    <p className="text-primary mt-2">Loading bookings...</p>
                </div>
            ) : (
                bookings.length > 0 ? (
                    bookings.map(booking => (
                        <div key={booking.id} className='flex items-center gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-4'>
                            <Link key={booking.id} to={`/account/bookings/${booking.id}`} >
                                <div className='w-48 h-48'>
                                    {booking.place.photos.length > 0 && (
                                        <img src={`${BASE_URL}/uploads/${booking.place.photos[0]}`} className='object-cover w-full h-full' alt="" />
                                    )}
                                </div>
                            </Link>
    
                            <div className="py-3 pr-3 grow">
                                <h2 className="text-xl">{booking.place.title}</h2>
    
                                <div className="text-xl">
                                    <BookingDates booking={booking} className="mb-2 mt-4 text-gray-500" />
    
                                    <div className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" width={20} height={20}>
                                            <path d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z"/>
                                        </svg>
                                        <span className="text-2xl">
                                            Total price: ${booking.price}
                                        </span>
                                    </div>
                                </div>
    
                                <div className='flex items-center gap-2 mt-2'>
                                    <button className='py-2 px-6 rounded-full bg-primary text-white' onClick={() => handleReschedule(booking)}>Reschedule</button>
                                    <button className='py-2 px-6 rounded-full bg-slate-400 text-white' onClick={() => handleCancel(booking)}>Cancel</button>
                                </div>
                            </div>
    
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center mt-4 h-20">
                        <p className="text-gray-500 text-lg text-center">
                            No bookings found!
                        </p>
                    </div>
                )
            )}
        </div>
    )
}

export default Bookings
