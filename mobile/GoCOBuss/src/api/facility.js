import {getAxios, getAxiosWithMainEndpoint} from '../utils/http'

export function getFacilityInfo() {
    return getAxios()
    .then(http => {
        return http.get("/public/facility/info")
    })
}

export function getFacilityByType(type = "") {
    return getAxiosWithMainEndpoint()
    .then(http => {
        return http.get(`/public/facilities?type=${type}`)
    })
}