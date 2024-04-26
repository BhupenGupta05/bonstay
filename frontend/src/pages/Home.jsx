import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import placeService from '../services/place'
import { BASE_URL } from '../constants'

const Home = () => {
    const [places, setPlaces] = useState([])
    const [loading, setLoading] = useState(true) // Loading state

    useEffect(() => {
        const fetchAllPlaces = async () => {
            const data = await placeService.fetchPlaces()
            setPlaces(data)
            setLoading(false) // Set loading to false when data is loaded
        }
        fetchAllPlaces()
    }, [])

    return (
        <div className="mt-8 grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mx-4">
            {loading ? (
                // Loading indicator
                <div className="text-center col-span-1 sm:col-span-2 lg:col-span-3 xl:col-span-4">
                    <svg className="animate-spin h-8 w-8 text-primary mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M16.24 16.24l1.41-1.41M4.93 19.07l1.41-1.41M16.24 7.76l1.41 1.41M2 12h2M20 12h2M4.93 12h2.14M16.24 12h2.14" />
                    </svg>
                    <p className="text-primary mt-2">Loading places...</p>
                </div>
            ) : (
                places.length > 0 && places.map(place => (
                    <Link to={`/place/${place.id}`} key={place.id}>
                        <div className="bg-gray-500 mb-2 rounded-2xl overflow-hidden">
                            {place.photos?.[0] && (
                                <img className="rounded-2xl object-cover w-full h-40 sm:h-48 lg:h-56" src={`${BASE_URL}/uploads/${place.photos?.[0]}`} alt=""/>
                            )}
                        </div>
                        <h2 className="font-semibold text-md sm:text-md lg:text-lg xl:font-semibold xl:text-2xl">{place.address}</h2>
                        <h3 className="text-xs sm:text-sm text-gray-500">{place.title}</h3>
                        <div className="mt-1 text-sm sm:text-base">
                            <span className="font-bold">${place.price}</span> per night
                        </div>
                    </Link>
                ))
            )}
        </div>
    )
}

export default Home
