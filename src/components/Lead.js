import React from "react";
import AuthService from "./Auth";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

// var axios = require('axios').default;

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
    const [threeDayForecast, setThreeDayForecast] = React.useState({});
    // const [estimator, setEstimator] = React.useState("");

    const params = useParams();
    const leadId = params.leadId;
    let navigate = useNavigate();

    // GET Lead by Id, set values of state
    React.useEffect(() => {

        AuthService.getLead(leadId)
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

            const weatherAPICallOptions = {
                method: 'GET',
                url: 'https://weatherapi-com.p.rapidapi.com/forecast.json',
                params: {
                    q: leadFromDB.addressZipcode, 
                    days: 3
                },
                headers: {
                    'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com',
                    'X-RapidAPI-Key': "fced7414e5msh403ad5088417ae1p1096e4jsn508210975e39"
                }
            };

            console.log(weatherAPICallOptions);

            axios.request(weatherAPICallOptions)
                .then((response) => {
                    console.log("API response: ", response.data);
                    setThreeDayForecast({
                        day1Text: response.data.forecast.forecastday[0].day.condition.text,
                        day1Icon: response.data.forecast.forecastday[0].day.condition.icon,
                        day2Text: response.data.forecast.forecastday[1].day.condition.text,
                        day2Icon: response.data.forecast.forecastday[1].day.condition.icon,
                        day3Text: response.data.forecast.forecastday[2].day.condition.text,
                        day3Icon: response.data.forecast.forecastday[2].day.condition.icon,
                    });
                })
                .catch((err) => {
                    console.log(err.message);
                })
                .finally(() => {
                    console.log(threeDayForecast);
                });
            
            // AuthService.getUser(leadFromDB.estimator[0])
            // .then((result) => {
            //     console.log(result.data.userFromDB.name);
            //     setEstimator(result.data.userFromDB.name);
            // })
            // .catch((err) => {
            //     console.log(err.message);
            // });
        })
        .catch((err) => {
            console.log(err.message);
        });


    }, []);

    console.log(threeDayForecast);

    const editLead = (e) => {
        e.preventDefault();

        const updateLeadObj = {
            leadId: leadId,
            name: name,
            phoneNumber: phoneNumber,
            emailAddress: emailAddress,
            addressStreet: addressStreet,
            addressCity: addressCity,
            addressState: addressState,
            addressZipcode: addressZipcode,
            billingAddressStreet: billingAddressStreet,
            billingAddressCity: billingAddressCity,
            billingAddressState: billingAddressState,
            billingAddressZipcode: billingAddressZipcode,
            contactName: contactName,
            notes: notes,
        };

        console.log("updateLeadObj: ", updateLeadObj);

        AuthService.updateLead(updateLeadObj)
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
            <div id="leadInfoCard">
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
                        <br/>
                        <br/>

                            <h4>Next Three Days Weather</h4>
                        <div className="row" id="weatherRow">
                            <div>
                                <p>{threeDayForecast.day1Text}</p>
                                <img src={threeDayForecast.day1Icon} alt="day 1 weather forecast icon"/>
                            </div>
                            <div>
                                <p>{threeDayForecast.day2Text}</p>
                                <img src={threeDayForecast.day2Icon} alt="day 1 weather forecast icon"/>
                            </div>
                            <div>
                                <p>{threeDayForecast.day3Text}</p>
                                <img src={threeDayForecast.day3Icon} alt="day 1 weather forecast icon"/>
                            </div>
                        </div>
                        <div className="card-footer text-muted">
                            <button type="submit" className="btn btn-success btn-width">Update Lead Info</button>
                        </div>
                        {/* Radio buttons copied from UpdateUser to modify to select Estimator */}
                        {/* Will need to do a User.find({level = "Estimator" or whatever}), then */}
                        {/* do a estimators.map((estimator)=>{}) to create radio buttons with  */}
                        {/* estimator's name and User._id (for value) */}
                    
                        {/* <div>
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
                        </div> */}
                    </form>
                    <button className="btn btn-danger btn-width" onClick={deleteThisLead}>Delete this Lead</button>
                </div>
            </div>
        </div>
    );
};

export default Lead;