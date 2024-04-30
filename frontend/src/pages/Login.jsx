import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import loginService from '../services/login';
import profileService from '../services/profile';
import { UserContext } from '../UserContext';

const Login = () => {
    const { setUser } = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            return;
        }
        try {
            const user = await loginService.login({ email, password });
            localStorage.setItem('bonstay-token', JSON.stringify(user.token));

            const userData = await profileService.profile(user.token);
            setUser(userData);

            alert('Login successful');

            navigate('/');
        } catch (error) {
            setError('Login failed. Please check your credentials.');
            setTimeout(() => {
                setError(null);
            }, 5000);
            console.log(error);
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center mb-6">Login</h1>
                <form className="flex flex-col gap-4" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button className="py-2 mt-2 bg-primary text-white rounded-2xl w-full">Login</button>
                    {error && <div className="text-red-500 text-center text-sm">{error}</div>}
                    <div className="text-center text-gray-500 text-xs sm:text-sm md:text-base">
                        Don't have an account yet? <Link className="underline text-primary" to={'/register'}>Register now</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
