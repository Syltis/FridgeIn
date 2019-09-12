import axios from 'axios';

const baseURL = 'https://localhost:44316/api/';
const azureURL = 'https://fridgein-api.azurewebsites.net/api/';

export default axios.create({
    azureURL
});