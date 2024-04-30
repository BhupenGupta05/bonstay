import { Link, useLocation } from 'react-router-dom';

const AccountNav = () => {
    const { pathname } = useLocation();
    let subpage = pathname.split('/')?.[2];

    if (subpage === undefined) {
        subpage = 'profile';
    }

    const selectClasses = (type) => {
        let classes = 'inline-flex items-center gap-2 py-2 px-3 rounded-full transition-all duration-200 ease-in-out tracking-wide';
        classes += type === subpage ? ' bg-primary text-white' : ' bg-gray-200 hover:bg-gray-300';
        return classes;
    };

    return (
        <nav className="w-full flex flex-col items-center gap-2 mt-4 mb-4 sm:flex-row sm:justify-center sm:gap-3 md:gap-4 lg:gap-5 xl:gap-6">
            {/* My Profile link */}
            <Link
                to="/account"
                className={`${selectClasses('profile')} w-32 sm:w-36 md:w-40 lg:w-42 xl:w-46`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 448 512"
                    className={`ml-1 w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] xl:w-[18px] xl:h-[18px] ${subpage === 'profile' ? 'text-white' : 'text-gray-600'}`}
                >
                    <path d="M304 128a80 80 0 1 0-160 0 80 80 0 1 0 160 0zM96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM49.3 464H398.7c-8.9-63.3-63.3-112-129-112H178.3c-65.7 0-120.1 48.7-129 112zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3z" fill="currentColor" />
                </svg>
                <span className={`text-xs sm:text-sm md:text-base lg:text-md`}>
                    My profile
                </span>
            </Link>

            {/* My Bookings link */}
            <Link
                to="/account/bookings"
                className={`${selectClasses('bookings')} w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={`ml-1 w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] xl:w-[18px] xl:h-[18px] ${subpage === 'bookings' ? 'text-white' : 'text-gray-600'}`}
                >
                    <path d="M64 144a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM192 64c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zm0 160c-17.7 0-32 14.3-32 32s14.3 32 32 32H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H192zM64 464a48 48 0 1 0 0-96 48 48 0 1 0 0 96zm48-208a48 48 0 1 0 -96 0 48 48 0 1 0 0 96 0z" fill="currentColor" />
                </svg>
                <span className={`text-xs sm:text-sm md:text-base lg:text-md`}>
                    My bookings
                </span>
            </Link>

            {/* My Places link */}
            <Link
                to="/account/places"
                className={`${selectClasses('places')} w-32 sm:w-36 md:w-40 lg:w-44 xl:w-48`}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    className={`ml-1 w-[10px] h-[10px] sm:w-[14px] sm:h-[14px] md:w-4 md:h-4 lg:w-[18px] lg:h-[18px] xl:w-[18px] xl:h-[18px] ${subpage === 'places' ? 'text-white' : 'text-gray-600'}`}
                >
                    <path d="M0 32C0 14.3 14.3 0 32 0H480c17.7 0 32 14.3 32 32s-14.3 32-32 32V448c17.7 0 32 14.3 32 32s-14.3 32-32 32H304V464c0-26.5-21.5-48-48-48s-48 21.5-48 48v48H32c-17.7 0-32-14.3-32-32s14.3-32 32-32V64C14.3 64 0 49.7 0 32zm96 80v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H112c-8.8 0-16 7.2-16 16zM240 96c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H240zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V112c0-8.8-7.2-16-16-16H368c-8.8 0-16 7.2-16 16zM112 192c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H112zm112 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H240c-8.8 0-16 7.2-16 16zm144-16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V208c0-8.8-7.2-16-16-16H368zM328 384c13.3 0 24.3-10.9 21-23.8c-10.6-41.5-48.2-72.2-93-72.2s-82.5 30.7-93 72.2c-3.3 12.8 7.8 23.8 21 23.8H328z" fill="currentColor" />
                </svg>
                <span className={`text-xs sm:text-sm md:text-base lg:text-md`}>
                    My places
                </span>
            </Link>
        </nav>
    );
};

export default AccountNav;
