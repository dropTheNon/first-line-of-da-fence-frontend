import React, { useReducer } from 'react';
import { Link } from 'react-router-dom';
import AuthService from './Auth';
import CreateLead from './CreateLead';

const Leads = () => {

    const [allLeads, setAllLeads] = React.useState([]);

    React.useEffect(() => {
        AuthService.getAllLeads()
        .then((results) => {
            console.log(results);
            setAllLeads(results.leadsFromDB);
        })
        .catch((err) => {
            console.log(err.message);
        });
    }, []);

    return (
        <div>
            <h2>Leads page</h2>
            {
                allLeads.map((lead, i) => {
                    const updateThisLead = "/leads/update/" + lead._id; 
                    const deleteThisLead = "/leads/delete/" + lead._id;
                    const viewThisLead = "/leads/lead/" + lead._id;
                    // Need to create an AuthService call to GET name of User.findById(lead.estimator[0]),
                    // in order to list estimator's name on card

                    return (
                        <div className="card" style={{width: "18rem"}} key={i}>
                            <div className="card-body">
                                <h5 className="card-title">{lead.name}</h5>
                                <h6 className="card-subtitle mb-2 text-muted">Estimator's name will go here</h6>
                                <p className="card-text">{lead.addressZipcode}</p>
                                <p className="card-text">{lead.phoneNumber}</p>
                                <p className="card-text">{lead.emailAddress}</p>
                                <a href={updateThisLead} className="card-link">Edit</a>
                                <a href={viewThisLead} className="card-link">View Details</a>
                                <a href={deleteThisLead} className="card-link">Delete</a>
                            </div>
                        </div>
                        )
                })
            }
            <Link to="/leads/create">Create New Lead</Link>
        </div>
    );
};

export default Leads;