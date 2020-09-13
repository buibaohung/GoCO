import {getAxios} from '../utils/http'

export function getFacilityInfo() {
    return getAxios().get("/public/facility/info")
}