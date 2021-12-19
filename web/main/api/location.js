import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`http://161.97.112.69:3006/locations?parent_code=${parentCode}`) //abc
}