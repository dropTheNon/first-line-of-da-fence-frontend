import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './Auth';
import CreateLead from './CreateLead';


const Leads = () => {

    let navigate = useNavigate();

    const [user, setUser] = React.useState({});
    const [allLeads, setAllLeads] = React.useState([]);

    React.useEffect(() => {
        AuthService.getAllLeads()
        .then((results) => {
            if (results.leadsFromDB) {
                setAllLeads(results.leadsFromDB);
            }
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    React.useEffect(() => {
        AuthService.isLoggedIn()
            .then((result) => {
                if (result.user) {
                    setUser(result.user);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, []);

    const deleteLead = (thisLeadId) => {
        AuthService.deleteLead(thisLeadId)
        .then(() => {
            let filteredArr = allLeads.filter((lead) => {
                return lead._id !== thisLeadId;
            });
            setAllLeads(filteredArr);
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    return (
        <div>
            <div>
                <h6 className="welcomeUsersName">Welcome back, {user.name}!</h6>
            </div>
            <h2>Leads page</h2>
            <Link to="/leads/create" id="createNewLeadBtn" className="btn btn-success">Create New Lead</Link>
            <div className="cardsContainer">
                <div className="row">

                {
                    allLeads.map((lead, i) => {
                        const thisLeadId = lead._id;
                        const viewThisLead = "/leads/lead/" + lead._id;

                        return (
                            <div className="card col-lg-3 cardsSpacedEvenly" style={{width: "15rem"}} key={i}>
                                <div className="card-body">
                                    <h6>Lead Info</h6><h5 className="card-title">{lead.name}</h5>
                                    {/* <h6 className="card-subtitle mb-2 text-muted">Estimator's name will go here</h6> */}
                                    <h6>Address</h6>
                                    <p className="card-text">{lead.addressStreet}</p>
                                    <p className="card-text">{lead.addressCity}, {lead.addressState} {lead.addressZipcode}</p>
                                    <h6>Contact info</h6>
                                    <p className="card-text">Phone number: {lead.phoneNumber}</p>
                                    <p className="card-text">Email: {lead.emailAddress}</p>
                                    <a href={viewThisLead} className="btn btn-info">View Details</a>
                                    <button onClick={(e) => {deleteLead(thisLeadId)}} className="btn btn-danger">Delete</button>
                                </div>
                            </div>
                        )                
                    })
                }
                </div>
            </div>
        </div>
    );
};

export default Leads;