import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AuthService from './Auth';

const UpdateUser = () => {

    
    const [username, setUserName] = React.useState("");
    const [name, setName] = React.useState("");
    const [level, setLevel] = React.useState("");
    
    let navigate = useNavigate();
    let params = useParams;

    const updateObj = {
        userId: params.userId,
    };

    React.useEffect(() => {
        AuthService.getUser(params.userId)
        .then((userFromDB) => {

        })
    }, []);
    
    const updateThisUser = (e) => {
        e.preventDefault();

        updateObj.name = name;
        updateObj.level = level;

        AuthService.updateUser(updateObj)
        .then((updatedUser) => {
            console.log("User updated: ", updatedUser);
            navigate("/admin/");
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <h2>Update User page for {name}</h2>
            <h5>Username: {username}</h5>
            <form onSubmit={updateThisUser} name="signup-form">
                
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <div>
                    <input type="radio" value="Admin"
                        onChange={setLevel} name="level"/>
                    <label htmlFor="level">Admin</label>
                    <input type="radio" value="Estimator"
                        onChange={setLevel} name="level"/>
                    <label htmlFor="level">Estimator</label>
                    <input type="radio" value="Foreman"
                        onChange={setLevel} name="level"/>
                    <label htmlFor="level">Foreman</label>
                    <input type="radio" value="Helper"
                        onChange={setLevel} name="level"/>
                    <label htmlFor="level">Helper</label>
                </div>
                
                <button type="submit" className="btn btn-success">Update User</button>
            </form>
        </div>
    );
};

export default UpdateUser;