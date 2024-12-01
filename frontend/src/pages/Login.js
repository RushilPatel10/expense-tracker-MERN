import React, { useEffect, useState } from 'react'
import { Form, Input, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../components/Spinner';


const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (values) => {
        try {
            setLoading(true);
            const { data } = await axios.post('/api/v1/user/login', values);
            if (data.success) {
                message.success('Login successful');
                localStorage.setItem('user', JSON.stringify({ ...data.user, password: '' }));
                setLoading(false);
                navigate('/');
            }
        } catch (error) {
            setLoading(false);
            message.error(error.response?.data?.message || 'Something went wrong');
        }
    };

    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate('/');
        }
    }, [navigate]);

    return (
        <div className="login-container">
            {loading && <Spinner />}
            <div className="login-card">
                <div className="login-header">
                    <h1>Welcome Back!</h1>
                    <p className="text-muted">Please login to your account</p>
                </div>

                <Form layout='vertical' onFinish={handleSubmit} className="login-form">
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            { required: true, message: 'Please input your email!' },
                            { type: 'email', message: 'Please enter a valid email!' }
                        ]}
                    >
                        <Input
                            type='email'
                            prefix={<i className="fas fa-envelope"></i>}
                            placeholder="Enter your email"
                        />
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                            { min: 6, message: 'Password must be at least 6 characters!' }
                        ]}
                    >
                        <Input.Password
                            prefix={<i className="fas fa-lock"></i>}
                            placeholder="Enter your password"
                        />
                    </Form.Item>

                    <Form.Item>
                        <div className="forgot-password">
                            <Link to="/forgot-password">Forgot Password?</Link>
                        </div>
                    </Form.Item>

                    <Form.Item>
                        <button className="login-button" type="submit">
                            Login
                        </button>
                    </Form.Item>

                    <div className="register-link">
                        <p>Don't have an account? <Link to="/register">Register now</Link></p>
                    </div>
                </Form>
            </div>
        </div>
    )
}

export default Login
