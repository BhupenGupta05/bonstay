import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import bookingService from '../services/bookings';
import BookingDates from '../components/BookingDates';
import Image from '../components/Image';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('bonstay-token');
            const storedToken = JSON.parse(token);

            const data = await bookingService.getBookings(storedToken);
            setBookings(data);
            setLoading(false);
        };

        fetchBookings();
    }, []);

    const handleReschedule = (booking) => {
        navigate(`/place/${booking.place.id}`, {
            state: {
                checkIn: booking.checkIn,
                checkOut: booking.checkOut,
                persons: booking.persons,
                name: booking.name,
                phone: booking.phone,
                bookingId: booking.id
            }
        });
    };

    const handleCancel = async (booking) => {
        try {
            const token = localStorage.getItem('bonstay-token');
            const storedToken = JSON.parse(token);

            await bookingService.deleteBooking(storedToken, booking.id);
            setBookings((prevBookings) => prevBookings.filter((b) => b.id !== booking.id));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full px-4">
            <AccountNav />
            {loading ? (
                <div className="text-center mt-4">
                    <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                    </svg>
                    <p className="text-md text-primary mt-2">Loading bookings...</p>
                </div>
            ) : (
                bookings.length > 0 ? (
                    bookings.map((booking) => (
                        <div key={booking.id} className="w-full flex flex-col sm:flex-row gap-2 sm:gap-4 bg-gray-200 rounded-2xl overflow-hidden mt-8 p-2">
                            <Link to={`/account/bookings/${booking.id}`} className="flex-shrink-0 w-full h-40 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 xl:w-48 xl:h-48 rounded-xl overflow-hidden">
                                {booking.place.photos.length > 0 && (
                                    <Image className="object-cover w-full h-full" src={booking.place.photos[0]} alt="Booking place photo" />
                                )}
                            </Link>
                            <div className="flex-grow pl-2 sm:pl-4 md:pl-6 lg:pl-8 xl:pl-10">
                                <h2 className="text-sm sm:text-base md:text-lg lg:text-md xl:text-lg font-semibold mb-2">{booking.place.title}</h2>
                                <BookingDates booking={booking} className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-gray-500 my-4" />
                                <div className="flex items-center gap-4 my-4">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 xl:w-8 xl:h-8 text-primary">
                                        <path fill="currentColor" d="M512 80c8.8 0 16 7.2 16 16v32H48V96c0-8.8 7.2-16 16-16H512zm16 144V416c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V224H528zM64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H512c35.3 0 64-28.7 64-64V96c0-35.3-28.7-64-64-64H64zm56 304c-13.3 0-24 10.7-24 24s10.7 24 24 24h48c13.3 0 24-10.7 24-24s-10.7-24-24-24H120zm128 0c-13.3 0-24 10.7-24 24s10.7 24 24 24H360c13.3 0 24-10.7 24-24s-10.7-24-24-24H248z" />
                                    </svg>
                                    <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg">Total price: ${booking.price}</span>
                                </div>
                                <div className="flex items-center gap-4 my-4">
                                    <button className="py-1 px-3 rounded-lg bg-primary text-white text-xs sm:text-sm md:text-base lg:text-md xl:text-lg" onClick={() => handleReschedule(booking)}>Reschedule</button>
                                    <button className="py-1 px-3 rounded-lg bg-gray-400 text-white text-xs sm:text-sm md:text-base lg:text-md xl:text-lg" onClick={() => handleCancel(booking)}>Cancel</button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex justify-center items-center mt-4 h-20">
                        <p className="text-gray-500 text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl text-center">No bookings found!</p>
                    </div>
                )
            )}
        </div>
    );
};

export default Bookings;
