import axios from 'axios'

export const banco = axios.create({
    baseURL: 'http://158.69.2.191:5500/',
})