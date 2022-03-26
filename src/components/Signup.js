import React from 'react';
import AuthService from './Auth';

const Signup = () => {
    const [username, setUserName] = React.useState("");
    const [password, setPassword] = React.useState("");

    const signUserUp = (e) => {
        e.preventDefault();
        AuthService.signup(username, password)
        .then((createdUser) => {
            setUserName("");
            setPassword("");
            console.log("createdUser from Signup.js", createdUser);
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
                <label htmlFor="password">Password</label>
                <input
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <p>Password must be at least 6 characters and contain both upper- and lower-case letters, as well as at least one number</p>
                <button type="submit" className="btn btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default Signup;