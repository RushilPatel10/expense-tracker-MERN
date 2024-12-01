import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { message } from 'antd'

const Header = () => {
    const navigate = useNavigate();

    const [loginUser, setLoginUser] = useState(null);

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            setLoginUser(user);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('user');
        message.success('Logout successful');
        setLoginUser(null);
        navigate('/login');
    };

    return (
        <header className="app-header">
            <nav className="header-nav">
                <div className="header-container">
                    <Link className="brand" to="/">
                        <i className="fas fa-wallet"></i>
                        <span>Expense Manager</span>
                    </Link>

                    <div className="header-right">
                        {loginUser && (
                            <div className="user-info">
                                <div className="user-profile">
                                    <i className="fas fa-user-circle"></i>
                                    <span className="user-name">{loginUser.name}</span>
                                </div>
                                <button
                                    className="logout-button"
                                    onClick={handleLogout}
                                >
                                    <i className="fas fa-sign-out-alt"></i>
                                    <span>Logout</span>
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
        </header>
    )
}

export default Header
