import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`/locations?parent_code=${parentCode}`)
}