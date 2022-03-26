import axios from 'axios';

const service = axios.create({
    baseURL: "http://localhost:5005",
    // baseURL: "https://first-line-of-da-fence.herokuapp.com/",
    withCredentials: true,
});

const AuthService = {

    // #######  matching auth.routes.js routes #######
    signup: (username, password) => {
        return service
        .post("/api/auth/signup", {
            username: username,
            password: password,
        })
        .then((results) => {
            console.log(results.data);
            return results.data;
        });
    },

    login: (username, password) => {
        return service
        .post("/api/auth/login", {
           username: username,
           password: password, 
        })
        .then((results) => {
            console.log("results.data from Auth.js", results.data);
            return results.data;
        });
    },

    logout: () => {
        return service.post("/api/auth/logout")
        .then((results) => {
            console.log(results.data);
            return results.data;
        });
    },

    isLoggedIn: () => {
        return service.get("/api/auth/loggedin")
        .then((results) => {
            console.log(results.data);
            return results.data;
        });
    },
    
    // #######  matching leads.js routes #######

    getAllLeads: () => {
        return service.get("/leads/")
        .then((results) => {
            console.log(results.data);
            return results.data;
        });
    },
    getCreateLeadForm: () => {
        return service.get("/leads/create")
        .then(() => {
            console.log("Create leads form served");
        });
    },
    createNewLead: (body) => {
        return service.post("/leads/create", body)
        .then((createdLead) => {
            console.log("New lead created: ", createdLead);
            return createdLead;
        });
    }

}

export default AuthService;