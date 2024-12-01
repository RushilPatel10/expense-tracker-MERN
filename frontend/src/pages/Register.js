import React from 'react'
import { Form, Input } from 'antd'
import { Link } from 'react-router-dom';


const Register = () => {
    return (
        <div className="d-flex align-items-center justify-content-center register-page">
            <Form layout='vertical'>
                <h1>Register</h1>
                <Form.Item label="Name" name="name">
                    <Input />
                </Form.Item>
                <Form.Item label="Email" name="email">
                    <Input type='email' />
                </Form.Item>
                <Form.Item label="Password" name="password">
                    <Input type='password' />
                </Form.Item>
                <div className="d-flex just">
                    <Link to="/login">Already Registered ? Click here to login</Link>
                    <button className="btn btn-primary">Register</button>
                </div>
            </Form>
        </div>
    )
}

export default Register
