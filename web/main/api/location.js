import http from '../utils/http'

export function getLocations(parentCode) {
    return http.get(`https://apilocation.goco.live/locations?parent_code=${parentCode}`) //abc
}