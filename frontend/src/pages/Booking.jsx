import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BookingDates from '../components/BookingDates';
import PlaceGallery from '../components/PlaceGallery';
import bookingService from '../services/bookings';
import { IoPerson } from 'react-icons/io5';

const Booking = () => {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBooking = async () => {
            const token = localStorage.getItem('bonstay-token');
            const storedToken = JSON.parse(token);

            const data = await bookingService.getBooking(storedToken, id);
            setBooking(data);
            setLoading(false);
        };

        fetchBooking();
    }, [id]);

    if (loading) {
        return (
            <div className="text-center mt-4">
                <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                </svg>
                <p className="text-md text-primary mt-2">Loading booking...</p>
            </div>
        );
    }

    return (
        <div className="my-8 mx-4 sm:mx-auto max-w-md sm:max-w-lg md:max-w-3xl lg:max-w-4xl xl:max-w-5xl">
            <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">{booking.place.title}</h1>
            <a
                className="flex items-center gap-1 font-semibold underline my-2 text-xs sm:text-sm md:text-base"
                target="_blank"
                href={`https://maps.google.com/?q=${booking.place.address}`}
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" className="w-3 h-3 md:w-4 md:h-4" fill="currentColor">
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z" />
                </svg>
                <span>{booking.place.address}</span>
            </a>
            <div className="bg-gray-200 p-4 my-6 rounded-2xl flex flex-col sm:flex-row items-start justify-between">
                <div className="sm:mr-4">
                    <h2 className="text-sm sm:text-md md:text-lg mb-4">Your booking information:</h2>
                    <div className="flex items-center gap-2">
                        <IoPerson className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5" />
                        <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg">{booking.persons}</span>
                    </div>
                    <BookingDates booking={booking} className="text-xs sm:text-sm md:text-base lg:text-lg" />
                </div>

                <div className="bg-primary p-4 text-white rounded-2xl mt-4 sm:mt-0 sm:ml-4 w-fit">
                    <div className="text-xs sm:text-sm md:text-base tracking-wide">Total price</div>
                    <div className="text-lg sm:text-xl">${booking.price}</div>
                </div>
            </div>
            <div className="rounded-2xl overflow-hidden my-4">
                <PlaceGallery place={booking.place} />
            </div>
        </div>
    );
};

export default Booking;
