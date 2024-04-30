import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import placeService from '../services/place';
import userService from '../services/user';
import bookingService from '../services/bookings';
import PlaceGallery from '../components/PlaceGallery';
import BookingWidget from '../components/BookingWidget';

const Place = () => {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [bookingData, setBookingData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlaceAndBooking = async () => {
            // Fetch place data
            const data = await placeService.fetchPlace(id);
            setPlace(data);

            // Fetch booking data if there is a token
            const token = localStorage.getItem('bonstay-token');
            if (token) {
                const storedToken = JSON.parse(token);
                const bookingDetails = await bookingService.getBooking(storedToken, id);

                if (bookingDetails) {
                    setBookingData({
                        bookingId: bookingDetails.id,
                        checkIn: bookingDetails.checkIn,
                        checkOut: bookingDetails.checkOut,
                        persons: bookingDetails.persons,
                    });
                }
            }
            setLoading(false);
        };

        if (!id) {
            return;
        }
        fetchPlaceAndBooking();
    }, [id]);

    if (loading) {
        // Display loading indicator while data is being loaded
        return (
        <div className="text-center mt-4">
                <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                </svg>
                <p className="text-sm text-primary mt-2">Loading place...</p>
            </div>
        );
    }

    return (
        <div className="mx-6 sm:mx-10 md:mx-18 lg:mx-24 my-2 sm:my-2 md:my-4 lg:my-6 max-w-6xl xl:mx-32">
            <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold">{place?.title}</h1>
            <a
                className="my-2 flex items-center gap-1 font-semibold underline text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                target="_blank"
                href={`https://maps.google.com/?q=${place.address}`}
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className='w-3 h-3 md:w-4 md:h-4'>
                    <path d="M215.7 499.2C267 435 384 279.4 384 192C384 86 298 0 192 0S0 86 0 192c0 87.4 117 243 168.3 307.2c12.3 15.3 35.1 15.3 47.4 0zM192 128a64 64 0 1 1 0 128 64 64 0 1 1 0-128z"/>
                </svg>
                <span>{place.address}</span>
            </a>

            <div className="my-4">
                <PlaceGallery place={place} />
            </div>

            <div className="my-8 grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-2">
                <div className='max-w-[570px]'>
                    <h2 className="text-sm sm:text-base md:text-md lg:text-lg xl:text-2xl font-semibold mb-2">Description</h2>
                    <p className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg mb-2">{place.description}</p>

                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1">
                            <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg font-semibold">Check-In:</span>
                            <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg">{place.checkIn}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg font-semibold">Check-Out:</span>
                            <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg">{place.checkOut}</span>
                        </div>

                        <div className="flex items-center gap-1">
                            <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg font-semibold">Max Guests:</span>
                            <span className="text-xs sm:text-sm md:text-base lg:text-md xl:text-lg">{place.maxGuests}</span>
                        </div>
                    </div>
                </div>

                <div>
                    <div className="bg-white rounded-2xl p-2 shadow-lg max-w-md mx-auto sm:max-w-lg">
                        <BookingWidget place={place} bookingData={bookingData} />
                    </div>
                </div>
            </div>


            <div className="bg-white rounded-2xl mt-8">
                <h2 className="text-sm sm:text-base md:text-lg xl:text-xl font-semibold mb-2">Extra Info</h2>
                <p className="text-xs sm:text-sm md:text-base xl:text-lg text-gray-700 leading-5">{place.extraInfo}</p>
            </div>
        </div>
    );
};

export default Place;
