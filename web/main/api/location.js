import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`http://localhost:3006/locations?parent_code=${parentCode}`)
}