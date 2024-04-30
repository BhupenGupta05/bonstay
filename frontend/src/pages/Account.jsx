import { useNavigate, useParams } from 'react-router-dom';
import AccountNav from '../components/AccountNav';
import { useContext } from 'react';
import { UserContext } from '../UserContext';

const Account = () => {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { subpage } = useParams();

    const currentPage = subpage || 'profile';

    const handleLogout = async () => {
        window.localStorage.removeItem('bonstay-token');
        setUser(null);
        navigate('/');
    };

    return (
        <div className="flex flex-col gap-4 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
            <AccountNav />
            {currentPage === 'profile' && (
                <div className="text-center text-xs sm:text-sm md:text-base lg:text-md xl:text-lg max-w-sm mx-auto">
                    <p>
                        Logged in as <span className="font-bold">{user?.name}</span> ({user?.email})
                    </p>
                    <button
                        onClick={handleLogout}
                        className="primary mt-4 py-1 px-2 sm:py-1.5 sm:px-3 md:py-2 md:px-4 lg:py-2 lg:px-4 xl:py-2.5 xl:px-5 text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl"
                    >
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
};

export default Account;
