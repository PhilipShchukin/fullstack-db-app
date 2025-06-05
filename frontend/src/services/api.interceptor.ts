import axios, {type CreateAxiosDefaults} from 'axios'


const options:CreateAxiosDefaults = {
    baseURL: 'http://localhost:4444/api',
    headers:{
        'Content-Type':'application/json'
    },
    withCredentials: true
}

export const axiosClassic = axios.create(options)