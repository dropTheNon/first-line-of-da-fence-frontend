import React from 'react';
import AuthService from './Auth';
import { useEffect } from 'react';

const Navigation = () => {

    const [userLoggedIn, setUserLoggedIn] = React.useState(false);

    React.useEffect(() => {
        AuthService.isLoggedIn()
            .then((result) => {
                console.log("result: ", result);
                if (result.user) {
                    setUserLoggedIn(true);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/">First Line of Da Fence</a>

                <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                    <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <li className="nav-item active">
                            <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/leads">Leads</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/projects">Projects</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/appointments">Appointments</a>
                        </li>
                        <li className="nav-item active">
                            <a className="nav-link" href="/admin/">Admin</a>
                        </li>
                        { !userLoggedIn && 
                            <div id="navbarSignupLoginDiv">
                                    <li className="nav-item active">
                                        <a className="nav-link btn btn-success" href="/api/auth/signup">Signup</a>
                                    </li>
                                    <li className="nav-item active">
                                        <a className="nav-link btn btn-success" href="/api/auth/login">Login</a>
                                    </li>
                            </div>
                        }
                        { userLoggedIn &&
                            <div>
                                <li className="nav-item active">
                                    <a className="nav-link" href="/api/auth/logout">Logout</a>
                                </li>
                            </div>
                        }
                    </ul>
                    <form name="search-form" id="search-form" className="form-inline my-2 my-lg-0">
                        <input name="search" className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                    </form>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;