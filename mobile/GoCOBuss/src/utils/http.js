import axios from 'axios'
import config from '../config'
import {getToken, getOrg} from '../utils/user'

var http = null;
var httpMain = null;

export const refreshAxios = async () => {
    let token = await getToken()
    let org = await getOrg()
    http = axios.create({
        baseURL: org || config.apiEndpoint,
        headers: {'Authorization': `Bearer ${token}`}
    })
}

export const getAxios = async () => {
    if (!http) {
        await refreshAxios()
    }

    return http
}

export const getAxiosWithMainEndpoint = async () => {
    if (!httpMain) {
        httpMain = axios.create({
            baseURL: config.mainApiEndpoint,
        })
    }
    
    return httpMain
}