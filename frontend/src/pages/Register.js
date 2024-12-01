import React, { useState, useEffect } from 'react';
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';

axios.defaults.baseURL = 'http://localhost:8080';

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            // Add this line to see what data we're sending
            console.log('Sending data:', values);

            await axios.post("/api/v1/user/register", values);
            message.success('User registered successfully');
            setLoading(false);
            navigate("/login");
        } catch (error) {
            setLoading(false);
            // Improve error logging
            console.log('Full error:', error);
            console.log('Error response:', error.response?.data);
            message.error(error.response?.data?.message || 'Registration failed. Please try again.');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="register-container">
            {loading && <Spinner />}
            <div className="register-card">
                <div className="register-header">
                    <h1>Create Account</h1>
                    <p className="text-muted">Join us today! Please fill in your details</p>
                </div>

                <Form layout="vertical" onFinish={handleSubmit} className="register-form">
                    <Form.Item
                        label="Full Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter your name' }]}
                    >
                        <Input
                            prefix={<i className="fas fa-user"></i>}
                            placeholder="Enter your full name"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please enter your email' },
                            { type: 'email', message: 'Please enter a valid email' },
                        ]}
                    >
                        <Input
                            prefix={<i className="fas fa-envelope"></i>}
                            type="email"
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please enter your password' },
                            { min: 6, message: 'Password must be at least 6 characters' }
                        ]}
                    >
                        <Input.Password
                            prefix={<i className="fas fa-lock"></i>}
                            placeholder="Create a password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <button className="register-button" type="submit">
                            Create Account
                        </button>
                    </Form.Item>

                    <div className="login-link">
                        <p>Already have an account? <Link to="/login">Login here</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    );
};

export default Register;
