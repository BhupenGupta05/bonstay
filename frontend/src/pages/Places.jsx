import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import placeService from '../services/place';
import Image from '../components/Image';

const Places = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expandedDescriptions, setExpandedDescriptions] = useState([]);

    useEffect(() => {
        const fetchPlaces = async () => {
            const token = localStorage.getItem('bonstay-token');
            const storedToken = JSON.parse(token);
            const data = await placeService.getPlaces(storedToken);
            setPlaces(data);
            setLoading(false);
        };

        fetchPlaces();
    }, []);

    const toggleDescription = (index) => {
        setExpandedDescriptions((prevState) => {
            const newState = [...prevState];
            newState[index] = !newState[index];
            return newState;
        });
    };

    return (
        <div className="mx-4">
            <AccountNav />
            <div className="text-center">
                <Link
                    to="/account/places/new"
                    className="inline-flex items-center gap-2 bg-primary text-white rounded-full py-2 px-6 mt-6"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        width={14}
                        height={14}
                    >
                        <path
                            d="M256 80c0-17.7-14.3-32-32-32s-32 14.3-32 32V224H48c-17.7 0-32 14.3-32 32s14.3 32 32 32H192V432c0 17.7 14.3 32 32 32s32-14.3 32-32V288H400c17.7 0 32-14.3 32-32s-14.3-32-32-32H256V80z"
                            fill="white"
                        />
                    </svg>
                    <p className="text-xs sm:text-sm tracking-wide">Add new place</p>
                </Link>
            </div>

            <div className="mt-4">
                {loading ? (
                    // Loading indicator
                    <div className="text-center mt-4">
                        <svg
                            className="animate-spin h-8 w-8 text-primary mx-auto"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14"
                            />
                        </svg>
                        <p className="text-primary text-md mt-2">Loading places...</p>
                    </div>
                ) : (
                    places.map((place, index) => (
                        <Link
                            to={`/account/places/${place.id}`}
                            key={place.id}
                            className="flex flex-col sm:flex-row gap-4 bg-gray-200 rounded-2xl cursor-pointer p-4 mt-4 w-full"
                        >
                            <div className="w-full h-48 sm:w-36 sm:h-36 md:w-40 md:h-40 lg:w-44 lg:h-44 bg-gray-100 shrink-0">
                                {place.photos.length > 0 && (
                                    <Image
                                        className="object-cover rounded-md w-full h-full"
                                        src={place.photos[0]}
                                        alt=""
                                    />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-md sm:text-base md:text-lg tracking-wide">{place.title}</h2>

                                {expandedDescriptions[index] ? (
                                    <p className="text-xs sm:text-sm md:text-base mt-2">{place.description}</p>
                                ) : (
                                    <p className="text-xs sm:text-sm md:text-base mt-2">{place.description.substring(0, 150)}...</p>
                                )}

                                {/* Render "Read more" link if description is long */}
                                {place.description.length > 150 && (
                                    <button
                                        onClick={() => toggleDescription(index)}
                                        className="text-primary text-xs sm:text-sm md:text-base underline mt-1"
                                    >
                                        {expandedDescriptions[index] ? 'Read less' : 'Read more'}
                                    </button>
                                )}
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </div>
    );
};

export default Places;
