import React from 'react';
import AuthService from './Auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");

    let navigate = useNavigate();

    const signUserUp = (e) => {
        e.preventDefault();
        AuthService.signup(username, password, name)
        .then((createdUser) => {
            setUserName("");
            setPassword("");
            setName("");
            console.log("createdUser from Signup.js", createdUser);
            navigate("/");
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div>
            <h2>Signup</h2>
            <form onSubmit={signUserUp} name="signup-form">
                <label htmlFor="username">Username</label>
                <input
                    name="username"
                    value={username}
                    onChange={(e) => setUserName(e.target.value)}
                />
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>Password must be at least 6 characters and contain both upper- and lower-case letters, as well as at least one number</p>
                <button type="submit" className="btn btn-success">Signup</button>
            </form>
        </div>
    );
};

export default Signup;