import { useState } from 'react';
import Image from './Image';

const PlaceGallery = ({ place }) => {
    const [showPhotos, setShowPhotos] = useState(false);

    if (showPhotos) {
        return (
            <div className="fixed inset-0 z-50 bg-white min-h-screen overflow-auto">
                <div className="p-8 grid gap-2 relative">
                    <div>
                        <h2 className="text-lg mb-4 sm:text-xl md:text-2xl lg:text-3xl">Photos of {place.title}</h2>
                        <button
                            onClick={() => setShowPhotos(false)}
                            className="fixed right-12 top-12 py-2 px-4 bg-white rounded-2xl shadow shadow-black flex items-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className='w-4 h-4 lg:w-5 lg:h-5'>
                                <path d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z" />
                            </svg>
                            <p className="text-xs lg:text-sm">Close photos</p>
                        </button>
                    </div>
                    {place?.photos?.length > 0 &&
                        place.photos.map((photo, index) => (
                            <div key={index} className="h-full w-full max-w-2xl max-h-2xl mx-auto">
                                <Image className="object-cover w-full h-full rounded-lg" src={photo} alt="" />
                            </div>
                        ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative">
            <div className="grid gap-1 grid-cols-[2fr_1fr] rounded-2xl max-w-6xl max-h-6xl overflow-hidden relative">
                <div className="w-full h-full">
                    {place.photos?.[0] && (
                        <Image
                            onClick={() => setShowPhotos(true)}
                            className="cursor-pointer object-cover w-full h-full"
                            src={place.photos[0]}
                            alt=""
                        />
                    )}
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    {place.photos?.[1] && (
                        <Image
                            onClick={() => setShowPhotos(true)}
                            className="cursor-pointer object-cover w-full h-full"
                            src={place.photos[1]}
                            alt=""
                        />
                    )}
                    {place.photos?.[2] && (
                        <Image
                            onClick={() => setShowPhotos(true)}
                            className="cursor-pointer object-cover w-full h-full"
                            src={place.photos[2]}
                            alt=""
                        />
                    )}
                </div>
                <button
                    onClick={() => setShowPhotos(true)}
                    className="absolute bottom-2 right-2 lg:bottom-4 lg:right-4 py-2 px-4 bg-white rounded-2xl shadow-md shadow-gray-500 flex gap-2 items-center"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor" className="w-4 h-4 lg:w-[18px] lg:h-[18px]">
                        <path d="M32 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm96-64a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM320 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-320a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM224 480a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm0-448a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0 256a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 416a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm0-384a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 96a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM416 224a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM32 288a32 32 0 1 1 0-64 32 32 0 1 1 0 64zm192 32a32 32 0 1 1 0 64 32 32 0 1 1 0 64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 320a32 32 0 1 1 0 64 32 32 0 1 1 0-64zM416 192a32 32 0 1 1 0-64 32 32 0 1 1 0 64zM32 128a32 32 0 1 1 0 64 32 32 0 1 1 0-64zm192 64a32 32 0 1 1 0-64 32 32 0 1 1 0 64z"
                    />
                </svg>
                <p className="text-xs lg:text-sm">Show more photos</p>
            </button>
            </div>
        </div>
    );
};

export default PlaceGallery;
