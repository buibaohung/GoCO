import axios from 'axios'
import nextCookie from 'next-cookies'
import cookie from 'js-cookie'

var http = null;

export const newAxios = (ctx) => {
    let token="";
    if (ctx) {
        token = nextCookie(ctx).token
    } else {
        token = cookie.get("token")
    }

    http = axios.create({
        baseURL: process.env.API_BASE_URL,
        withCredentials: true,
        headers: {'Authorization': `Bearer ${token}`}
    })
}

export const getAxios = () => http


// run on client
newAxios()

export default http;