import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`http://34.125.145.199:3006/locations?parent_code=${parentCode}`)
}