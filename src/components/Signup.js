import React from 'react';
import AuthService from './Auth';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [level, setLevel] = React.useState("");

    let navigate = useNavigate();

    const signUserUp = (e) => {
        e.preventDefault();
        AuthService.signup(username, password, name, level)
        .then((createdUser) => {
            setUserName("");
            setPassword("");
            setName("");
            setLevel("");
            navigate("/leads");
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div className="container">
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
                <label htmlFor="level">Select Role</label>
                <input
                    type="radio"
                    value="Estimator"
                    name="level"
                    onChange={(e) => setLevel(e.target.value)}
                />Estimator
                <input
                    type="radio"
                    value="Foreman"
                    name="level"
                    onChange={(e) => setLevel(e.target.value)}
                />Foreman
                <input
                    type="radio"
                    value="Helper"
                    name="level"
                    onChange={(e) => setLevel(e.target.value)}
                />Helper
                <p>Password must be at least 6 characters and contain both upper- and lower-case letters, as well as at least one number</p>
                <button type="submit" className="btn btn-success">Signup</button>
            </form>
        </div>
    );
};

export default Signup;