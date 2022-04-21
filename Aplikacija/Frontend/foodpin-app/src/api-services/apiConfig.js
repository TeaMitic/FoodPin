import axios from 'axios';
const URL = 'http://localhost:5000'
export default () => {
    return axios.create({
        baseURL: URL,
        withCredentials: false,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    });
}