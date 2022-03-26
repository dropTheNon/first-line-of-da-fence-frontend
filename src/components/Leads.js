import React from 'react';
import AuthService from './Auth';

const Lead = () => {
    const [name, setName] = React.useState("");
    const [phoneNumber, setPhoneNumber] = React.useState("");
    const [addressStreet, setAddressStreet] = React.useState("");
    const [addressCity, setAddressCity] = React.useState("");
    const [addressState, setAddressState] = React.useState("");
    const [addressZipcode, setAddressZipcode] = React.useState("");
    const [billingAddressStreet, setBillingAddressStreet] = React.useState("");
    const [billingAddressCity, setBillingAddressCity] = React.useState("");
    const [billingAddressState, setBillingAddressState] = React.useState("");
    const [billingAddressZipcode, setBillingAddressZipcode] = React.useState("");
    const [contactName, setContactName] = React.useState("");
    const [emailAddress, setEmailAddress] = React.useState("");
    const [notes, setNotes] = React.useState("");

    
    


    const createLead = (e) => {
        e.preventDefault();
        AuthService.createNewLead(e.target.value)
    };

    return (
        <div>
            <h3>Create a new Lead</h3>
            <form onSubmit={createNewLead} name="create-lead-form">
                <label htmlFor="name">Name</label>
                <input
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <label htmlFor="phoneNumber">PhoneNumber</label>
                <input
                    name="phoneNumber"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
                <label htmlFor="emailAddress">Email</label>
                <input
                    name="emailAddress"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                />
                <h5>Project Address</h5>
                <label htmlFor="addressStreet">Street address</label>
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
                <h5>Billing Address</h5>
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
                <label htmlFor="notes">Notes</label>
                <input
                    type="text-area"
                    name="notes"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                />
                <button type="submit" className="btn btn-submit">Create Lead</button>
            </form>
        </div>
    );
};

export default Lead;