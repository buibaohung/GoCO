import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`http://34.125.115.98:3006/locations?parent_code=${parentCode}`)
}