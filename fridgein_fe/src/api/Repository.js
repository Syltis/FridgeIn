import axios from 'axios';

const baseURL = 'https://localhost:44316/api/';

export default axios.create({
    baseURL
});