import axios from 'axios';
import React, { useState } from 'react';
import { USER_API_END_POINT } from '../utils/constant';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
const Signup = () => {
    const [input, setInput] = useState({
        name: "",
        email: "",
        password: "",
        gender: "",
        username: ""
    });
    const navigate = useNavigate();
    // const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const eventHandler = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        try {
            const res = await axios.post(`${USER_API_END_POINT}/register`, input, {
                headers: {
                    "Content-Type": "application/json"
                },
                withCredentials: true
            });
            console.log(res.data);
            alert('Signup successful!');
            if (res.data.success) {
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            alert('Signup failed!');
        }
        setTimeout(() => {
            setLoading(false);
            alert('Login successful!');
        }, 2000);
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center p-4 relative">
            <div className="absolute inset-0 opacity-10 watermark"></div>
            <div className="max-w-md w-full bg-white text-black shadow-lg rounded-lg p-6 relative z-10">
                <h1 className="text-3xl font-bold text-center mb-4">Sign Up</h1>
                <form className="space-y-4" onSubmit={handleSignup}>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="username">Username</label>
                        <input type="text" id="username" name="username"
                            onChange={eventHandler}
                            value={input.username}
                            className="input text-black input-bordered w-full" required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" className="input text-black input-bordered w-full"
                            onChange={eventHandler}
                            value={input.name}
                            required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" className="input text-black input-bordered w-full"
                            onChange={eventHandler}
                            value={input.email}
                            required />
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="gender">Gender</label>
                        <div className="flex items-center space-x-4">
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="M" className="radio radio-primary" onChange={eventHandler} required />
                                <span className="ml-2">Male</span>
                            </label>
                            <label className="flex items-center">
                                <input type="radio" name="gender" value="F" className="radio radio-primary" onChange={eventHandler} required />
                                <span className="ml-2">Female</span>
                            </label>
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1" htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" className="input text-black input-bordered w-full"
                            onChange={eventHandler}
                            value={input.password} required />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <button
                        type="submit"
                        className={`btn btn-primary w-full ${loading ? 'loading' : ''}`}
                        disabled={loading}
                    >
                        {loading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Signup;