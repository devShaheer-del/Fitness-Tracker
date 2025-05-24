import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useAuth } from '../Context/auth';

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const { setAuth } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            alert('Please fill all fields');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8080/api/v1/auth/Login', { email, password });
            const { user, token, success, message } = res.data;

            if (success) {
                toast.success("User Login Successfully");

                // Store in localStorage
                localStorage.setItem('token', token); // Corrected
                localStorage.setItem('User', JSON.stringify(user));

                // Update context
                setAuth({ user, token });

                navigate('/');
            } else {
                alert(message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            toast.error("Login failed");
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100 bg-light">
            <div className="card p-4 shadow-lg border-0" style={{ width: '100%', maxWidth: '400px' }}>
                <h3 className="text-center mb-4 text-primary">Welcome Back</h3>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="loginEmail" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="loginEmail"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="loginPassword" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="loginPassword"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100">Login</button>
                </form>

                <p className="mt-3 mb-0 text-center text-muted">
                    Don't have an account? <Link to="/signup" className="text-decoration-none">Sign up</Link>
                </p>
            </div>
        </div>
    );
};

export default LoginForm;
