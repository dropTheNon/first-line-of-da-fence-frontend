import React from 'react';
import AuthService from './Auth';
import { useNavigate } from 'react-router-dom';

const Logout = () => {

    let navigate = useNavigate();

    React.useEffect(() => {
        AuthService.logout().then(() => {
            console.log("User logged out!");
            navigate("/");
        }).catch((err) => {
            console.log(err.message)
        });
    }, []);

    return (
        null
    );
};

export default Logout;