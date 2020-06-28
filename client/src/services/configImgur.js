import axios from 'axios'
// axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
// axios.defaults.headers.common['Access-Control-Allow-Headers'] = '*';

export const imgur = axios.create({
    baseURL: 'https://api.imgur.com/3/',
})