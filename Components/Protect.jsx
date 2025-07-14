import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
const Protect = (props) => {


    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {

        const User = localStorage.getItem('User');


        if (!User) {
            navigate('/login');
        }

    }, [])

    return (
        <>

            <Component />


        </>
    )
}

export default Protect
