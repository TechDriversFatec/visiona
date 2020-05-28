import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://naruto-api.herokuapp.com/',
})