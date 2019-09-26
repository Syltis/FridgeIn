import axios from 'axios';

const baseURL = process.env.VUE_APP_API;

export default axios.create({
    baseURL
});