import http from '../utils/http'

export default function registerFacility(data) {
    return http.post("/public/facility-registration", data)
}