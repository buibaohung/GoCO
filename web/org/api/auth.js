import {getAxios} from '../utils/http'

export function signin(user) {
    return getAxios().post("/authentication/signin", user)
}