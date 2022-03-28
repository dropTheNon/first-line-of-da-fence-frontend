import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthService from './Auth';

const AdminHome = () => {

    const [allUsers, setAllUsers] = React.useState([]);
    
    let navigate = useNavigate();

    const deleteThisUser = (userId) => {

        AuthService.deleteUser(userId)
        .then(() => {navigate("/admin/")})
        .catch((err) => {console.log(err.message)});
    };

    React.useEffect(() => {

        AuthService.getAllUsers()
        .then((results) => {
            console.log(results.data.usersFromDb);
            setAllUsers(results.data.usersFromDb);
        })
        .catch((err) => {
            console.log(err.message);
        });

    }, []);

    return (
        <div>
            <h2>Admin Home page</h2>
            {
                allUsers.map((user, i) => {
                    let editUsersPage = "/admin/update/user/" + user._id;
                    let deleteUsersPage = "/admin/delete/user/" + user._id;

                    return (
                        <div className="card" style={{width: "18rem"}} key={i}>
                            <div className="card-body">
                                <h5 className="card-title">{user.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">{user.level}</h6>
                                <Link to={editUsersPage}>View Details & Update</Link>
                                <Link to={deleteUsersPage} className="btn btn-danger">Delete User</Link>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
};

export default AdminHome;