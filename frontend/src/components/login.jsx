import React, { useState } from 'react';
import './Login.css'; // Import the custom CSS file for watermark
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { USER_API_END_POINT } from '../utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthUser } from '../store/userSlice';

const Login = () => {
    const [input, setInput] = useState({
        username: "",
        password: ""
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const [error, setError] = useState("");
    const eventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(res.data);
            if (res.data.success) {
                navigate('/TestFrontPage');
                dispatch(setAuthUser(res.data));
            }
            alert('Login successful!');
        } catch (error) {
            console.log(error);
            alert('Login failed!');
        }
        setLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 opacity-10 watermark"></div>
            <div className="max-w-md w-full bg-white text-black shadow-lg rounded-lg p-6 relative z-10">
                <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Username</label>
                        <input type="username" id="username" name="username" className="input text-black input-bordered w-full"
                            onChange={eventHandler}
                            value={input.username}
                            required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="input text-black input-bordered w-full"
                            onChange={eventHandler}
                            value={input.password}
                            required />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Logging In...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;