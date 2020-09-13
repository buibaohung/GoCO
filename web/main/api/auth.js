import http from '../utils/http'

export function signin(user) {
    return http.post("/authentication/signin", user)
}