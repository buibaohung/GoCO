import {getAxios} from '../utils/http'

export function signin(phone_number, password) {
    return getAxios()
    .then(http => {
        return http.post('/authentication/signin', {phone_number, password})
    })
}