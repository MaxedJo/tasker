import axios from "axios";


const auth_api = process.env.REACT_APP_BACKEND_HOST + '/auth';

class AuthService {
    login(username, password) {
        return axios
            .post(auth_api + "/auth", {
                username,
                password
            })
            .then(response => {
                if (response.data.token) {
                    localStorage.setItem("user", JSON.stringify(response.data))
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user")
    }

    register(username, fio, password) {
        return axios.post(auth_api + "/register", {
            username,
            fio,
            password
        }).then(response => {
            if (response.data.token) {
                localStorage.setItem("user", JSON.stringify(response.data))
            }
            return response;
        });
    }

    getCurrentUser() {
        return JSON.parse(localStorage.getItem("user"));
    }
}

export default new AuthService();