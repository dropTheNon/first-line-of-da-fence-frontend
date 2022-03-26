import React from 'react';
import AuthService from './Auth';

const Logout = () => {

    AuthService.logout().then(() => {}).catch((err) => {
        console.log(err.message)
    });
};

export default Logout;