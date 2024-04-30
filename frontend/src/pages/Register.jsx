import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import registerService from '../services/register';

const Registration = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const registerUser = async (e) => {
        e.preventDefault();

        if (!name || !email || !password || !phone || !address) {
            return;
        }

        try {
            await registerService.register({ name, email, password, phone, address });
            alert('Registration successful!');
            navigate('/');
        } catch (error) {
            console.error(error.message);
        }
    };

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="w-full max-w-md px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12">
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-center mb-6">Register</h1>
                <form className="flex flex-col gap-4" onSubmit={registerUser}>
                    <input
                        type="text"
                        placeholder="John Doe"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="tel"
                        placeholder="exclude country code"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <input
                        type="text"
                        placeholder="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />

                    <input
                        type="password"
                        placeholder="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-3 py-2 border rounded-lg"
                    />
                    <button className="py-2 mt-2 bg-primary text-white rounded-2xl w-full">Register</button>
                    <div className="text-center text-gray-500 text-xs sm:text-sm md:text-base">
                        Already a member? <Link className="underline text-primary" to={'/login'}>Login</Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
