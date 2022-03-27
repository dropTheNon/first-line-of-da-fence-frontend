import React from "react";
import AuthService from "./Auth";
import { useNavigate, useParams } from "react-router-dom";

const Lead = () => {

    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");
    const [addressStreet, setAddressStreet] = React.useState("");
    const [addressCity, setAddressCity] = React.useState("");
    const [addressState, setAddressState] = React.useState("");
    const [addressZipcode, setAddressZipcode] = React.useState("");
    const [billingAddressStreet, setBillingAddressStreet] = React.useState("");
    const [billingAddressCity, setBillingAddressCity] = React.useState("");
    const [billingAddressState, setBillingAddressState] = React.useState("");
    const [billingAddressZipcode, setBillingAddressZipcode] = React.useState("");
    const [contactName, setContactName] = React.useState("");
    const [notes, setNotes] = React.useState("");
    const [estimator, setEstimator] = React.useState("");

    const params = useParams();
    let leadId = params.leadId;
    let navigate = useNavigate();

    // GET Lead by Id, set values of state
    React.useEffect(() => {

        AuthService.getLead(params.leadId)
        .then((leadFromDB) => {
            setName(leadFromDB.name);
            setPhoneNumber(leadFromDB.phoneNumber);
            setEmailAddress(leadFromDB.emailAddress);
            setAddressStreet(leadFromDB.addressStreet);
            setAddressCity(leadFromDB.addressCity);
            setAddressState(leadFromDB.addressState);
            setAddressZipcode(leadFromDB.addressZipcode);
            setBillingAddressStreet(leadFromDB.billingAddressStreet);
            setBillingAddressCity(leadFromDB.billingAddressCity);
            setBillingAddressState(leadFromDB.billingAddressState);
            setBillingAddressZipcode(leadFromDB.billingAddressZipcode);
            setContactName(leadFromDB.contactName);
            setNotes(leadFromDB.notes);
            
            AuthService.getUser(leadFromDB.estimator[0])
            .then((result) => {
                setEstimator(result.data.userFromDB.name);
            })
            .catch((err) => {
                console.log(err.message);
            });
        })
        .catch((err) => {
            console.log(err.message);
        });


    }, []);

    const editLead = (e) => {
        e.preventDefault();

        AuthService.updateLead(e)
        .then((updatedLead) => {
            console.log("Updated lead in Lead.js: ", updatedLead);
            navigate("/leads");
        })
        .catch((err) => {
            console.log(err.message);
        });
    };

    const deleteThisLead = () => {
        AuthService.deleteLead(leadId)
        .then(() => {
            navigate("/leads");
        })
        .catch((err) => {
            console.log(err.message);
        });
    }

    return (
        <div>
            <h2>Lead Details Page for {name}</h2>
            <br/>
            <div className="w-75 card text-center">
                <div className="card-header">
                    View and Edit Details
                </div>
                <form onSubmit={editLead} name="lead-update-form">
                    <label htmlFor="name">Name</label>
                    <input
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <label htmlFor="phoneNumber">Phone Number</label>
                    <input
                        name="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                    <label htmlFor="emailAddress">Email Address</label>
                    <input
                        name="emailAddress"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                    />
                    <h4>Project Address</h4>
                    <label htmlFor="addressStreet">Street Address</label>
                    <input
                        name="addressStreet"
                        value={addressStreet}
                        onChange={(e) => setAddressStreet(e.target.value)}
                    />
                    <label htmlFor="addressCity">City</label>
                    <input
                        name="addressCity"
                        value={addressCity}
                        onChange={(e) => setAddressCity(e.target.value)}
                    />
                    <label htmlFor="addressState">State</label>
                    <input
                        name="addressState"
                        value={addressState}
                        onChange={(e) => setAddressState(e.target.value)}
                    />
                    <label htmlFor="addressZipcode">Zipcode</label>
                    <input
                        name="addressZipcode"
                        value={addressZipcode}
                        onChange={(e) => setAddressZipcode(e.target.value)}
                    />
                    <h4>Billing Address</h4>
                    <label htmlFor="billingAddressStreet">Street address</label>
                    <input
                        name="billingAddressStreet"
                        value={billingAddressStreet}
                        onChange={(e) => setBillingAddressStreet(e.target.value)}
                    />
                    <label htmlFor="billingAddressCity">City</label>
                    <input
                        name="billingAddressCity"
                        value={billingAddressCity}
                        onChange={(e) => setBillingAddressCity(e.target.value)}
                    />
                    <label htmlFor="billingAddressState">State</label>
                    <input
                        name="billingAddressState"
                        value={billingAddressState}
                        onChange={(e) => setBillingAddressState(e.target.value)}
                    />
                    <label htmlFor="billingAddressZipcode">Zipcode</label>
                    <input
                        name="billingAddressZipcode"
                        value={billingAddressZipcode}
                        onChange={(e) => setBillingAddressZipcode(e.target.value)}
                    />
                    <label htmlFor="contactName">Contact Name</label>
                    <input
                        name="contactName"
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                    />
                    <label htmlFor="notes">Notes</label>
                    <input
                        name="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                    <div className="card-footer text-muted">
                        <button type="submit" className="btn btn-success">Update Lead Info</button>
                    </div>
                </form>
                <button className="btn btn-danger" onClick={deleteThisLead}>Delete this Lead</button>
            </div>
        </div>
    );
};

export default Lead;