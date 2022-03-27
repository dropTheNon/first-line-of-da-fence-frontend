import React from 'react';
import AuthService from './Auth';

const Login = () => {
    const [username, setUserName] = React.useState("NextTest");
    const [password, setPassword] = React.useState("Password123!");

    const logUserIn = (e) => {
        e.preventDefault();
        AuthService.login(username, password)
        .then((loggedInUser) => {
            console.log("logged in User: ", loggedInUser);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={logUserIn} name="login-form">
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="btn btn-success">Login</button>
            </form>
        </div>
    );
};

export default Login;