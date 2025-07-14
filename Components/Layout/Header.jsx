import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Context/auth';
import gym from '../../src/assets/images/logo.png';

const Header = () => {
    const { auth, setAuth } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        setAuth({ user: null, token: '' });
        localStorage.removeItem('token');
        localStorage.removeItem('User');
        navigate('/login');
    };

    const getInitials = (name) => {
        return name
            ? name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
            : 'U';
    };

    const navLinkClass = ({ isActive }) =>
        isActive ? 'nav-link active text-primary fw-bold' : 'nav-link';

    return (
        <>
            <nav className="navbar navbar-expand-lg bg-light shadow-sm">
                <div className="container-fluid">
                    <NavLink className="navbar-brand d-flex align-items-center text-primary" to="/">
                        <img
                            src={gym}
                            alt="FitTrack Logo"
                            style={{ width: '45px', height: '45px', objectFit: 'contain', marginRight: '10px' }}
                        />
                        <span className="fw-bold fs-4">Tracker</span>
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent">
                        <span className="navbar-toggler-icon" />
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink to="/" className={navLinkClass}>Home</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/about" className={navLinkClass}>About</NavLink>
                            </li>
                            <li className="nav-item">
                                <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
                            </li>

                            {!auth.user ? (
                                <li className="nav-item">
                                    <NavLink to="/signup" className={navLinkClass}>Register</NavLink>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <NavLink to="/profile" className={navLinkClass}>Profile</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink to="/dashboard" className={navLinkClass}>Dashboard</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <button onClick={handleLogout} className="nav-link btn btn-link">
                                            Logout
                                        </button>
                                    </li>
                                </>
                            )}
                        </ul>

                        {auth.user && (
                            <NavLink to="/profile">
                                <div className="d-flex align-items-center ms-2">
                                    {auth.user.profile ? (
                                        <img
                                            src={auth.user.profile}
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
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        </>
    );
};

export default Header;
