import React from 'react'
import { Link } from 'react-router-dom';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="app-footer">
            <div className="footer-content">
                <div className="footer-main">
                    <div className="footer-brand">
                        <i className="fas fa-wallet"></i>
                        <h3>Expense Manager</h3>
                    </div>

                    <div className="footer-links">
                        <div className="footer-section">
                            <h4>Quick Links</h4>
                            <ul>
                                <li><a href="/dashboard">Dashboard</a></li>
                                <li><a href="/profile">Profile</a></li>
                                <li><a href="/analytics">Analytics</a></li>
                            </ul>
                        </div>

                        <div className="footer-section">
                            <h4>Contact</h4>
                            <ul>
                                <li><a href="mailto:support@expensemanager.com">
                                    <i className="fas fa-envelope"></i> Support
                                </a></li>
                                <li><a href="#help">
                                    <i className="fas fa-question-circle"></i> Help Center
                                </a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="footer-bottom">
                    <div className="social-links">
                        <Link href="#" aria-label="GitHub"><i className="fab fa-github"></i></Link>
                        <Link href="#" aria-label="LinkedIn"><i className="fab fa-linkedin"></i></Link>
                        <Link href="#" aria-label="Twitter"><i className="fab fa-twitter"></i></Link>
                    </div>
                    <div className="copyright">
                        <p>&copy; {currentYear} Expense Manager by Rushil Patel. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
