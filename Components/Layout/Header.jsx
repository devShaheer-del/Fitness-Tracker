import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';

const Header = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({ user: null, token: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('User');
        navigate('/login');
    };

    // Helper to get avatar initials
    const getInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            : 'U';
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <Link className="navbar-brand text-primary" to="/">Fitness Tracker</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link to="/" className="nav-link active">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/about" className="nav-link active">About</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/contact" className="nav-link active">Contact</Link>
                            </li>

                            {!auth.user ? (
                                <li className="nav-item">
                                    <Link to="/signup" className="nav-link active">Register</Link>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link to="/profile" className="nav-link active">Profile</Link>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="nav-link btn btn-link active">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>

                        {/* Avatar (right-aligned) */}
                        {auth.user && (
                            <Link to="/profile">
                            
                            <div className="d-flex align-items-center">
                                {auth.user.profile
                                    ? (
                                        <img
                                            src={auth.user.profile
                                            }
                                            alt="avatar"
                                            className="rounded-circle"
                                            style={{ width: '35px', height: '35px', objectFit: 'cover' }}
                                        />
                                    ) : (
                                        <div
                                            className="rounded-circle bg-secondary text-white d-flex justify-content-center align-items-center"
                                            style={{ width: '35px', height: '35px' }}
                                        >
                                            {getInitials(auth.user.name)}
                                        </div>
                                    )}
                            </div>
                            
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
