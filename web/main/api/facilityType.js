import http from '../utils/http'

export function getFacilityTypes() {
    return http.get("/public/facility-type")
}