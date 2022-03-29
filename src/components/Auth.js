import axios from 'axios';

const service = axios.create({
    baseURL: "http://localhost:5005",
    // baseURL: "https://first-line-of-da-fence.herokuapp.com/",
    withCredentials: true,
});

const AuthService = {

    // #######  matching auth.routes.js routes #######
    signup: (username, password, name) => {
        return service
        .post("/api/auth/signup", {
            username: username,
            password: password,
            name: name,
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
            return results.data;
        });
    },

    logout: () => {
        return service.post("/api/auth/logout")
        .then((results) => {
            return results.data;
        });
    },

    isLoggedIn: () => {
        return service.get("/api/auth/loggedin")
        .then((results) => {
            return results.data;
        });
    },
    
    // #######  matching leads.js routes #######

    getAllLeads: () => {
        return service.get("/leads/")
        .then((results) => {
            return results.data;
        });
    },
    getLead: (leadId) => {
        return service.get("/leads/lead/" + leadId)
        .then((result) => {
            return result.data.leadFromDB;
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
        .then((result) => {
            console.log("result: ", result);
            console.log("New lead created: ", result.data);
            return result.data.createdLead;
        });
    },
    updateLead: (body) => {
        let updateLeadURL = "/leads/update/" + body.leadId;
        return service.post(updateLeadURL, body)
        .then((result) => {
            console.log("result: ", result);
            console.log("Lead updated: ", result.data.updatedLead);
            return result.data.updatedLead;
        });
    },
    deleteLead: (leadId) => {
        return service.post("/leads/delete/" + leadId)
        .then(() => {
            return;
        })
    },

    // #######  matching users.js routes #######
    getUser: (userId) => {
        return service.get("/users/user/" + userId)
        .then((result) => {
            console.log("Found user: ", result.data.userFromDB);
            return result.data.userFromDB;
        });
    },
    getAllUsers: () => {
        return service.get("/admin/")
        .then((result) => {
            return result;
        });
    },
    updateUser: (body) => {
        return service.post("/admin/update/user/" + body.userId, body)
        .then((result) => {
            return result.data.updatedUser;
        });
    }
}

export default AuthService;