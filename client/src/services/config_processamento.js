import axios from 'axios'
axios.defaults.headers.common['Access-Control-Allow-Origin'] = '*';



export const processamento = axios.create({
    baseURL: 'http://127.0.0.1:5000/api/area/',
})