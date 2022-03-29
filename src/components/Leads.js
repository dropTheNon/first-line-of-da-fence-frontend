import React, { useReducer } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthService from './Auth';
import CreateLead from './CreateLead';


const Leads = () => {

    let navigate = useNavigate();

    const [allLeads, setAllLeads] = React.useState([]);

    React.useEffect(() => {
        AuthService.getAllLeads()
        .then((results) => {
            setAllLeads(results.leadsFromDB);
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
            <h2>Leads page</h2>
            <Link to="/leads/create" className="btn btn-success">Create New Lead</Link>
            {
                allLeads.map((lead, i) => {
                    const thisLeadId = lead._id;
                    const viewThisLead = "/leads/lead/" + lead._id;

                    return (
                        <div className="card" style={{width: "18rem"}} key={i}>
                            <div className="card-body">
                                <h5 className="card-title">Name: {lead.name}</h5>
                                {/* <h6 className="card-subtitle mb-2 text-muted">Estimator's name will go here</h6> */}
                                <p className="card-text">{lead.addressStreet}</p>
                                <p className="card-text">{lead.addressCity}, {lead.addressState} {lead.addressZipcode}</p>
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
    );
};

export default Leads;