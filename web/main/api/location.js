import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`http://localhost:3001/locations?parent_code=${parentCode}`)
}